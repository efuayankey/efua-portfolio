'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top  = e.clientY + 'px';
      }
    };

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.09;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.09;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top  = ring.current.y + 'px';
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const base: React.CSSProperties = {
    position: 'fixed', pointerEvents: 'none', zIndex: 9999,
    transform: 'translate(-50%, -50%)',
  };

  return (
    <>
      <div ref={dotRef} style={{
        ...base, width: 10, height: 10,
        background: '#e8552a', borderRadius: '50%',
      }} />
      <div ref={ringRef} style={{
        ...base, width: 34, height: 34,
        border: '1px solid rgba(232,85,42,0.45)',
        borderRadius: '50%', zIndex: 9998,
        transition: 'width 0.2s, height 0.2s, border-color 0.2s',
      }} />
    </>
  );
}
