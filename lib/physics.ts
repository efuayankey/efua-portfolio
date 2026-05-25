export interface PhysNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pinned: boolean;
  homeX: number;
  homeY: number;
  phase: number; // per-node breathing phase offset
}

const ORBIT_RADIUS = 290; // distance from center to satellite nodes
const SPRING       = 0.06; // spring strength back to home
const DAMPING      = 0.75;

export function stepPhysics(
  nodes: PhysNode[],
  _edges: [string, string][],
  cx: number,
  cy: number,
  frame: number,
): void {
  // Re-anchor center node to canvas center
  const center = nodes.find(n => n.id === 'center');
  if (center) { center.x = cx; center.y = cy; center.vx = 0; center.vy = 0; }

  // Satellite nodes: spring toward home + gentle breathing
  for (const n of nodes) {
    if (n.id === 'center' || n.pinned) continue;

    // Breathing offset — each node drifts on its own rhythm
    const breathX = Math.sin(frame * 0.018 + n.phase) * 8;
    const breathY = Math.cos(frame * 0.014 + n.phase * 1.3) * 6;

    const targetX = n.homeX + breathX;
    const targetY = n.homeY + breathY;

    n.vx += (targetX - n.x) * SPRING;
    n.vy += (targetY - n.y) * SPRING;
    n.vx *= DAMPING;
    n.vy *= DAMPING;
    n.x  += n.vx;
    n.y  += n.vy;
  }
}

export function initNodes(
  defs: { id: string; r: number }[],
  cx: number,
  cy: number,
): PhysNode[] {
  const satellites = defs.filter(d => d.id !== 'center');
  const count = satellites.length;

  return defs.map(d => {
    if (d.id === 'center') {
      return { id: d.id, x: cx, y: cy, vx: 0, vy: 0, r: d.r, pinned: false, homeX: cx, homeY: cy, phase: 0 };
    }
    const idx = satellites.findIndex(s => s.id === d.id);
    // Start from the top (-90°) and spread evenly clockwise
    const angle = -Math.PI / 2 + (idx / count) * Math.PI * 2;
    const hx = cx + Math.cos(angle) * ORBIT_RADIUS;
    const hy = cy + Math.sin(angle) * ORBIT_RADIUS;
    return {
      id: d.id,
      x: cx, y: cy, // start at center for boot scatter
      vx: Math.cos(angle) * 4,
      vy: Math.sin(angle) * 4,
      r: d.r,
      pinned: false,
      homeX: hx,
      homeY: hy,
      phase: idx * 0.9, // unique breathing phase
    };
  });
}

export function updateHomePositions(
  nodes: PhysNode[],
  cx: number,
  cy: number,
): void {
  const satellites = nodes.filter(n => n.id !== 'center');
  const count = satellites.length;
  satellites.forEach((n, idx) => {
    const angle = -Math.PI / 2 + (idx / count) * Math.PI * 2;
    n.homeX = cx + Math.cos(angle) * ORBIT_RADIUS;
    n.homeY = cy + Math.sin(angle) * ORBIT_RADIUS;
  });
  const center = nodes.find(n => n.id === 'center');
  if (center) { center.homeX = cx; center.homeY = cy; }
}
