import numpy as np
import matplotlib.pyplot as plt

def simulate_black_hole(resolution=(400, 300), ang=60):
    """
    Simulates the gravitational lensing of a Schwarzschild black hole.
    Generates an image showing the black hole shadow and the lensing of a background grid.
    """
    print("Initializing")
    W, H = resolution
    f = np.deg2rad(ang)
    
    # Camera setup (at 10 Schwarzschild radii)
    cam_dist = 20.0 
    
    # Screen coordinates
    scale = np.tan(f / 2)
    aspect_ratio = W / H
    x = np.linspace(-scale * aspect_ratio, scale * aspect_ratio, W)
    y = np.linspace(scale, -scale, H) # Top to bottom
    X, Y = np.meshgrid(x, y)
    
    # Initial ray directions (normalized)
    # Camera looks towards -Z (where the BH is at origin)
    # Rays start at (0, 0, cam_dist) in a local frame where Z points to BH? 
    # Let's define standard coordinates: BH at (0,0,0). Camera at (0, 0, cam_dist).
    # Camera looks at (0,0,0). Up is Y. Right is X.
    # Ray direction D = normalize(X_s, Y_s, -1) assumes simple pinhole.
    
    Z_screen = -1.0 # arbitrary focal length for direction calc
    
    # Normalized directions
    norm = np.sqrt(X**2 + Y**2 + Z_screen**2)
    Dx = X / norm
    Dy = Y / norm
    Dz = Z_screen / norm
    
    # Position and Velocity arrays (Vectorized)
    # Pos: (x, y, z)
    # Px, Py, Pz
    Px = np.zeros((H, W))
    Py = np.zeros((H, W))
    Pz = np.full((H, W), cam_dist)
    
    # Velocities
    Vx = Dx
    Vy = Dy
    Vz = Dz
    
    # Simulation parameters
    # Schwarzschild radius Rs = 2GM/c^2. We work in units where Rs=1.
    Rs = 1.0
    step_size = 0.1 # Adaptive would be better, but fixed is simpler
    max_steps = 500
    escape_dist = 20.0
    horizon_dist = 1.0 # Event horizon at r = Rs (in Schwarzschild coords r=1?) 
    # Actually event horizon is at Rs. We set Rs=1.
    
    print(f"Tracing {W*H} rays...")
    
    # Ray marching
    # We use a simplified pseudo-Newtonian potential or just integrate 
    # the light deflection. For accurate Schwarzschild visualization, 
    # we need to integrate the geodesic equation.
    # 
    # Geodesic eq for light in generic form is complex. 
    # A simplified effective potential approach or 2nd order integration is often used.
    # Let's simple stepping: x(t+dt) = x(t) + v(t)dt, v(t+dt) = v(t) + a(t)dt
    # Acceleration for light in Schwarzschild:
    # a = -1.5 * h^2 / r^5 * r_vec  (approximate for standard shapes)
    # Actually, let's use the actual equation of motion derived from the Hamiltonian 
    # H = 0 for photons.
    # The acceleration in Cartesian coords for a photon is roughly:
    # a = - (3 GM / r^5) (r . v)^2 r_vec ? No.
    
    # Let's stick to a simpler visual hack if "efficiency" is key, 
    # OR the actual numeric integration.
    # Actual acceleration term for light (faked Newtonian for visual sim):
    # acceleration = -1.5 * (h_ang_momentum)^2 / r^5 * position_vector
    # h = r x v. 
    
    active_mask = np.ones((H, W), dtype=bool)
    
    # To store final colors/destinations
    final_color = np.zeros((H, W, 3))
    
    # Pre-calculate angular momentum per ray (conserved central potential)
    # L = r x v
    # r is (Px, Py, Pz), v is (Vx, Vy, Vz)
    # Since r starts at (0,0,D), v is (vx, vy, vz)
    # Lx = y*vz - z*vy
    # Ly = z*vx - x*vz
    # Lz = x*vy - y*vx
    
    # But h^2 is what we need. h = |r x v|
    # Only need to calculate once? No, r and v change, but h is conserved in spherical symmetry?
    # Yes, for Schwarzschild, h is constant.
    
    # Initial r x v
    # r = (0, 0, cam_dist)
    # v = (Dx, Dy, Dz)
    # Lx = -cam_dist * Dy
    # Ly =  cam_dist * Dx
    # Lz = 0
    Lx = -Pz * Vy
    Ly =  Pz * Vx
    Lz = np.zeros_like(Pz) # since x=y=0 initially
    
    h2 = Lx**2 + Ly**2 + Lz**2
    
    # Accretion Disk Parameters
    disk_inner = 3.0
    disk_outer = 12.0
    disk_color = np.array([1.0, 0.5, 0.1]) # Orange
    
    # Plane definition: Normal vector n = (0, sin(inc), cos(inc))
    # We want a high inclination to see the ring, e.g. 80 degrees
    # But wait, looking down Z axis. Disk normal usually Z axis (inc=0).
    # If we want to see it tilted, we tilt the disk normal away from Z.
    disk_inc = np.deg2rad(80) 
    nx = 0
    ny = np.sin(disk_inc)
    nz = np.cos(disk_inc)
    
    # Track which pixels hit the disk
    # We need to prioritize disk hits over background, but horizon hits over disk?
    # Usually disk is in front or behind.
    # We'll just stop the ray if it hits the disk (opaque disk).
    disk_mask_accum = np.zeros((H, W), dtype=bool)
    
    # Store P from previous step for intersection check
    Px_prev = Px.copy()
    Py_prev = Py.copy()
    Pz_prev = Pz.copy()

    for step in range(max_steps):
        # Current radius squared
        r2 = Px**2 + Py**2 + Pz**2
        r = np.sqrt(r2)
        
        # Mask for rays that hit horizon
        hit_mask = r < horizon_dist
        
        # Rays that escaped
        escape_mask = r > escape_dist
        
        # Check for disk intersection:
        # Sign of dot product with normal changes?
        # dist = P . n
        dist = Px * nx + Py * ny + Pz * nz
        dist_prev = Px_prev * nx + Py_prev * ny + Pz_prev * nz
        
        # Crossing condition: signs differ (multiply < 0)
        crossed = (dist * dist_prev) < 0
        
        if np.any(crossed):
            # Find intersection point (linear interpolation)
            # t = dist_prev / (dist_prev - dist)
            # P_int = P_prev + t * (P - P_prev)
            # fraction f = dist_prev / (dist_prev - dist)
            
            # Avoid division by zero if dist_prev == dist (unlikely if crossed)
            denom = (dist_prev - dist)
            denom[denom == 0] = 1e-6
            f = dist_prev / denom
            
            ix = Px_prev + f * (Px - Px_prev)
            iy = Py_prev + f * (Py - Py_prev)
            iz = Pz_prev + f * (Pz - Pz_prev)
            
            ir_sq = ix**2 + iy**2 + iz**2
            ir = np.sqrt(ir_sq)
            
            # Check if within disk bounds
            in_disk = (ir > disk_inner) & (ir < disk_outer) & crossed & active_mask
            
            # Update disk hits
            if np.any(in_disk):
                # We save these rays as "done" and assign color
                final_color[in_disk] = disk_color # Uniform color for now
                
                # Vary color with radius for effect (simple texture)
                # e.g. sinusoidal rings
                # mod(r, 1) or something
                
                # Vectorized color application
                # r_in = ir[in_disk]
                # intensity = 0.5 + 0.5 * np.sin(r_in * 5)
                # final_color[in_disk, 0] *= intensity
                # final_color[in_disk, 1] *= intensity
                # final_color[in_disk, 2] *= intensity
                
                active_mask[in_disk] = False
                disk_mask_accum[in_disk] = True
        
        # Save previous positions for next step
        Px_prev[active_mask] = Px[active_mask]
        Py_prev[active_mask] = Py[active_mask]
        Pz_prev[active_mask] = Pz[active_mask]

        # Rays still flying
        flying = active_mask & ~hit_mask & ~escape_mask
        
        if not np.any(flying):
            break
            
        # Update positions
        # x += v * dt
        Px[flying] += Vx[flying] * step_size
        Py[flying] += Vy[flying] * step_size
        Pz[flying] += Vz[flying] * step_size
        
        # Update velocities (acceleration)
        # a = -1.5 * h^2 / r^5 * r_vec
        # This is the "effective potential" force for photons.
        
        # Need r5 for the flying rays
        # (recalc r2 for flying to be sure we use updated pos? No, use r found at start of loop is old pos. acceleration depends on current pos)
        # We need acceleration at current pos (P_prev effectively).
        # At top of loop 'r' is current pos.
        
        r5 = r2[flying]**2.5 # r^5
        factor = -1.5 * h2[flying] / r5 * step_size
        
        Vx[flying] += factor * Px[flying]
        Vy[flying] += factor * Py[flying]
        Vz[flying] += factor * Pz[flying]
        
    # Re-evaluate final status for horizon/background
    # Since we modified active_mask in the loop for disk hits, 
    # 'hit_mask' needs to be recomputed for remaining rays or just allow final cleanup?
    # Rays that hit disk are NOT flying anymore.
    # Rays that hit horizon are NOT flying.
    
    # We just need to handle the remaining rays (active_mask is False for disk hits)
    # The loop exit condition ensures flying handles mostly everything.
    # But we need to color the horizon hits and background.
    
    # Re-check horizon for those that aren't disk
    r2 = Px**2 + Py**2 + Pz**2
    r_final = np.sqrt(r2)
    
    # Hits horizon?
    bh_hit = (r_final < horizon_dist) & (~disk_mask_accum)
    final_color[bh_hit] = [0, 0, 0]
    
    # Background for escaped rays
    # Rays that didn't hit BH and didn't hit Disk
    escaped = (~bh_hit) & (~disk_mask_accum)
    
    if np.any(escaped):
        Evx = Vx[escaped]
        Evy = Vy[escaped]
        Evz = Vz[escaped]
        
        # Normalize
        norm_v = np.sqrt(Evx**2 + Evy**2 + Evz**2)
        Evx /= norm_v
        Evy /= norm_v
        Evz /= norm_v
        
        # Checkerboard pattern
        freq = 10
        theta = np.arccos(np.clip(Evz, -1, 1))
        phi = np.arctan2(Evy, Evx)
        
        check = (np.sin(phi * freq) * np.sin(theta * freq)) > 0
        
        bg_colors = np.zeros((np.sum(escaped), 3))
        bg_colors[check] = [0, 0, 0] # Black checks
        bg_colors[~check] = [1, 1, 1] # White checks
        
        final_color[escaped] = bg_colors
    
    plt.figure(figsize=(10, 8))
    plt.imshow(final_color, extent=[-1, 1, -1, 1])
    plt.title(f"Black Hole Simulation (Schwarzschild)\nCamera dist: {cam_dist} Rs, FOV: {ang} deg")
    plt.axis('off')
    print("displaying image")
    plt.show()

if __name__ == "__main__":
    try:
        simulate_black_hole()
    except Exception as e:
        print(f"An error occurred: {e}")
