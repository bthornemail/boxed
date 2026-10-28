// find-anchors.mjs — Locate non-colliding seeds for the local kernel
// Run on your Toshiba: tsx find-anchors.mjs

const hx = (v, n = 4) => "0x" + v.toString(16).toUpperCase().padStart(n, "0");
const bin = (v, n = 16) => "0b" + v.toString(2).padStart(n, "0");

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

const omi_oscillate = (x) => {
  return (omi_r1(x) ^ omi_r2(x) ^ omi_r3(x) ^ 0x1D1D) & 0xFFFF;
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

const omi_classify = (x) => {
  let width = 0, tmp = x;
  while (tmp !== 0) { width++; tmp >>= 1; }
  return { width, density: popcount16(x), texture: texture16(x) };
};

console.log("=== SCANNING 16-BIT ARCHITECTURE FOR NON-COLLIDING SEEDS ===");
let found = 0;

for (let seed = 0; seed <= 0xFFFF; seed++) {
  const initial = omi_classify(seed);
  
  // Rule 1: Enforce the balanced half-density structural baseline
  if (initial.density !== 8) continue;
  
  // Rule 2: Require initial state to sit inside Day 3 Space (Even Texture)
  if (initial.texture % 2 !== 0) continue;
  
  const next_state = omi_oscillate(seed);
  const rotated = omi_classify(next_state);
  
  // Rule 3: Require the oscillated state to step cleanly into Day 5 Space (Odd Texture)
  if (rotated.texture % 2 !== 0 && initial.width > 1 && rotated.width > 1) {
    found++;
    console.log(`[SEED ${found}] Found Invariant Anchor: ${hx(seed)}`);
    console.log(`  Initial   -> Bits: ${bin(seed)} | Width: ${initial.width} | Density: ${initial.density} | Texture: ${initial.texture} (EVEN)`);
    console.log(`  Oscillated -> Bits: ${bin(next_state)} | Width: ${rotated.width} | Density: ${rotated.density} | Texture: ${rotated.texture} (ODD)`);
    console.log(`  XNOR Mirror Component: ${hx((seed ^ next_state) ^ 0xFFFF)}\n`);
    
    if (found >= 3) break; // Isolate the first three valid vectors
  }
}

if (found === 0) {
  console.log("No non-colliding seeds found under current pure bitwise parameters.");
  console.log("Reason: Rule 3 asks for an odd texture, but texture counts bit flips around a closed");
  console.log("loop, and a loop always flips back as often as it flips over: texture is always even.");
  console.log("No byte swap, permutation or wider word can change that parity; Rule 3 can never pass.");
}
