#!/usr/bin/env bash
# vboot.sh — Standalone initramfs constructor and QEMU execution node
set -euo pipefail

echo "=== Step 1: Cleaning Workspace and Preparing Build Directories ==="
rm -rf staging initramfs.cpio.gz
mkdir -p staging/bin staging/dev staging/proc staging/sys

echo "=== Step 2: Compiling Invariant State Machine Core ==="
#!/usr/bin/env bash
# vboot.sh — Endian-agnostic initramfs constructor with preprocessor isolation
set -euo pipefail

echo "=== Step 1: Cleaning Workspace and Preparing Build Directories ==="
rm -rf staging initramfs.cpio.gz
mkdir -p staging/bin staging/dev staging/proc staging/sys

echo "=== Step 2: Compiling Invariant State Machine Core ==="
# -DTEST_MAIN_OPAQUE isolates the omi_genesis test entry point cleanly
gcc -static -O2 -Wall -Wextra -std=c11 -DTEST_MAIN_OPAQUE init.c omi_genesis.c -o staging/init

echo "=== Step 3: Packing Raw Byte Stream into Newc POSIX Archive ==="
(cd staging && find . -print0 | cpio --null -ov --format=newc | gzip -9 > ../initramfs.cpio.gz)

echo "=== Step 4: Initializing Headless QEMU Virtual Kernel Boot ==="
qemu-system-x86_64 \
    -kernel /boot/vmlinuz-$(uname -r) \
    -initrd initramfs.cpio.gz \
    -append "console=ttyS0 quiet panic=-1" \
    -nographic \
    -monitor none \
    -serial stdio

echo "=== QEMU Execution Cycle Completed ==="


echo "=== Step 3: Packing Raw Byte Stream into Newc POSIX Archive ==="
# find, cpio, and gzip create the bit-perfect image for the kernel load [INDEX: 0.1.10]
(cd staging && find . -print0 | cpio --null -ov --format=newc | gzip -9 > ../initramfs.cpio.gz)

echo "=== Step 4: Initializing Headless QEMU Virtual Kernel Boot ==="
# Launching your local host kernel vmlinuz image with the packed cpio engram attached [INDEX: 0.1.10]
qemu-system-x86_64 \
    -kernel /boot/vmlinuz-$(uname -r) \
    -initrd initramfs.cpio.gz \
    -append "console=ttyS0 quiet panic=-1" \
    -nographic \
    -monitor none \
    -serial stdio

echo "=== QEMU Execution Cycle Completed ==="
