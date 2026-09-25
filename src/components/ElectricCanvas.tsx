import React, { useEffect, useRef } from 'react';

interface ElectricCanvasProps {
  interactive?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  charge: number;
  pulsePhase: number;
}

interface Spark {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  life: number;
  maxLife: number;
  branches: { x: number; y: number }[];
  color: string;
}

export const ElectricCanvas: React.FC<ElectricCanvasProps> = ({
  interactive = true,
  intensity = 'medium',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Node count based on screen size and intensity
    const countMultiplier = intensity === 'low' ? 0.00004 : intensity === 'high' ? 0.0001 : 0.00007;
    const nodeCount = Math.min(80, Math.max(25, Math.floor(width * height * countMultiplier)));

    const colors = [
      'rgba(255, 107, 0, ', // Electric Orange
      'rgba(14, 165, 233, ', // Sky Blue (Arc)
      'rgba(0, 229, 255, ',  // Neon Cyan (High Voltage)
      'rgba(255, 255, 255, ', // White Core
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < nodeCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        charge: Math.random() * 100,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Generate random electrical branch between two points
    const createLightningBranch = (x1: number, y1: number, x2: number, y2: number, segments = 5): { x: number; y: number }[] => {
      const points = [{ x: x1, y: y1 }];
      for (let i = 1; i < segments; i++) {
        const t = i / segments;
        const baseCurX = x1 + (x2 - x1) * t;
        const baseCurY = y1 + (y2 - y1) * t;
        const offset = (Math.random() - 0.5) * 24;
        points.push({
          x: baseCurX + offset,
          y: baseCurY + offset,
        });
      }
      points.push({ x: x2, y: y2 });
      return points;
    };

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Periodically trigger ambient sparks between close nodes
      if (tick % 45 === 0 && particles.length > 2) {
        const p1 = particles[Math.floor(Math.random() * particles.length)];
        // find nearest
        let closest = particles[0];
        let minDist = Infinity;
        for (const p2 of particles) {
          if (p1 === p2) continue;
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (d < minDist && d < 180) {
            minDist = d;
            closest = p2;
          }
        }
        if (minDist < 180) {
          sparksRef.current.push({
            x: p1.x,
            y: p1.y,
            targetX: closest.x,
            targetY: closest.y,
            life: 0,
            maxLife: 8,
            branches: createLightningBranch(p1.x, p1.y, closest.x, closest.y, 6),
            color: Math.random() > 0.5 ? '#FF6B00' : '#00E5FF',
          });
        }
      }

      // Update & Draw Particles (Electrical Nodes)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse attraction/discharge
        if (interactive && mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            p.x += (dx / dist) * 1.5;
            p.y += (dy / dist) * 1.5;

            // Trigger lightning from mouse to particle when very close
            if (dist < 90 && Math.random() < 0.08) {
              sparksRef.current.push({
                x: mouseRef.current.x,
                y: mouseRef.current.y,
                targetX: p.x,
                targetY: p.y,
                life: 0,
                maxLife: 6,
                branches: createLightningBranch(mouseRef.current.x, mouseRef.current.y, p.x, p.y, 4),
                color: '#FF8A00',
              });
            }
          }
        }

        // Draw node with pulsating glow
        const pulse = Math.sin(p.pulsePhase + tick * 0.05) * 0.4 + 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${0.7 * pulse})`;
        ctx.fill();

        // Node Glow Halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${0.12 * pulse})`;
        ctx.fill();

        // Draw circuit connections between particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxDist = 130;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Energy packet travel animation along lines
            const energyPos = ((tick * 0.02 + i + j) % 1);
            const ex = p.x + (p2.x - p.x) * energyPos;
            const ey = p.y + (p2.y - p.y) * energyPos;
            ctx.beginPath();
            ctx.arc(ex, ey, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 107, 0, ${alpha * 2.5})`;
            ctx.fill();
          }
        }
      }

      // Draw Sparks / Lightning Arcs
      for (let sIdx = sparksRef.current.length - 1; sIdx >= 0; sIdx--) {
        const spark = sparksRef.current[sIdx];
        spark.life++;

        if (spark.life >= spark.maxLife) {
          sparksRef.current.splice(sIdx, 1);
          continue;
        }

        const sparkAlpha = 1 - spark.life / spark.maxLife;

        // Draw main jagged arc
        ctx.beginPath();
        if (spark.branches.length > 0) {
          ctx.moveTo(spark.branches[0].x, spark.branches[0].y);
          for (let b = 1; b < spark.branches.length; b++) {
            ctx.lineTo(spark.branches[b].x, spark.branches[b].y);
          }
        }
        ctx.strokeStyle = spark.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = spark.color;
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadow

        // Inner white hot core
        ctx.beginPath();
        if (spark.branches.length > 0) {
          ctx.moveTo(spark.branches[0].x, spark.branches[0].y);
          for (let b = 1; b < spark.branches.length; b++) {
            ctx.lineTo(spark.branches[b].x, spark.branches[b].y);
          }
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${sparkAlpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Burst of 4-6 sparks radiating from click
      for (let k = 0; k < 5; k++) {
        const angle = (Math.PI * 2 * k) / 5 + (Math.random() - 0.5) * 0.5;
        const sparkDist = Math.random() * 80 + 40;
        const targetX = clickX + Math.cos(angle) * sparkDist;
        const targetY = clickY + Math.sin(angle) * sparkDist;
        sparksRef.current.push({
          x: clickX,
          y: clickY,
          targetX,
          targetY,
          life: 0,
          maxLife: 10,
          branches: createLightningBranch(clickX, clickY, targetX, targetY, 5),
          color: k % 2 === 0 ? '#FF6B00' : '#00E5FF',
        });
      }
    };

    if (interactive) {
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseleave', onMouseLeave);
      canvas.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseleave', onMouseLeave);
        canvas.removeEventListener('click', onClick);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto z-0 ${className}`}
      style={{ opacity: 0.85 }}
    />
  );
};
