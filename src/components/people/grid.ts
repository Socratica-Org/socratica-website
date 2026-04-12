export interface Person {
  id: number;
  name: string;
  role: string;
  photo: string;
  location: string;
  facts: string[];
}

export interface GridNode {
  id: string;
  q: number;
  r: number;
  x: number;
  y: number;
  person: Person | null;
  isPlaceholder: boolean;
  placeholderIndex: number;
}

const NODE_SIZE = 32;
const NODE_SPACING = NODE_SIZE - 12;
const GRID_RADIUS = 5;

function isPartOfAsterisk(q: number, r: number): boolean {
  const s = -q - r;
  return (
    (q === 0 && r === 0) ||
    (Math.abs(q) <= 1 && Math.abs(r) <= GRID_RADIUS) ||
    (Math.abs(s + r) <= 1 && Math.abs(s) <= GRID_RADIUS) ||
    (Math.abs(q + s) <= 1 && Math.abs(s) <= GRID_RADIUS) ||
    (Math.abs(r) <= 1 && Math.abs(q) <= GRID_RADIUS) ||
    (Math.abs(q + r) <= 1 && Math.abs(q) <= GRID_RADIUS) ||
    (Math.abs(s) <= 1 && Math.abs(r) <= GRID_RADIUS)
  );
}

function getNodeCoordinates(q: number, r: number) {
  const angle = Math.PI / 6;
  const xBase = NODE_SPACING * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r);
  const yBase = NODE_SPACING * ((3 / 2) * r);
  return {
    x: xBase * Math.cos(angle) - yBase * Math.sin(angle),
    y: xBase * Math.sin(angle) + yBase * Math.cos(angle),
  };
}

function generateEmptyNodes(prefix: string): GridNode[] {
  const positions: [number, number][] = [];
  for (let q = -GRID_RADIUS; q <= GRID_RADIUS; q++) {
    for (let r = -GRID_RADIUS; r <= GRID_RADIUS; r++) {
      const s = -q - r;
      if (Math.abs(s) <= GRID_RADIUS && isPartOfAsterisk(q, r)) {
        positions.push([q, r]);
      }
    }
  }

  // Sort by distance from center
  positions.sort(
    ([q1, r1], [q2, r2]) =>
      Math.abs(q1) + Math.abs(r1) - (Math.abs(q2) + Math.abs(r2)),
  );

  return positions.map(([q, r], i) => {
    const coords = getNodeCoordinates(q, r);
    return {
      id: `${prefix}-${q},${r}`,
      q,
      r,
      x: coords.x,
      y: coords.y,
      person: null,
      isPlaceholder: true,
      placeholderIndex: i % 6,
    };
  });
}

export interface AsterismBounds {
  width: number;
  height: number;
}

/** Shift nodes so all coordinates are positive (origin at top-left) and return tight bounds */
function normalizeNodes(nodes: GridNode[]): AsterismBounds {
  const half = NODE_SIZE / 2;
  const minX = Math.min(...nodes.map((n) => n.x)) - half;
  const minY = Math.min(...nodes.map((n) => n.y)) - half;
  for (const node of nodes) {
    node.x -= minX;
    node.y -= minY;
  }
  const maxX = Math.max(...nodes.map((n) => n.x)) + half;
  const maxY = Math.max(...nodes.map((n) => n.y)) + half;
  return { width: Math.ceil(maxX), height: Math.ceil(maxY) };
}

export function generateAsterisms(people: Person[]): {
  top: GridNode[];
  left: GridNode[];
  right: GridNode[];
  bounds: AsterismBounds;
} {
  const filtered = people.filter(
    (p) =>
      !p.name.includes("Future") &&
      !p.name.includes("Community") &&
      !p.name.includes("Team") &&
      !p.name.includes("Collaborators"),
  );

  const top = generateEmptyNodes("top");
  const left = generateEmptyNodes("left");
  const right = generateEmptyNodes("right");

  // Distribute people round-robin across the three asterisms
  const groups = [top, left, right];
  let groupIdx = 0;
  // Track next available slot per group
  const slotIdx = [0, 0, 0];

  for (const person of filtered) {
    const group = groups[groupIdx];
    // Find next placeholder slot
    while (
      slotIdx[groupIdx] < group.length &&
      !group[slotIdx[groupIdx]].isPlaceholder
    ) {
      slotIdx[groupIdx]++;
    }
    if (slotIdx[groupIdx] < group.length) {
      const node = group[slotIdx[groupIdx]];
      node.person = person;
      node.isPlaceholder = false;
      slotIdx[groupIdx]++;
    }
    groupIdx = (groupIdx + 1) % 3;
  }

  // Normalize all three to tight bounding boxes (all have same structure, so same bounds)
  const boundsTop = normalizeNodes(top);
  normalizeNodes(left);
  normalizeNodes(right);

  return { top, left, right, bounds: boundsTop };
}

export { NODE_SIZE };
