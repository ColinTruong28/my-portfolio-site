import { useEffect, useRef } from 'react';


export default function GoldRibbon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let t = 0;

    // Ribbon band config
    const bands = [
      { yBase: 0.16, amp: 0.08, freq: 0.55, speed: 0.42, phase: 0,    width: 200,  alpha: 0.10 },
      { yBase: 0.38, amp: 0.12, freq: 0.40, speed: 0.14, phase: 1.1,  width: 140, alpha: 0.07 },
      { yBase: 0.76, amp: 0.09, freq: 0.65, speed: 0.22, phase: 2.3,  width: 300,  alpha: 0.09 },
    //   { yBase: 0.75, amp: 0.07, freq: 0.50, speed: 0.16, phase: 0.7,  width: 110, alpha: 0.06 },
    //   { yBase: 0.18, amp: 0.06, freq: 0.70, speed: 0.20, phase: 3.1,  width: 60,  alpha: 0.08 },
    ];

    // Gold colour stops (RGBA strings)
    // const goldLight  = 'rgba(237, 207, 122, 1)';  // #EDCF7A
    // const goldMid    = 'rgba(184, 152,  48, 1)';  // #B89830
    // const goldDark   = 'rgba(120,  95,  20, 1)';  // #785F14

    function resize() {
      if (!canvas) return;
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function drawBand(
      band: typeof bands[0],
      W: number,
      H: number,
    ) {
      if (!ctx) return;

      const SEGMENTS = 120;
      const yCenter  = band.yBase * H;

      // Build the upper and lower edges of the ribbon as wavy paths
      const upper: [number, number][] = [];
      const lower: [number, number][] = [];
      const halfW = band.width / 2;

      for (let i = 0; i <= SEGMENTS; i++) {
        const x = (i / SEGMENTS) * W;
        // Primary wave + subtle secondary ripple
        const y =
          yCenter +
          Math.sin(band.freq * (i / SEGMENTS) * Math.PI * 2 + band.phase + t * band.speed) * band.amp * H +
          Math.sin(band.freq * 2.3 * (i / SEGMENTS) * Math.PI * 2 + t * band.speed * 1.7) * band.amp * 0.2 * H;

        // Twist simulation: width pulses slightly along the ribbon
        const twist = 1 + 0.35 * Math.sin(band.freq * 3 * (i / SEGMENTS) * Math.PI * 2 + t * band.speed * 2);

        upper.push([x, y - halfW * twist]);
        lower.push([x, y + halfW * twist]);
      }

      // Draw the filled ribbon shape
      ctx.beginPath();
      ctx.moveTo(upper[0][0], upper[0][1]);
      for (let i = 1; i < upper.length; i++) {
        const [px, py] = upper[i - 1];
        const [cx, cy] = upper[i];
        ctx.quadraticCurveTo(px, py, (px + cx) / 2, (py + cy) / 2);
      }
      // Trace lower edge in reverse
      for (let i = lower.length - 1; i >= 1; i--) {
        const [px, py] = lower[i];
        const [cx, cy] = lower[i - 1];
        ctx.quadraticCurveTo(px, py, (px + cx) / 2, (py + cy) / 2);
      }
      ctx.closePath();

      // Gradient across the ribbon width (simulates sheen)
      // const midY = (upper[0][1] + lower[0][1]) / 2;
      const grad = ctx.createLinearGradient(0, upper[0][1], 0, lower[0][1]);
      grad.addColorStop(0,    `rgba(237,207,122,0)`);
      grad.addColorStop(0.15, `rgba(237,207,122,${band.alpha})`);
      grad.addColorStop(0.40, `rgba(184,152, 48,${band.alpha * 1.4})`);
      grad.addColorStop(0.55, `rgba(237,207,122,${band.alpha * 2.0})`); // highlight centre
      grad.addColorStop(0.70, `rgba(184,152, 48,${band.alpha * 1.4})`);
      grad.addColorStop(0.85, `rgba(120, 95, 20,${band.alpha})`);
      grad.addColorStop(1,    `rgba(120, 95, 20,0)`);

      ctx.fillStyle = grad;
      ctx.fill();

      // Fine edge lines for the silk-thread look
      ctx.strokeStyle = `rgba(237,207,122,${band.alpha * 0.5})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(upper[0][0], upper[0][1]);
      for (let i = 1; i < upper.length; i++) {
        const [px, py] = upper[i - 1];
        const [cx, cy] = upper[i];
        ctx.quadraticCurveTo(px, py, (px + cx) / 2, (py + cy) / 2);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(lower[0][0], lower[0][1]);
      for (let i = 1; i < lower.length; i++) {
        const [px, py] = lower[i - 1];
        const [cx, cy] = lower[i];
        ctx.quadraticCurveTo(px, py, (px + cx) / 2, (py + cy) / 2);
      }
      ctx.stroke();
    }

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      for (const band of bands) {
        drawBand(band, W, H);
      }

      t += 0.012;
      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
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
        zIndex: -200,
      }}
    />
  );
}
