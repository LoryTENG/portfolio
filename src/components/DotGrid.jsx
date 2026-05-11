import React, { useRef, useEffect } from 'react';

const GAP       = 34;    // grid spacing (px)
const R_REST    = 2.3;   // dot radius at rest
const R_MAX     = 4.8;   // dot radius at max displacement
const REPEL_R   = 110;   // mouse repulsion radius (px)
const STRENGTH  = 8;     // repulsion force multiplier
const SPRING    = 0.08;  // spring constant (pulls dot home)
const DAMPING   = 0.72;  // velocity damping per frame

const DotGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const mouse = { x: -9999, y: -9999 };
    let dots = [];
    let raf;

    // ── Build grid ─────────────────────────────────────────────
    const build = () => {
      dots = [];
      const W = canvas.width;
      const H = canvas.height;
      // center the grid
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

    // ── Resize ─────────────────────────────────────────────────
    const resize = () => {
      const el = canvas.parentElement;
      canvas.width  = el.offsetWidth;
      canvas.height = el.offsetHeight;
      build();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();

    // ── Mouse — listened on parent so pointer-events:none on canvas works ──
    const parent = canvas.parentElement;
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);

    // ── Draw loop ──────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const d of dots) {
        // Repulsion force from mouse
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_R && dist > 0.1) {
          const f = (1 - dist / REPEL_R) * STRENGTH;
          d.vx += (dx / dist) * f;
          d.vy += (dy / dist) * f;
        }

        // Spring back to origin + damping
        d.vx = (d.vx + (d.ox - d.x) * SPRING) * DAMPING;
        d.vy = (d.vy + (d.oy - d.y) * SPRING) * DAMPING;
        d.x += d.vx;
        d.y += d.vy;

        // Displacement ratio 0→1
        const disp = Math.hypot(d.x - d.ox, d.y - d.oy);
        const t = Math.min(disp / (REPEL_R * 0.55), 1);

        // Visual: light gray at rest → dark gray when displaced
        const r     = R_REST + (R_MAX - R_REST) * t;
        const gray  = Math.round(200 - t * 160);   // 200 (light) → 40 (dark)
        const alpha = 0.20 + t * 0.72;              // 0.20 → 0.92

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
      ro.disconnect();
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
        // Fade edges so dots dissolve into the white background
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%), ' +
          'linear-gradient(to right,  transparent 0%, black 6%,  black 94%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%), ' +
          'linear-gradient(to right,  transparent 0%, black 6%,  black 94%, transparent 100%)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }}
    />
  );
};

export default DotGrid;
