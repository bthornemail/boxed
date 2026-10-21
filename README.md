# boxed — the boxed-up dirty state

The data that sits **after the tree**. `boxedPINE` is the client, `PINEboxed`
the proxy — both kept clean so they build and verify on their own. Everything
that is history, exploration, record, or raw material lives here instead, so the
client and proxy trees stay self-sustaining.

This is data, not a build. Nothing here is required to reconstruct `boxedPINE` or
`PINEboxed`; it is kept because it is the journey, not because anything depends
on it. The value was never the data (assume every byte is compromised) — it is
that the client and proxy reconstruct from first principles without it.

Contents (migrated from `boxedPINE`, paths preserved):

- `_archive/` — chat histories, records, specs, images, audio, the inbox, the seam notes
- `MAP.md` — the convergence map
- `public/bindings.ndjson` — the literal S-P-O binding graph (generated data)
- `src/` — the author's loose record scripts (godword, literal-test, termstream)
- `UNKOW/` — the reverse-collation half of the A-list window
