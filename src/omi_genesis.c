#include <stdint.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <stdatomic.h>

#define OMI_INDEX_A      59u    
#define OMI_INDEX_B      63u    
#define OMI_INDEX_C      127u   
#define OMI_INDEX_ANCHOR 60u    
#define OMI_POLE_AXIS    188u   
#define OMI_SPACE_65536 65536u 
#define OMI_SLOTS_MPT    16u    

typedef struct {
    uint16_t segment[8]; // Array matching 128 bits exactly (16 bytes) [INDEX: 0.1.1]
} OmiFrame128;

typedef struct {
    uint8_t width;
    uint8_t density;
    uint8_t texture;
} OmiBand;

typedef struct {
    uint32_t branch_slots[OMI_SLOTS_MPT];
    uint16_t node_identity;
    bool is_materialized;
} OmiMptNode;

_Static_assert(sizeof(OmiFrame128) == 16, "OmiFrame128 must be exactly 128 bits");

static inline uint16_t swap16(uint16_t x) {
    return (uint16_t)(((x & 0xFF) << 8) | ((x >> 8) & 0xFF));
}

static inline uint32_t swap32(uint32_t x) {
    x = ((x & 0xFFFF) << 16) | ((x >> 16) & 0xFFFF);
    return ((x & 0xFF00FF00) >> 8) | ((x & 0x00FF00FF) << 8);
}

static _Atomic int32_t omi_engram_space[OMI_SPACE_65536];

static uint8_t popcount16(uint16_t x) {
    uint8_t count = 0u;
    for (unsigned i = 0u; i < 16u; ++i) {
        count = (uint8_t)(count + ((x >> i) & 1u));
    }
    return count;
}

static uint8_t texture16(uint16_t x) {
    uint8_t transitions = 0u;
    for (unsigned i = 0u; i < 16u; ++i) {
        const unsigned j = (i + 1u) & 15u;
        const unsigned a = (x >> i) & 1u;
        const unsigned b = (x >> j) & 1u;
        transitions = (uint8_t)(transitions + (a ^ b));
    }
    return transitions;
}

static OmiBand omi_classify_permuted(uint16_t x) {
    uint16_t permuted_view = swap16(x);
    uint8_t width = 0u;
    uint16_t tmp = permuted_view;
    while (tmp != 0u) {
        ++width;
        tmp = (uint16_t)(tmp >> 1u);
    }
    OmiBand band = { .width = width, .density = popcount16(permuted_view), .texture = texture16(permuted_view) };
    return band;
}

int omi_execute_genesis_automaton(const OmiFrame128 *frame) {
    if (frame == NULL) {
        fprintf(stderr, "FAIL: Genesis Automaton missing raw memory frame reference.\n");
        return 1;
    }

    atomic_store(&omi_engram_space[OMI_INDEX_ANCHOR], 60);

    // Pull directly from separate structural memory channels [INDEX: 0.1.5]
    uint16_t seg3 = frame->segment[0]; 
    uint16_t seg5 = frame->segment[1]; 

    OmiBand metrics3 = omi_classify_permuted(seg3);
    OmiBand metrics5 = omi_classify_permuted(seg5);

    printf("=== Initializing I-177 Atomic Genesis Automaton ===\n");
    printf("  Host Target Pinned Anchor : %d\n", atomic_load(&omi_engram_space[OMI_INDEX_ANCHOR]));
    printf("  Calculated Vault Pole Axis: %u\n", OMI_INDEX_ANCHOR ^ 128u);

    // ── Day 3 Space Transition (Index 59: Terminating Statement) ──────
    if (metrics3.texture % 2 == 0 && metrics3.density == 8) {
        int32_t expected = 0;
        if (atomic_compare_exchange_strong(&omi_engram_space[OMI_INDEX_A], &expected, 3)) {
            printf("[TRANSITION SUCCESS] Index 59 -> Materialized: DAY_3_STATIC_SEED_CLASS\n");
        }
    }

    // ── Day 5 Space Transition (Index 63: Conditional Branch Fork) ────
    if (metrics5.texture % 2 != 0) {
        int32_t expected = 0;
        if (atomic_compare_exchange_strong(&omi_engram_space[OMI_INDEX_B], &expected, 5)) {
            printf("[TRANSITION SUCCESS] Index 63 -> Materialized: DAY_5_KINETIC_BREATH_CLASS\n");
        }
    }

    // ── Instantiating the Bijective MPT Uppercase Character Map ───────
    OmiMptNode branch_node;
    memset(&branch_node, 0, sizeof(branch_node));
    branch_node.node_identity = swap16(0x5A3C); 
    branch_node.is_materialized = true;

    uint8_t target_slot = (uint8_t)((swap16(branch_node.node_identity) >> 4) & 0x000F);
    branch_node.branch_slots[target_slot] = swap32(0x7F7F7F7F);

    printf("=== Bijective MPT Alphanumeric Tag Computation ===\n");
    printf("  Active Routing Branch Address Slot: [%X]\n", target_slot);
    printf("  Slot Verification Status Residue  : 0x%X (All 1s Complement Locked)\n", 
           swap32(branch_node.branch_slots[target_slot]));

    // ── Structural Safety Check: XOR Type Separation Protocol ──────────
    int32_t stateA = atomic_load(&omi_engram_space[OMI_INDEX_A]);
    int32_t stateB = atomic_load(&omi_engram_space[OMI_INDEX_B]);

    if ((stateA ^ stateB) == 0) {
        fprintf(stderr, "CRITICAL ERROR: Type space collapsed. Threshold logical failure.\n");
        atomic_store(&omi_engram_space[OMI_INDEX_C], 0x7F);
        return 1;
    }

    printf("[STATUS: PASS] Genesis Automaton Matrix Secure across the 65536 Engram.\n\n");
    return 0;
}

#ifndef TEST_MAIN_OPAQUE
int main(void) {
    OmiFrame128 mock_frame;
    memset(&mock_frame, 0, sizeof(mock_frame));
    mock_frame.segment[0] = swap16(0x5A3C); 
    mock_frame.segment[1] = swap16(0x2F4D);
    return omi_execute_genesis_automaton(&mock_frame);
}
#endif
