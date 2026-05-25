import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (ringRef.current) ringRef.current.style.transform += ' scale(1.8)';
      if (ringRef.current) ringRef.current.style.borderColor = '#c8ff3f';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    const onLeaveLink = () => {
      if (ringRef.current) ringRef.current.style.borderColor = 'rgba(200,255,63,0.5)';
    };

    document.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(animate);

    const links = document.querySelectorAll('a, button, [data-cursor]');
    links.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          background: '#c8ff3f',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          border: '1.5px solid rgba(200,255,63,0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'border-color 0.2s, opacity 0.2s',
        }}
      />
    </>
  );
};

export default CustomCursor;
