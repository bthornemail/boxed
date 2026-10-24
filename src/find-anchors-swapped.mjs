// find-anchors-swapped.mjs — Swaps bytes to nullify hardware endianness
// Run on your Toshiba: tsx find-anchors-swapped.mjs

const hx = (v, n = 4) => "0x" + v.toString(16).toUpperCase().padStart(n, "0");
const bin = (v, n = 16) => "0b" + v.toString(2).padStart(n, "0");

// Your exact C-layer 16-bit byte-swapper primitive
const swap16 = (x) => ((x & 0xFF) << 8) | ((x >> 8) & 0xFF);

const omi_rotl16 = (x, k) => {
  k &= 15;
  return ((x << k) | (x >> (16 - k))) & 0xFFFF;
};

const omi_rotr16 = (x, k) => {
  k &= 15;
  return ((x >> k) | (x << (16 - k))) & 0xFFFF;
};

const omi_r0 = (x) => x ^ 0xAAAA;
const omi_r1 = (x) => omi_rotl16(x, 1);
const omi_r2 = (x) => omi_rotl16(x, 3);
const omi_r3 = (x) => omi_rotr16(x, 2);

// Enforce endianness correction inside the oscillation feedback loop
const omi_oscillate = (x) => {
  const swapped = swap16(x);
  const core = (omi_r1(swapped) ^ omi_r2(swapped) ^ omi_r3(swapped) ^ 0x1D1D) & 0xFFFF;
  return swap16(core); // Return aligned back to raw memory block
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

// Endianness-corrected classifier
const omi_classify = (x) => {
  const target = swap16(x); // Classify the true raw buffer sequence, not the host orientation
  let width = 0, tmp = target;
  while (tmp !== 0) { width++; tmp >>= 1; }
  return { width, density: popcount16(target), texture: texture16(target) };
};

console.log("=== SCANNING VIA HOST BYTE-SWAP FILTER ===");
let found = 0;

for (let seed = 0; seed <= 0xFFFF; seed++) {
  const initial = omi_classify(seed);
  if (initial.density !== 8) continue;
  if (initial.texture % 2 !== 0) continue;
  
  const next_state = omi_oscillate(seed);
  const rotated = omi_classify(next_state);
  
  if (rotated.texture % 2 !== 0 && initial.width > 1 && rotated.width > 1) {
    found++;
    console.log(`[SWAPPED SEED ${found}] Invariant Anchor: ${hx(seed)}`);
    console.log(`  Host Memory View   : ${bin(seed)}`);
    console.log(`  True Buffer View   : ${bin(swap16(seed))} | Width: ${initial.width} | Density: ${initial.density} | Texture: ${initial.texture} (EVEN)`);
    console.log(`  Oscillated Buffer  : ${bin(swap16(next_state))} | Texture: ${rotated.texture} (ODD)`);
    console.log(`  XNOR Mirror Component: ${hx((seed ^ next_state) ^ 0xFFFF)}\n`);
    
    if (found >= 3) break;
  }
}

if (found === 0) {
  console.log("State space still locked. Deep matrix realignment required.");
}
