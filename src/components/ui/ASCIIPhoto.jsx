import { useEffect, useRef, useState } from 'react';

const CHARS = '@%#*+=-:. ';

const ASCIIPhoto = ({ src, cols = 72, className = '' }) => {
  const [ascii, setAscii] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      const charAspect = 2.1;
      const rows = Math.round((cols * aspectRatio) / charAspect);

      const canvas = document.createElement('canvas');
      canvas.width = cols;
      canvas.height = rows;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, cols, rows);

      const { data } = ctx.getImageData(0, 0, cols, rows);
      let result = '';

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const brightness = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
          const charIdx = Math.floor(brightness * (CHARS.length - 1));
          result += CHARS[charIdx];
        }
        result += '\n';
      }

      setAscii(result);
      setLoaded(true);
    };

    img.src = src;
  }, [src, cols]);

  return (
    <pre
      className={`font-mono leading-none select-none ${className}`}
      style={{
        fontSize: 'clamp(4px, 0.65vw, 8px)',
        color: '#c8ff3f',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.8s ease',
        letterSpacing: '0.05em',
        lineHeight: '1.1',
      }}
    >
      {ascii}
    </pre>
  );
};

export default ASCIIPhoto;
