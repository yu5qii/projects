import React, { useEffect, useRef, useState } from 'react';

const CHAR_SET = "   .:-+=*#%@W";
const SCRAMBLE_CHARS = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

export default function AsciiReveal({
  src,
  alt,
  aspectRatio = "16/9",
  cellWidth = 7,
  cellHeight = 12,
  scrambleDuration = 12,
  maxDelay = 25,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [src]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 } 
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isLoaded || !isInViewport || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const cols = Math.ceil(width / cellWidth);
    const rows = Math.ceil(height / cellHeight);

    const offscreen = document.createElement('canvas');
    offscreen.width = cols;
    offscreen.height = rows;
    const oCtx = offscreen.getContext('2d');

    const img = new Image();
    img.src = src;
    img.onload = () => {
      oCtx.drawImage(img, 0, 0, cols, rows);
      const imgData = oCtx.getImageData(0, 0, cols, rows);
      const pixels = imgData.data;

      const cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = (r * cols + c) * 4;
          const red = pixels[idx];
          const green = pixels[idx + 1];
          const blue = pixels[idx + 2];
          const alpha = pixels[idx + 3];

          if (alpha < 50) continue;

          const brightness = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
          
          const charIndex = Math.floor((brightness / 255) * (CHAR_SET.length - 1));
          const targetChar = CHAR_SET[charIndex];

          cells.push({
            x: c * cellWidth,
            y: r * cellHeight + cellHeight, 
            color: `rgb(${red}, ${green}, ${blue})`,
            targetChar,
            startFrame: Math.floor(Math.random() * maxDelay),
            scramblingDuration: scrambleDuration + Math.floor(Math.random() * 8),
          });
        }
      }

      ctx.font = `bold ${cellHeight}px 'DM Mono', monospace`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';

      let frame = 0;
      let animationId;

      const animate = () => {
        ctx.clearRect(0, 0, width, height);

        let allSettled = true;

        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];

          if (frame < cell.startFrame) {
            ctx.fillStyle = 'rgba(107, 104, 96, 0.15)';
            ctx.fillText('.', cell.x, cell.y);
            allSettled = false;
          } else if (frame < cell.startFrame + cell.scramblingDuration) {
            const randIdx = Math.floor(Math.random() * SCRAMBLE_CHARS.length);
            const randChar = SCRAMBLE_CHARS[randIdx];
            
            ctx.fillStyle = cell.color;
            ctx.fillText(randChar, cell.x, cell.y);
            allSettled = false;
          } else {
            ctx.fillStyle = cell.color;
            ctx.fillText(cell.targetChar, cell.x, cell.y);
          }
        }

        if (allSettled) {
          setAnimationCompleted(true);
          cancelAnimationFrame(animationId);
        } else {
          frame++;
          animationId = requestAnimationFrame(animate);
        }
      };

      animate();
    };

  }, [isLoaded, isInViewport]);

  return (
    <div 
      ref={containerRef}
      className={`ascii-reveal-wrap ${animationCompleted ? 'revealed' : ''}`}
      style={{ aspectRatio }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="ascii-reveal-img"
        loading="lazy"
      />

      <canvas
        ref={canvasRef}
        className="ascii-reveal-canvas"
      />
    </div>
  );
}
