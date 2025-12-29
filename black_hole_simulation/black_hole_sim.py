import numpy as np
import pygame
import math
import sys
from numba import njit, prange

# Configuration
WIDTH, HEIGHT = 400, 300  # Resolution
RS = 1.0  # Schwarzschild radius

@njit(parallel=True, fastmath=True)
def render_frame(cam_pos, cam_dir, cam_up, width, height, time_val):
    # Prepare output buffer
    buffer = np.zeros((height, width, 3), dtype=np.uint8)
    
    # Camera Plane Setup
    fov_deg = 60.0
    fov_rad = math.radians(fov_deg)
    scale = math.tan(fov_rad * 0.5)
    aspect = width / height
    
    # Ortonormal Basis
    # forward = cam_dir (normalized)
    cd_len = math.sqrt(cam_dir[0]**2 + cam_dir[1]**2 + cam_dir[2]**2)
    fw_x, fw_y, fw_z = cam_dir[0]/cd_len, cam_dir[1]/cd_len, cam_dir[2]/cd_len
    
    # right = fw x up (using supplied up vector)
    rx = fw_y * cam_up[2] - fw_z * cam_up[1]
    ry = fw_z * cam_up[0] - fw_x * cam_up[2]
    rz = fw_x * cam_up[1] - fw_y * cam_up[0]
    r_len = math.sqrt(rx**2 + ry**2 + rz**2)
    if r_len < 1e-6:
        # Handle singularity (looking straight up/down)
        rx, ry, rz = 1.0, 0.0, 0.0
    else:
        rx, ry, rz = rx/r_len, ry/r_len, rz/r_len
    
    # true up = right x fw
    ux = ry * fw_z - rz * fw_y
    uy = rz * fw_x - rx * fw_z
    uz = rx * fw_y - ry * fw_x
    
    # Disk Orientation (Tilted 80 deg relative to Y-axis, so Normal is approx Z-tilted)
    # Let's define the disk normal. 
    # Original code had inc=80deg. Normal = (0, sin(80), cos(80)).
    dnx, dny, dnz = 0.0, 0.9848, 0.1736
    
    # Parallel Ray Marching
    for y in prange(height):
        for x in range(width):
            # Screen coordinates (0,0 is center)
            sx = (x / width - 0.5) * 2.0 * aspect * scale
            sy = -(y / height - 0.5) * 2.0 * scale
            
            # Ray direction info
            dx = fw_x + rx * sx + ux * sy
            dy = fw_y + ry * sx + uy * sy
            dz = fw_z + rz * sx + uz * sy
            d_norm = math.sqrt(dx*dx + dy*dy + dz*dz)
            dx, dy, dz = dx/d_norm, dy/d_norm, dz/d_norm
            
            # Initial State
            px, py, pz = cam_pos[0], cam_pos[1], cam_pos[2]
            vx, vy, vz = dx, dy, dz
            
            # Conserved Angular Momentum h = r x v
            lx = py*vz - pz*vy
            ly = pz*vx - px*vz
            lz = px*vy - py*vx
            h2 = lx*lx + ly*ly + lz*lz
            
            # Tracing
            col_r, col_g, col_b = 0.0, 0.0, 0.0
            hit_disk = False
            hit_bh = False
            
            # Distance from plane setup
            prev_dist = px*dnx + py*dny + pz*dnz
            
            for step in range(100): # Reduced steps for 60fps
                r2 = px*px + py*py + pz*pz
                
                # Horizon check
                if r2 < 1.0: 
                    hit_bh = True
                    break
                
                if r2 > 1600.0: # Escape
                    break
                
                # Step size
                dt = 0.5
                
                px_new = px + vx * dt
                py_new = py + vy * dt
                pz_new = pz + vz * dt
                
                # Disk Intersection Check
                curr_dist = px_new*dnx + py_new*dny + pz_new*dnz
                if curr_dist * prev_dist < 0:
                    # Crossed the plane
                    denom = prev_dist - curr_dist
                    if denom == 0: denom = 1e-6
                    frac = prev_dist / denom
                    ix = px + frac * (px_new - px)
                    iy = py + frac * (py_new - py)
                    iz = pz + frac * (pz_new - pz)
                    
                    ir2 = ix*ix + iy*iy + iz*iz
                    # Disk from 3Rs to 12Rs (sq 9 to 144)
                    if 9.0 < ir2 < 144.0:
                        ir = math.sqrt(ir2)
                        
                        # Texture: Rotating Spiral
                        # approx angle on plane?
                        # Using 3Dcoords is tricky if tilted.
                        # But simple atan2(iz+ix, iy) pattern works for visual
                        pat_angle = math.atan2(iz, ix)
                        pat = math.sin(pat_angle * 3.0 + ir * 2.0 - time_val * 4.0)
                        
                        intensity = 0.5 + 0.5 * pat
                        
                        # Color Gradient (Hotter inside)
                        temp = 12.0 / ir
                        col_r = min(1.0, temp * 0.8) * intensity
                        col_g = min(1.0, temp * 0.4) * intensity
                        col_b = min(1.0, temp * 0.1) * intensity
                        hit_disk = True
                        break
                
                # Update loop vars
                px, py, pz = px_new, py_new, pz_new
                prev_dist = curr_dist
                
                # Gravity (Acceleration)
                # a = -1.5 * h^2 / r^5 * r_vec
                r5 = r2 * r2 * math.sqrt(r2)
                acc = -1.5 * h2 / r5
                
                vx += acc * px * dt
                vy += acc * py * dt
                vz += acc * pz * dt
            
            if hit_bh:
                col_r, col_g, col_b = 0.0, 0.0, 0.0
            elif not hit_disk:
                # Background Stars
                theta = math.acos(vz)
                phi = math.atan2(vy, vx)
                
                # Star field
                # Pseudo-random based on direction
                val = math.sin(phi * 50.0) * math.sin(theta * 50.0)
                val2 = math.sin(phi * 23.0 + 1.2) * math.sin(theta * 17.0 + 3.4)
                if val > 0.95 and val2 > 0.5:
                     col_r, col_g, col_b = 1.0, 1.0, 1.0
                else:
                     col_r, col_g, col_b = 0.0, 0.0, 0.0
            
            buffer[y, x, 0] = int(min(255, col_r * 255))
            buffer[y, x, 1] = int(min(255, col_g * 255))
            buffer[y, x, 2] = int(min(255, col_b * 255))
            
    return buffer

def main():
    print("Initialize...")
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Real-Time Black Hole (WASD to Move, Mouse to Look)")
    clock = pygame.time.Clock()
    
    # Initial Camera
    cam_pos = np.array([0.0, 2.0, -20.0], dtype=np.float64)
    # Looking towards +Z (which is (0,0,-20) -> (0,0,0))
    # Let's say Yaw=0 is +Z.
    yaw = 0.0 
    pitch = 0.0
    
    print("Compiling Numba Kernel (First run takes time)...")
    # Warmup
    render_frame(cam_pos, np.array([0.0,0.0,1.0]), np.array([0.0,1.0,0.0]), WIDTH, HEIGHT, 0.0)
    print("Running!")
    
    running = True
    pygame.mouse.set_visible(False)
    pygame.event.set_grab(True)
    
    t_start = pygame.time.get_ticks()
    
    while running:
        dt = clock.tick(30)
        t_now = (pygame.time.get_ticks() - t_start) / 1000.0
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False
            elif event.type == pygame.MOUSEMOTION:
                dx, dy = event.rel
                yaw += dx * 0.005
                pitch -= dy * 0.005
                pitch = max(-1.5, min(1.5, pitch))
        
        # Vectors
        # Yaw=0 -> +Z (0,0,1)
        # Yaw=90 -> +X (1,0,0) ?? No, standard trig:
        # if x = sin(yaw), z=cos(yaw) => 0->(0,1).  
        fw_x = math.sin(yaw) * math.cos(pitch)
        fw_y = math.sin(pitch)
        fw_z = math.cos(yaw) * math.cos(pitch)
        fwd = np.array([fw_x, fw_y, fw_z])
        
        # Right
        right = np.cross(fwd, np.array([0.0, 1.0, 0.0]))
        rn = np.linalg.norm(right)
        if rn > 1e-4:
            right /= rn
        
        # Up
        up = np.cross(right, fwd)
        
        # Keys
        keys = pygame.key.get_pressed()
        speed = 0.5
        if keys[pygame.K_LSHIFT]: speed = 1.0
        
        if keys[pygame.K_w]: cam_pos += fwd * speed
        if keys[pygame.K_s]: cam_pos -= fwd * speed
        if keys[pygame.K_a]: cam_pos -= right * speed
        if keys[pygame.K_d]: cam_pos += right * speed
        if keys[pygame.K_e]: cam_pos += up * speed
        if keys[pygame.K_q]: cam_pos -= up * speed
        
        # Render
        # Pass fwd as cam_dir, up as cam_up
        img = render_frame(cam_pos, fwd, up, WIDTH, HEIGHT, t_now)
        
        # Blit
        surf = pygame.surfarray.make_surface(img.swapaxes(0, 1))
        screen.blit(surf, (0, 0))
        pygame.display.flip()

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()