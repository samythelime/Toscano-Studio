'use client';

import { useEffect, useRef, useState } from 'react';

const LERP = 0.45;

export default function CustomCursor() {
  const mouseRef = useRef({ x: -200, y: -200 });
  const glowRef = useRef({ x: -200, y: -200 });
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const tick = () => {
      glowRef.current = {
        x: glowRef.current.x + (mouseRef.current.x - glowRef.current.x) * LERP,
        y: glowRef.current.y + (mouseRef.current.y - glowRef.current.y) * LERP,
      };
      setPos({ ...glowRef.current });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: pos.x,
        top: pos.y,
        width: 72,
        height: 72,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(0,201,177,0.4) 0%, rgba(78,205,196,0.15) 40%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(2px)',
      }}
    />
  );
}
