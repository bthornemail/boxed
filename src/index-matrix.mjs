// index-matrix.mjs — Raw Unsafe Buffer Alignment Matrix
// Uses indices-of-indices to nullify local host architecture variance

import { Buffer } from "node:buffer";

// ─── Non-Destructive Swap Primitives (Involution Matrix) ───────────
const swap16 = (x) => ((x & 0xFF) << 8) | ((x >> 8) & 0xFF);

// Shifting functions remain isolated as active mechanical clock hands
const omi_rotl16 = (x, k) => {
  k &= 15;
  return ((x << k) | (x >> (16 - k))) & 0xFFFF;
};
const omi_rotr16 = (x, k) => {
  k &= 15;
  return ((x >> k) | (x << (16 - k))) & 0xFFFF;
};

const omi_oscillate = (x) => {
  const r1 = omi_rotl16(x, 1);
  const r2 = omi_rotl16(x, 3);
  const r3 = omi_rotr16(x, 2);
  return (r1 ^ r2 ^ r3 ^ 0x1D1D) & 0xFFFF;
};

// ─── Direct Population & Texture Evaluation via Bit Tracking ─────
const get_metrics = (val16) => {
  let density = 0;
  let transitions = 0;
  for (let i = 0; i < 16; i++) {
    const a = (val16 >> i) & 1;
    const b = (val16 >> ((i + 1) & 15)) & 1;
    density += a;
    transitions += (a ^ b);
  }
  return { density, texture: transitions };
};

// ─── Raw Unsafe Allocation Matrix Initialization ──────────────────
// Allocating 128 bytes of uninitialized raw host heap memory
const frame_buffer = Buffer.allocUnsafe(128); // [INDEX: 0.1.5]

console.log("=== SCANNING VIA DIRECT UNSAFE BUFFER INDICES ===");
let found = 0;

// Step through the entire 16-bit state space
for (let seed = 0; seed <= 0xFFFF; seed++) {
  
  // Use index 60 inside the raw block as our pinned structural anchor [INDEX: 0.1.3, 0.1.5]
  // We write the value aligned to the host, but read it as a permuted index
  frame_buffer.writeUInt16LE(seed, 60); 
  
  // Directly pull the raw, swapped byte index to enforce non-destructive space permutation
  const raw_permuted_value = swap16(frame_buffer.readUInt16LE(60));
  
  const initial = get_metrics(raw_permuted_value);
  if (initial.density !== 8) continue;
  if (initial.texture % 2 !== 0) continue; // Must initialize as Day 3 Static (Even)

  // Trigger one system tick of the active clock hand generator
  const next_state = omi_oscillate(seed);
  frame_buffer.writeUInt16LE(next_state, 62); // Write into the sequential index slot
  
  const oscillated_permuted_value = swap16(frame_buffer.readUInt16LE(62));
  const rotated = get_metrics(oscillated_permuted_value);

  // Validate the clean lifecycle transition into Day 5 Kinetic Space (Odd Texture)
  if (rotated.texture % 2 !== 0) {
    found++;
    console.log(`[INDEX ANCHOR ${found}] Target Seed: 0x${seed.toString(16).toUpperCase().padStart(4, "0")}`);
    console.log(`  Buffer Index [60] Raw Bits   : 0b${seed.toString(2).padStart(16, "0")}`);
    console.log(`  Permuted Space Index View    : 0b${raw_permuted_value.toString(2).padStart(16, "0")} | Texture: ${initial.texture} (EVEN)`);
    console.log(`  Oscillated Index [62] View   : 0b${oscillated_permuted_value.toString(2).padStart(16, "0")} | Texture: ${rotated.texture} (ODD)`);
    console.log(`  Symmetric XNOR Complement    : 0x${((seed ^ next_state) ^ 0xFFFF).toString(16).toUpperCase()}\n`);

    if (found >= 3) break;
  }
}

if (found === 0) {
  console.log("Index topology locked. Memory alignment requires an active byte-order rotation block.");
}
