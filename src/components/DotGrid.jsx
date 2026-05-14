import React, { useRef, useEffect } from 'react';

const GAP       = 34;
const R_REST    = 2.3;
const R_MAX     = 4.8;
const REPEL_R   = 110;
const STRENGTH  = 8;
const SPRING    = 0.08;
const DAMPING   = 0.72;

const DotGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const mouse = { x: -9999, y: -9999 };
    let dots = [];
    let raf;

    const build = () => {
      dots = [];
      const W = canvas.width;
      const H = canvas.height;
      const cols = Math.floor(W / GAP) + 2;
      const rows = Math.floor(H / GAP) + 2;
      const startX = ((W % GAP) + GAP) / 2;
      const startY = ((H % GAP) + GAP) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * GAP;
          const y = startY + r * GAP;
          dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
        }
      }
    };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      build();
    };
    window.addEventListener('resize', resize);
    resize();

    // Canvas is fixed at (0,0), so clientX/Y map directly to canvas coords
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_R && dist > 0.1) {
          const f = (1 - dist / REPEL_R) * STRENGTH;
          d.vx += (dx / dist) * f;
          d.vy += (dy / dist) * f;
        }

        d.vx = (d.vx + (d.ox - d.x) * SPRING) * DAMPING;
        d.vy = (d.vy + (d.oy - d.y) * SPRING) * DAMPING;
        d.x += d.vx;
        d.y += d.vy;

        const disp = Math.hypot(d.x - d.ox, d.y - d.oy);
        const t = Math.min(disp / (REPEL_R * 0.55), 1);

        const r     = R_REST + (R_MAX - R_REST) * t;
        const gray  = Math.round(200 - t * 160);
        const alpha = 0.20 + t * 0.72;

        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${gray},${gray},${gray},${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};

export default DotGrid;
