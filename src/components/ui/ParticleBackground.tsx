import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let rafId: number;
    const COUNT = 55;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    type Particle = {
      x: number; y: number; r: number; speed: number;
      drift: number; alpha: number; wobble: number; wobbleSpeed: number;
    };

    const make = (): Particle => ({
      x: rand(0, W),
      y: rand(H * 0.1, H),
      r: rand(0.8, 2.2),
      speed: rand(0.08, 0.28),
      drift: rand(-0.06, 0.06),
      alpha: rand(0.04, 0.13),
      wobble: rand(0, Math.PI * 2),
      wobbleSpeed: rand(0.003, 0.009),
    });

    let particles: Particle[] = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      resize();
      particles = Array.from({ length: COUNT }, make);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.wobble += p.wobbleSpeed;
        p.x += p.drift + Math.sin(p.wobble) * 0.12;
        p.y -= p.speed;
        if (p.y + p.r < 0) {
          p.x = rand(0, W);
          p.y = H + p.r;
          p.alpha = rand(0.04, 0.13);
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 118, 237, ${p.alpha})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}