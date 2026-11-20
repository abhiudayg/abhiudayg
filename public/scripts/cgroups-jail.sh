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
#
# Requires: Linux with systemd on cgroups v2, run as root.
# ==============================================================================
set -euo pipefail

MEM="256M"
CPU="20%"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --mem) MEM="$2"; shift 2 ;;
    --cpu) CPU="$2"; shift 2 ;;
    --) shift; break ;;
    -h|--help) sed -n '2,15p' "$0"; exit 0 ;;
    *) break ;;
  esac
done

if [[ $# -eq 0 ]]; then
  echo "usage: sudo bash cgroups-jail.sh [--mem 256M] [--cpu 20%] -- ./app [args...]" >&2
  exit 2
fi
[[ "$(uname -s)" == "Linux" ]] || { echo "cgroups-jail.sh needs Linux with systemd" >&2; exit 1; }
[[ "$(id -u)" -eq 0 ]] || { echo "run with sudo" >&2; exit 1; }
[[ -f /sys/fs/cgroup/cgroup.controllers ]] || { echo "cgroups v2 is not mounted at /sys/fs/cgroup" >&2; exit 1; }
command -v systemd-run >/dev/null || { echo "systemd-run not found" >&2; exit 1; }

exec systemd-run --scope --slice=jail.slice -p MemoryMax="$MEM" -p CPUQuota="$CPU" -- "$@"
