// find-permutation-anchors.mjs — Non-destructive spatial permutations
// Run on your Toshiba: tsx find-permutation-anchors.mjs

const hx = (v, n = 4) => "0x" + v.toString(16).toUpperCase().padStart(n, "0");
const bin = (v, n = 16) => "0b" + v.toString(2).padStart(n, "0");

// Non-destructive permutation primitives matching your engine
const swap16 = (x) => ((x & 0xFF) << 8) | ((x >> 8) & 0xFF);

const swap32 = (x) => {
  x = ((x & 0xFFFF) << 16) | ((x >>> 16) & 0xFFFF);
  return ((x & 0xFF00FF00) >>> 8) | ((x & 0x00FF00FF) << 8);
};

// Shifting functions remain isolated as active mechanical clock operators
const omi_rotl16 = (x, k) => {
  k &= 15;
  return ((x << k) | (x >> (16 - k))) & 0xFFFF;
};
const omi_rotr16 = (x, k) => {
  k &= 15;
  return ((x >> k) | (x << (16 - k))) & 0xFFFF;
};

const omi_r1 = (x) => omi_rotl16(x, 1);
const omi_r2 = (x) => omi_rotl16(x, 3);
const omi_r3 = (x) => omi_rotr16(x, 2);

// System generator with non-destructive spatial orientation checks
const omi_oscillate = (x) => {
  const core = (omi_r1(x) ^ omi_r2(x) ^ omi_r3(x) ^ 0x1D1D) & 0xFFFF;
  return core;
};

const popcount16 = (x) => {
  let count = 0;
  for (let i = 0; i < 16; i++) count += (x >> i) & 1;
  return count;
};

const texture16 = (x) => {
  let transitions = 0;
  for (let i = 0; i < 16; i++) {
    const j = (i + 1) & 15;
    const a = (x >> i) & 1;
    const b = (x >> j) & 1;
    transitions += (a ^ b);
  }
  return transitions;
};

// Classification based on non-destructive space permutation (swap16 orientation)
const omi_classify_permuted = (x) => {
  const permuted_view = swap16(x); // Invert axis non-destructively
  let width = 0, tmp = permuted_view;
  while (tmp !== 0) { width++; tmp >>= 1; }
  return { width, density: popcount16(permuted_view), texture: texture16(permuted_view) };
};

console.log("=== SCANNING SPACE WITH NON-DESTRUCTIVE SWAP PERMUTATIONS ===");
let found = 0;

for (let seed = 0; seed <= 0xFFFF; seed++) {
  // Check metrics inside the permuted view layer
  const initial = omi_classify_permuted(seed);
  
  if (initial.density !== 8) continue;
  if (initial.texture % 2 !== 0) continue; // Must initialize as Day 3 Static (Even)
  
  const next_state = omi_oscillate(seed);
  const rotated = omi_classify_permuted(next_state);
  
  // Verify clean lifecycle jump into Day 5 Kinetic (Odd) via permuted metrics
  if (rotated.texture % 2 !== 0 && initial.width > 1 && rotated.width > 1) {
    found++;
    console.log(`[PERMUTATION ANCHOR ${found}] Seed: ${hx(seed)}`);
    console.log(`  Host Memory Layout   : ${bin(seed)}`);
    console.log(`  Permuted Space View  : ${bin(swap16(seed))} | Texture: ${initial.texture} (EVEN)`);
    console.log(`  Oscillated Permutation: ${bin(swap16(next_state))} | Texture: ${rotated.texture} (ODD)`);
    console.log(`  Symmetric XNOR Component: ${hx((seed ^ next_state) ^ 0xFFFF)}\n`);
    
    if (found >= 3) break;
  }
}

if (found === 0) {
  console.log("No anchors uncovered. Space configuration requires 32-bit boundary permutation mapping.");
}
