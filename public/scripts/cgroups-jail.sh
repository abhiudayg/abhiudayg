#!/usr/bin/env bash
# ==============================================================================
# Bare-Metal Logs #03: Linux cgroups v2 Memory Jail (cgroups-jail.sh)
# https://abhiudayg.dev/scripts/bare-metal-stack
#
# Runs one command inside its own cgroups v2 slice with a hard memory cap
# (MemoryMax) and a CPU quota. No Docker, containerd or Kubernetes.
#
# Usage:
#   sudo bash cgroups-jail.sh -- ./app [args...]           # 256M RAM, 20% CPU
#   sudo bash cgroups-jail.sh --mem 128M --cpu 10% -- ./app
#   sudo bash cgroups-jail.sh --verify                      # prove the cap is applied
#
# Requires: Linux with systemd on cgroups v2, run as root.
# ==============================================================================
set -euo pipefail

MEM="256M"
CPU="20%"
VERIFY=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --mem) MEM="$2"; shift 2 ;;
    --cpu) CPU="$2"; shift 2 ;;
    --verify) VERIFY=1; shift ;;
    --) shift; break ;;
    -h|--help) sed -n '2,15p' "$0"; exit 0 ;;
    *) break ;;
  esac
done

if [[ $VERIFY -eq 0 && $# -eq 0 ]]; then
  echo "usage: sudo bash cgroups-jail.sh [--mem 256M] [--cpu 20%] -- ./app [args...] | --verify" >&2
  exit 2
fi
[[ "$(uname -s)" == "Linux" ]] || { echo "cgroups-jail.sh needs Linux with systemd" >&2; exit 1; }
[[ "$(id -u)" -eq 0 ]] || { echo "run with sudo" >&2; exit 1; }
[[ -f /sys/fs/cgroup/cgroup.controllers ]] || { echo "cgroups v2 is not mounted at /sys/fs/cgroup" >&2; exit 1; }
command -v systemd-run >/dev/null || { echo "systemd-run not found" >&2; exit 1; }

if [[ $VERIFY -eq 1 ]]; then
  # Run a real process in the same slice and read the limits the kernel applied to it.
  case "$MEM" in
    *M) EXPECT_MEM=$(( ${MEM%M} * 1024 * 1024 )) ;;
    *G) EXPECT_MEM=$(( ${MEM%G} * 1024 * 1024 * 1024 )) ;;
    *) echo "verify: use --mem in M or G units" >&2; exit 2 ;;
  esac
  OUT=$(systemd-run --scope --slice=jail.slice -p MemoryMax="$MEM" -p CPUQuota="$CPU" -- \
    sh -c 'd=/sys/fs/cgroup$(sed -n "s/^0:://p" /proc/self/cgroup); echo "memory.max=$(cat "$d/memory.max")"; echo "cpu.max=$(cat "$d/cpu.max")"' 2>/dev/null)
  GOT_MEM=$(printf '%s\n' "$OUT" | sed -n 's/^memory.max=//p')
  GOT_CPU=$(printf '%s\n' "$OUT" | sed -n 's/^cpu.max=//p')
  echo "memory.max: ${GOT_MEM:-missing} (expected $EXPECT_MEM)"
  echo "cpu.max:    ${GOT_CPU:-missing} (quota for $CPU)"
  if [[ "$GOT_MEM" == "$EXPECT_MEM" ]]; then
    echo "PASS: the memory cap is enforced"
    exit 0
  fi
  echo "FAIL: memory.max does not match --mem $MEM" >&2
  exit 1
fi

exec systemd-run --scope --slice=jail.slice -p MemoryMax="$MEM" -p CPUQuota="$CPU" -- "$@"
