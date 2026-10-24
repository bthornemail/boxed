#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <stdint.h>
#include <sys/reboot.h>

typedef struct {
    uint16_t segment[8]; // Array matching 128 bits exactly (16 bytes) [INDEX: 0.1.1]
} OmiFrame128;

static inline uint16_t swap16(uint16_t x) {
    return (uint16_t)(((x & 0xFF) << 8) | ((x >> 8) & 0xFF));
}

static inline uint16_t omi_rotl16(uint16_t x, unsigned k) {
    k &= 15u;
    return (uint16_t)((x << k) | (x >> (16u - k)));
}
static inline uint16_t omi_rotr16(uint16_t x, unsigned k) {
    k &= 15u;
    return (uint16_t)((x >> k) | (x << (16u - k)));
}

uint16_t omi_oscillate(uint16_t x) {
    uint16_t r1 = omi_rotl16(x, 1u);
    uint16_t r2 = omi_rotl16(x, 3u);
    uint16_t r3 = omi_rotr16(x, 2u);
    return (uint16_t)(r1 ^ r2 ^ r3 ^ 0x1D1D);
}

extern int omi_execute_genesis_automaton(const OmiFrame128 *frame);

int main(void) {
    printf("\n=======================================================\n");
    printf("  INIT: BOOTING OMI MICRO-KERNEL AUTOMATON CONTAINER   \n");
    printf("  HARDWARE INSTANCE: TOSHIBA PORTEGE Z30t-C ENVIRONMENT \n");
    printf("=======================================================\n\n");

    OmiFrame128 boot_frame;
    memset(&boot_frame, 0, sizeof(boot_frame));

    uint16_t root_seed = 0x5A3C; 

    // Explicit indexing across the 128-bit boundary channels [INDEX: 0.1.5]
    boot_frame.segment[0] = swap16(root_seed);                  // Slot 0: Static Day 3 Ground
    boot_frame.segment[1] = swap16(omi_oscillate(root_seed));   // Slot 1: Kinetic Day 5 Vector

    int status = omi_execute_genesis_automaton(&boot_frame);
    
    if (status == 0) {
        printf("[BOOT SECURE] Invariant matrix validated inside the 65536 Engram.\n");
    } else {
        printf("[BOOT FAULT] System architecture integrity breach detected.\n");
    }

    printf("Halting virtual processing machine core...\n");
    reboot(RB_HALT_SYSTEM);
    return 0;
}
