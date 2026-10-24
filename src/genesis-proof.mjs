// genesis-proof.mjs — JS Proof Set for the MODAL seed (0x35A7)
// To run on your Toshiba Portege: tsx genesis-proof.mjs

import assert from "node:assert";

// ─── Core Tools & Bitwise Operations ──────────────────────────────
const MODAL_SEED = 0x5A3C; // 0b0101 1010 0011 1100
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

// Primitives matching your C engine
const omi_r0 = (x) => x ^ 0xAAAA; // Day 1 Binary State Inversion
const omi_r1 = (x) => omi_rotl16(x, 1);
const omi_r2 = (x) => omi_rotl16(x, 3);
const omi_r3 = (x) => omi_rotr16(x, 2);

const omi_oscillate = (x) => {
  return (omi_r1(x) ^ omi_r2(x) ^ omi_r3(x) ^ 0x1D1D) & 0xFFFF;
};

// ─── Classification Engines ──────────────────────────────────────
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

// ─── Execution & Proof Verification ──────────────────────────────
console.log("=== MODAL SEED PROOF SET FOR TOSHIBA-PORTEGE-Z30t-C ===");
console.log("Input Target SEED :", hx(MODAL_SEED), "| Bits:", bin(MODAL_SEED));
console.log();

// Proof Step 1: Invariant Generation Profile
const next_state = omi_oscillate(MODAL_SEED);
const initial_metrics = omi_classify(MODAL_SEED);
const rotated_metrics = omi_classify(next_state);

console.log("=== Step 1: System Oscillation Properties ===");
console.log("Current State     :", hx(MODAL_SEED), "-> Metrics: Width:", initial_metrics.width, "Density:", initial_metrics.density, "Texture:", initial_metrics.texture);
console.log("Oscillated State  :", hx(next_state), "-> Metrics: Width:", rotated_metrics.width, "Density:", rotated_metrics.density, "Texture:", rotated_metrics.texture);
console.log();

// Proof Step 2: Generation Parity Routing Verification
console.log("=== Step 2: Generation Lifecycle Validation ===");
const validate_generation = (state) => {
  const m = omi_classify(state);
  if (m.width <= 1 || m.width > 16) return "INVALID";
  
  // Parity condition matching your C state machine layout
  // Even texture transitions route to Day 3 Space; Odd texture transitions route to Day 5 Space
  return (m.texture % 2 === 0) ? "DAY_3_STATIC_SEED" : "DAY_5_KINETIC_BREATH";
};

const seed_routing = validate_generation(MODAL_SEED);
const next_routing = validate_generation(next_state);

console.log("MODAL_SEED Target Routing   :", seed_routing);
console.log("Oscillated State Target Routing:", next_routing);

// Execution of strict XOR Verification
// A valid structural progression requires a clean shift between Type 1 and Type 2 spaces.
const isXorSecure = (seed_routing !== next_routing) && (seed_routing !== "INVALID") && (next_routing !== "INVALID");
console.log("XOR Type Class Matrix Secure?", isXorSecure ? "✔ TRUE (Clean Partition)" : "✗ FAIL (Type Collision)");
console.log();

// Proof Step 3: 0-Sphere Boundary Equivalence (XNOR Mirror Check)
console.log("=== Step 3: XNOR Symmetric Closure ===");
const xnor_complement = (MODAL_SEED ^ next_state) ^ 0xFFFF;
console.log("SEED ⊙ Next State (16-bit Complement) =", hx(xnor_complement), "| Bits:", bin(xnor_complement));

// Asserting the structural integrity of the seed before compilation to the C layer
try {
  assert.ok(isXorSecure, "XOR lifecycle boundary must not collapse");
  assert.strictEqual(initial_metrics.density, 8, "Modal Seed must maintain a balanced half-density state");
  console.log("\n[STATUS: PASS] Strict Logic Proof Set compiles cleanly on local node hardware.");
} catch (e) {
  console.error("\n[STATUS: FAIL] Logic breach inside the validation parameters:", e.message);
  process.exit(1);
}
