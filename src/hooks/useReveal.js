import { useEffect, useRef } from 'react';

const useReveal = (threshold = 0.12) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(child => {
            child.classList.add('visible');
          });
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
};

export default useReveal;
