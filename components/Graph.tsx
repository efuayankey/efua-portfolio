'use client';
import { useEffect, useRef } from 'react';
import { NODE_DEFS, EDGES } from '@/lib/nodes';
import { PhysNode, stepPhysics, initNodes, updateHomePositions } from '@/lib/physics';
import type { TooltipState } from './Tooltip';

interface Particle { t: number; speed: number; trail: number[]; }

interface GraphProps {
  onNodeHover: (tip: TooltipState | null) => void;
  onNodeClick: (id: string) => void;
  activeNode: string | null;
  bootDone: boolean;
  panelOpen: boolean;
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export default function Graph({ onNodeHover, onNodeClick, activeNode, bootDone, panelOpen }: GraphProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const nodesRef     = useRef<PhysNode[]>([]);
  const frameRef     = useRef(0);
  const photosRef    = useRef<HTMLImageElement[]>([]);
  const photoRef     = useRef<HTMLImageElement | null>(null); // kept for compat
  const photoIdxRef  = useRef(0);       // current photo index
  const photoNextRef = useRef(0);       // next photo index (during fade)
  const photoFadeRef = useRef(1);       // 0→1 cross-fade progress
  const photoTimerRef = useRef(0);      // frame counter for interval
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const hoveredRef   = useRef<string | null>(null);
  const dragRef      = useRef<{ id: string; ox: number; oy: number; startX: number; startY: number } | null>(null);
  const particlesRef = useRef<Map<string, Particle[]>>(new Map());
  const fontsReady   = useRef(false);

  // Keep latest prop values accessible from the RAF loop without restarting it
  const bootDoneRef    = useRef(bootDone);
  const activeNodeRef  = useRef(activeNode);
  const panelOpenRef   = useRef(panelOpen);
  const bootFrameRef   = useRef<number | null>(null); // frame when bootDone first turned true
  useEffect(() => { bootDoneRef.current    = bootDone;   }, [bootDone]);
  useEffect(() => { activeNodeRef.current  = activeNode; }, [activeNode]);
  useEffect(() => { panelOpenRef.current   = panelOpen;  }, [panelOpen]);

  // Stable callbacks for mouse events
  const onNodeHoverRef  = useRef(onNodeHover);
  const onNodeClickRef  = useRef(onNodeClick);
  useEffect(() => { onNodeHoverRef.current = onNodeHover; }, [onNodeHover]);
  useEffect(() => { onNodeClickRef.current = onNodeClick; }, [onNodeClick]);

  // One-time setup + animation loop (never restarts)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── helpers ──────────────────────────────────────────────────
    const dpr = () => window.devicePixelRatio || 1;

    const getCenter = () => {
      const w = canvas.width / dpr();
      const h = canvas.height / dpr();
      const panelW = panelOpenRef.current ? Math.min(460, window.innerWidth) : 0;
      return { cx: (w - panelW) / 2, cy: h / 2 };
    };

    const getNodeAt = (mx: number, my: number) => {
      for (const n of nodesRef.current) {
        const dx = mx - n.x, dy = my - n.y;
        if (dx * dx + dy * dy <= (n.r + 8) * (n.r + 8)) return n.id;
      }
      return null;
    };

    // ── resize ───────────────────────────────────────────────────
    const resize = () => {
      const d = dpr();
      canvas.width  = window.innerWidth  * d;
      canvas.height = window.innerHeight * d;
      canvas.style.width  = window.innerWidth  + 'px';
      canvas.style.height = window.innerHeight + 'px';
      const { cx, cy } = getCenter();
      updateHomePositions(nodesRef.current, cx, cy);
    };
    resize();
    window.addEventListener('resize', resize);

    // ── init nodes ───────────────────────────────────────────────
    const { cx, cy } = getCenter();
    nodesRef.current = initNodes(NODE_DEFS.map(d => ({ id: d.id, r: d.r })), cx, cy);

    // ── init particles ───────────────────────────────────────────
    const map = new Map<string, Particle[]>();
    EDGES.forEach(([s, t]) => {
      const key = `${s}:${t}`;
      const count = (s === 'center' || t === 'center') ? 3 : 2;
      map.set(key, Array.from({ length: count }, (_, i) => ({
        t: i / count,
        speed: (0.0015 + Math.random() * 0.001) * (i % 2 === 0 ? 1 : -1),
        trail: [] as number[],
      })));
    });
    particlesRef.current = map;

    // ── load photos ──────────────────────────────────────────────
    const PHOTO_SRCS = ['/efua-photo.jpg', '/photo-2.jpeg', '/photo-1.jpeg'];
    // scale: zoom level (1.0 = fit, >1 = zoom in). offsetY: vertical shift as fraction of radius (+ = down, - = up)
    const PHOTO_CFG  = [
      { scale: 1.15, offsetY: -0.08 }, // efua-photo — current
      { scale: 1.1,  offsetY: -0.05 }, // photo-2 — mid
      { scale: 1.25, offsetY:  0.12 }, // photo-1 — baby
    ];
    const loaded: HTMLImageElement[] = [];
    PHOTO_SRCS.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded[i] = img;
        if (i === 0) photoRef.current = img; // compat
        photosRef.current = loaded.filter(Boolean);
      };
    });
    const PHOTO_INTERVAL = 600; // ~10s at 60fps

    // ── fonts ────────────────────────────────────────────────────
    document.fonts.ready.then(() => { fontsReady.current = true; });

    // ── draw helpers ─────────────────────────────────────────────
    const drawDotGrid = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const spacing = 38;
      const { x: mx, y: my } = mouseRef.current;
      ctx.save();
      for (let x = 0; x <= w; x += spacing) {
        for (let y = 0; y <= h; y += spacing) {
          const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
          const prox = Math.max(0, 1 - dist / 120);
          ctx.fillStyle = `rgba(232,85,42,${0.06 + prox * 0.34})`;
          ctx.beginPath();
          ctx.arc(x, y, 1 + prox * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    };

    const drawEdges = (ctx: CanvasRenderingContext2D, t: number) => {
      EDGES.forEach(([sid, tid], i) => {
        const a = nodesRef.current.find(n => n.id === sid);
        const b = nodesRef.current.find(n => n.id === tid);
        if (!a || !b) return;
        const alpha = 0.35 + Math.sin(t * 0.02 + i * 0.7) * 0.1;
        ctx.save();
        ctx.strokeStyle = `rgba(253,246,232,${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.restore();
      });
    };

    const drawParticles = (ctx: CanvasRenderingContext2D, bootAge: number) => {
      if (bootAge < 60) return;
      const fadeIn = Math.min(1, (bootAge - 60) / 30);
      EDGES.forEach(([sid, tid]) => {
        const a = nodesRef.current.find(n => n.id === sid);
        const b = nodesRef.current.find(n => n.id === tid);
        if (!a || !b) return;
        const particles = particlesRef.current.get(`${sid}:${tid}`) || [];
        particles.forEach(p => {
          p.trail.push(p.t);
          if (p.trail.length > 5) p.trail.shift();
          p.trail.forEach((tt, i) => {
            const px = a.x + (b.x - a.x) * tt;
            const py = a.y + (b.y - a.y) * tt;
            ctx.fillStyle = `rgba(232,85,42,${fadeIn * (i / p.trail.length) * 0.35})`;
            ctx.beginPath(); ctx.arc(px, py, 1.5, 0, Math.PI * 2); ctx.fill();
          });
          const px = a.x + (b.x - a.x) * p.t;
          const py = a.y + (b.y - a.y) * p.t;
          const grad = ctx.createRadialGradient(px, py, 0, px, py, 7);
          grad.addColorStop(0, `rgba(232,85,42,${0.7 * fadeIn})`);
          grad.addColorStop(1, 'rgba(232,85,42,0)');
          ctx.fillStyle = grad;
          ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(255,122,82,${0.95 * fadeIn})`;
          ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill();
          p.t += p.speed;
          if (p.t > 1) p.t = 0;
          if (p.t < 0) p.t = 1;
        });
      });
    };

    const drawCenterNode = (ctx: CanvasRenderingContext2D, n: PhysNode, t: number) => {
      const { r } = n;
      const r1 = r + 12 + Math.sin(t * 0.025) * 6;
      const r2 = r + 24 + Math.sin(t * 0.015 + 1.5) * 9;
      ctx.save();
      ctx.strokeStyle = `rgba(232,85,42,${0.18 + Math.sin(t * 0.025) * 0.08})`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(n.x, n.y, r1, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = `rgba(232,85,42,${0.09 + Math.sin(t * 0.015 + 1.5) * 0.04})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.arc(n.x, n.y, r2, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(n.x, n.y, r - 3, 0, Math.PI * 2);
      ctx.clip();
      const photos = photosRef.current;
      if (photos.length > 0) {
        const cr = r - 3;
        const curIdx = photoIdxRef.current % photos.length;
        const nxtIdx = photoNextRef.current % photos.length;
        const fade   = photoFadeRef.current;
        const cur    = photos[curIdx];
        const nxt    = photos[nxtIdx];

        const drawPhoto = (img: HTMLImageElement, idx: number, alpha: number) => {
          const cfg = PHOTO_CFG[idx] ?? { scale: 1.1, offsetY: -0.05 };
          const d = cr * 2 * cfg.scale;
          const ox = n.x - d / 2;
          const oy = n.y - d / 2 + cr * cfg.offsetY;
          ctx.globalAlpha = alpha;
          ctx.drawImage(img, ox, oy, d, d);
        };

        if (cur) drawPhoto(cur, curIdx, 1 - fade);
        if (nxt && fade > 0) drawPhoto(nxt, nxtIdx, fade);
        ctx.globalAlpha = 1;
      } else {
        ctx.fillStyle = '#1a1a1a';
        ctx.fill();
      }
      ctx.restore();

      // Sphere: subtle shadow over photo
      const cShad = ctx.createRadialGradient(n.x + r * 0.25, n.y + r * 0.3, 0, n.x, n.y, r);
      cShad.addColorStop(0, 'rgba(0,0,0,0.35)');
      cShad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = cShad;
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill();

      // Sphere: specular highlight top-left over photo
      const cSpec = ctx.createRadialGradient(n.x - r * 0.3, n.y - r * 0.35, 0, n.x - r * 0.3, n.y - r * 0.35, r * 0.5);
      cSpec.addColorStop(0, 'rgba(255,255,255,0.14)');
      cSpec.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = cSpec;
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill();

      const isActive = activeNodeRef.current === 'center';
      ctx.strokeStyle = isActive ? '#ff7a52' : '#e8552a';
      ctx.lineWidth = isActive ? 3 : 2.5;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.stroke();

      // ABOUT label below photo
      if (fontsReady.current) {
        ctx.fillStyle = 'rgba(253,246,232,0.45)';
        ctx.font = `500 11px 'IBM Plex Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('ABOUT', n.x, n.y + r + 10);
      }
    };

    const drawNode = (ctx: CanvasRenderingContext2D, n: PhysNode, t: number) => {
      const hovered  = hoveredRef.current === n.id;
      const isActive = activeNodeRef.current === n.id;
      const def = NODE_DEFS.find(d => d.id === n.id);
      const { r, g, b } = hexToRgb(def?.color ?? '#888888');
      const { x: mx, y: my } = mouseRef.current;
      const mouseDist = Math.sqrt((mx - n.x) ** 2 + (my - n.y) ** 2);

      if (mouseDist < 220) {
        const strength = (1 - mouseDist / 220) * 0.18;
        const grad = ctx.createRadialGradient(n.x, n.y, n.r, n.x, n.y, 220);
        grad.addColorStop(0, `rgba(${r},${g},${b},${strength})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(n.x, n.y, 220, 0, Math.PI * 2); ctx.fill();
      }

      // Boot pulse — expands once when bootDone fires
      if (bootFrameRef.current !== null) {
        const age = t - bootFrameRef.current;
        const PULSE_DUR = 50;
        if (age >= 0 && age < PULSE_DUR) {
          const progress = age / PULSE_DUR;
          const pulseR = n.r + progress * 40;
          const alpha = (1 - progress) * 0.5;
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(n.x, n.y, pulseR, 0, Math.PI * 2); ctx.stroke();
        }
      }

      if (hovered || isActive) {
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.25 + Math.sin(t * 0.04) * 0.1})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 9, 0, Math.PI * 2); ctx.stroke();
      }

      ctx.fillStyle = '#0a0a0a';
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();

      // Sphere: colored inner glow top-left
      const glow = ctx.createRadialGradient(n.x - n.r * 0.35, n.y - n.r * 0.4, 0, n.x, n.y, n.r);
      glow.addColorStop(0, `rgba(${r},${g},${b},0.22)`);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();

      // Sphere: shadow bottom-right
      const shad = ctx.createRadialGradient(n.x + n.r * 0.3, n.y + n.r * 0.35, 0, n.x, n.y, n.r * 1.1);
      shad.addColorStop(0, 'rgba(0,0,0,0.5)');
      shad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = shad;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();

      // Sphere: specular highlight top-left
      const spec = ctx.createRadialGradient(n.x - n.r * 0.32, n.y - n.r * 0.36, 0, n.x - n.r * 0.32, n.y - n.r * 0.36, n.r * 0.45);
      spec.addColorStop(0, 'rgba(255,255,255,0.18)');
      spec.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = spec;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = (hovered || isActive) ? `rgba(${r},${g},${b},1)` : `rgba(${r},${g},${b},0.75)`;
      ctx.lineWidth = (hovered || isActive) ? 2 : 1.5;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.stroke();

      if (def?.label && fontsReady.current) {
        ctx.fillStyle = (hovered || isActive) ? '#fdf6e8' : 'rgba(253,246,232,0.8)';
        ctx.font = `${Math.round(n.r * 0.52)}px 'Bebas Neue', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(def.label, n.x, n.y);
      }
    };

    // ── main RAF loop ─────────────────────────────────────────────
    let animId: number;
    let active = true;

    const loop = () => {
      if (!active) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) { animId = requestAnimationFrame(loop); return; }

      const d = dpr();
      ctx.setTransform(d, 0, 0, d, 0, 0); // scale up to physical pixels; draw in CSS px
      const w = canvas.width / d, h = canvas.height / d;
      ctx.clearRect(0, 0, w, h);

      const { cx, cy } = getCenter();
      const t = frameRef.current;
      const bd = bootDoneRef.current;

      // Capture frame when boot first completes so pulse knows when to fire
      if (bd && bootFrameRef.current === null) bootFrameRef.current = t;

      drawDotGrid(ctx, w, h);
      drawEdges(ctx, t);
      if (bd) drawParticles(ctx, t);

      for (const n of nodesRef.current) {
        if (n.id === 'center') drawCenterNode(ctx, n, t);
        else drawNode(ctx, n, t);
      }

      if (bd && fontsReady.current && t > 20) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, (t - 20) / 40) * 0.35;
        ctx.fillStyle = '#fdf6e8';
        ctx.font = '300 11px "IBM Plex Mono", monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText('"I build systems that reason, scale, and stay reliable."', 32, h - 28);
        ctx.restore();
      }

      // Photo rotation — advance timer, trigger fade, then swap
      const FADE_DUR = 40; // ~0.67s fade
      photoTimerRef.current++;
      if (photoTimerRef.current >= PHOTO_INTERVAL && photoFadeRef.current === 1) {
        // Begin fade to next photo
        photoNextRef.current = (photoIdxRef.current + 1) % Math.max(1, photosRef.current.length);
        photoFadeRef.current = 0;
        photoTimerRef.current = 0;
      }
      if (photoFadeRef.current < 1 && photoFadeRef.current >= 0 && photoNextRef.current !== photoIdxRef.current) {
        photoFadeRef.current = Math.min(1, photoFadeRef.current + 1 / FADE_DUR);
        if (photoFadeRef.current >= 1) {
          photoIdxRef.current = photoNextRef.current;
          photoFadeRef.current = 1;
        }
      }

      updateHomePositions(nodesRef.current, cx, cy);
      stepPhysics(nodesRef.current, EDGES, cx, cy, t);
      frameRef.current++;
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    // ── mouse events ──────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (dragRef.current) {
        const n = nodesRef.current.find(nd => nd.id === dragRef.current!.id);
        if (n) { n.x = e.clientX - dragRef.current.ox; n.y = e.clientY - dragRef.current.oy; n.vx = 0; n.vy = 0; n.pinned = true; }
        return;
      }
      const id = getNodeAt(e.clientX, e.clientY);
      if (id !== hoveredRef.current) {
        hoveredRef.current = id;
        if (id) {
          const def = NODE_DEFS.find(d => d.id === id);
          onNodeHoverRef.current({ x: e.clientX, y: e.clientY, id, name: def?.label || 'Efua', desc: def?.tooltipDesc || '' });
        } else {
          onNodeHoverRef.current(null);
        }
      }
    };

    const onDown = (e: MouseEvent) => {
      const id = getNodeAt(e.clientX, e.clientY);
      if (!id) return;
      const n = nodesRef.current.find(nd => nd.id === id);
      if (!n) return;
      dragRef.current = { id, ox: e.clientX - n.x, oy: e.clientY - n.y, startX: e.clientX, startY: e.clientY };
    };

    const onUp = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const { id, startX, startY } = dragRef.current;
      const n = nodesRef.current.find(nd => nd.id === id);
      if (n) n.pinned = false;
      const dist = Math.sqrt((e.clientX - startX) ** 2 + (e.clientY - startY) ** 2);
      if (dist < 8) onNodeClickRef.current(id);
      dragRef.current = null;
    };

    // Touch support for iPad/tablet
    const getTouchPos = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches[0];
      return { x: t.clientX, y: t.clientY };
    };
    const onTouchStart = (e: TouchEvent) => {
      const { x, y } = getTouchPos(e);
      mouseRef.current = { x, y };
      const id = getNodeAt(x, y);
      if (!id) return;
      const n = nodesRef.current.find(nd => nd.id === id);
      if (!n) return;
      dragRef.current = { id, ox: x - n.x, oy: y - n.y, startX: x, startY: y };
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const { x, y } = getTouchPos(e);
      mouseRef.current = { x, y };
      if (dragRef.current) {
        const n = nodesRef.current.find(nd => nd.id === dragRef.current!.id);
        if (n) { n.x = x - dragRef.current.ox; n.y = y - dragRef.current.oy; n.vx = 0; n.vy = 0; n.pinned = true; }
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!dragRef.current) return;
      const touch = e.changedTouches[0];
      const { id, startX, startY } = dragRef.current;
      const n = nodesRef.current.find(nd => nd.id === id);
      if (n) n.pinned = false;
      const dist = Math.sqrt((touch.clientX - startX) ** 2 + (touch.clientY - startY) ** 2);
      if (dist < 10) onNodeClickRef.current(id);
      dragRef.current = null;
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);

    return () => {
      active = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, []); // runs once — reads live values via refs

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%' }}
    />
  );
}
