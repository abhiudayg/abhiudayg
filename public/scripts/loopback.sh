#!/usr/bin/env bash
# ==============================================================================
# Bare-Metal Logs #02: Loopback Sharding (loopback.sh)
# https://abhiudayg.dev/scripts/loopback
#
# Binds two shard IPs (127.0.0.2 and 127.0.0.3) on the loopback interface,
# maps auth.test and api.test to 127.0.0.1, and writes a Caddyfile that routes
# http://auth.test and http://api.test on 127.0.0.1:80.
#
# Usage:
#   sudo bash loopback.sh             # set up aliases, hosts, and Caddyfile
#   sudo bash loopback.sh --status    # show alias and hosts state
#   sudo bash loopback.sh --uninstall # remove aliases and the hosts block
# ==============================================================================
set -euo pipefail

HOSTS_START="# BEGIN BARE_METAL_LOOPBACKS"
HOSTS_END="# END BARE_METAL_LOOPBACKS"
SHARD_PORT=8080

# "ip hostname" pairs. Each shard listens on SHARD_PORT at its own IP.
SHARDS=(
  "127.0.0.2 auth.test"
  "127.0.0.3 api.test"
)

usage() {
  echo "Usage: sudo bash $0 [--status | --uninstall]"
}

os_type() {
  case "$OSTYPE" in
    darwin*) echo "macos" ;;
    linux*)  echo "linux" ;;
    *)       echo "unsupported" ;;
  esac
}

require_root() {
  if [[ $EUID -ne 0 ]]; then
    echo "[error] Run with sudo: sudo bash $0" >&2
    exit 1
  fi
}

alias_active() {
  local ip="$1" os="$2" out
  if [[ "$os" == "macos" ]]; then
    out=$(ifconfig lo0)
    grep -qF "inet $ip " <<< "$out"
  else
    out=$(ip -4 addr show dev lo)
    grep -qF "inet ${ip}/8" <<< "$out"
  fi
}

bind_alias() {
  local ip="$1" os="$2"
  if alias_active "$ip" "$os"; then
    echo "  [-] $ip already bound"
    return
  fi
  if [[ "$os" == "macos" ]]; then
    ifconfig lo0 alias "$ip" 255.0.0.0
  else
    ip addr add "${ip}/8" dev lo
  fi
  echo "  [ok] bound $ip"
}

unbind_alias() {
  local ip="$1" os="$2"
  if ! alias_active "$ip" "$os"; then
    echo "  [-] $ip not bound"
    return
  fi
  if [[ "$os" == "macos" ]]; then
    ifconfig lo0 -alias "$ip" || true
  else
    ip addr del "${ip}/8" dev lo || true
  fi
  echo "  [ok] removed $ip"
}

backup_hosts() {
  # One-time backup, so --uninstall can be checked against the original file.
  [[ -f /etc/hosts.bare-metal-backup ]] || cp /etc/hosts /etc/hosts.bare-metal-backup
}

remove_hosts_block() {
  if grep -qF "$HOSTS_START" /etc/hosts; then
    sed -i.tmp "/$HOSTS_START/,/$HOSTS_END/d" /etc/hosts
    rm -f /etc/hosts.tmp
  fi
}

write_hosts() {
  remove_hosts_block
  # Make sure the last line of /etc/hosts ends with a newline before appending.
  if [[ -n "$(tail -c1 /etc/hosts)" ]]; then
    echo >> /etc/hosts
  fi
  {
    echo "$HOSTS_START"
    echo "127.0.0.1 auth.test api.test"
    echo "$HOSTS_END"
  } >> /etc/hosts
  echo "  [ok] auth.test and api.test point to 127.0.0.1"
}

write_caddyfile() {
  if [[ -f Caddyfile ]]; then
    cp Caddyfile Caddyfile.bak
    echo "  [!] existing Caddyfile saved as Caddyfile.bak"
  fi
  cat > Caddyfile << 'EOF'
http://auth.test {
    bind 127.0.0.1
    reverse_proxy 127.0.0.2:8080
}

http://api.test {
    bind 127.0.0.1
    reverse_proxy 127.0.0.3:8080
}
EOF
  echo "  [ok] Caddyfile written"
}

show_status() {
  local os ip name
  os=$(os_type)
  echo "Loopback aliases ($os):"
  for item in "${SHARDS[@]}"; do
    read -r ip name <<< "$item"
    if alias_active "$ip" "$os"; then
      echo "  [ACTIVE]   $ip -> $name:$SHARD_PORT"
    else
      echo "  [INACTIVE] $ip -> $name:$SHARD_PORT"
    fi
  done
  if grep -qF "$HOSTS_START" /etc/hosts; then
    echo "Hosts block: present"
  else
    echo "Hosts block: not present"
  fi
}

setup() {
  require_root
  local os ip name
  os=$(os_type)
  if [[ "$os" == "unsupported" ]]; then
    echo "[error] Unsupported OS: $OSTYPE" >&2
    exit 1
  fi

  echo "Bare-Metal Logs #02: Loopback Sharding"
  echo
  echo "1. Binding shard IPs on the loopback interface ($os)"
  for item in "${SHARDS[@]}"; do
    read -r ip name <<< "$item"
    bind_alias "$ip" "$os"
  done

  echo
  echo "2. Updating /etc/hosts"
  backup_hosts
  write_hosts

  echo
  echo "3. Writing Caddyfile"
  write_caddyfile

  echo
  echo "Setup done. Aliases do not survive a reboot, so re-run this script after restarting."
  echo
  echo "Next steps:"
  echo "  1. Start each service on its shard IP and port:"
  echo "       ./auth --listen 127.0.0.2:$SHARD_PORT"
  echo "       ./api  --listen 127.0.0.3:$SHARD_PORT"
  echo "  2. Start Caddy on 127.0.0.1:80 (needs root for port 80):"
  echo "       sudo caddy run --config Caddyfile"
  echo "  3. Test:"
  echo "       curl -i http://auth.test"
  echo "       curl -i http://api.test"
  echo
  echo "Check state anytime: sudo bash $0 --status"
  echo "Revert anytime:      sudo bash $0 --uninstall"
}

uninstall() {
  require_root
  local os ip name
  os=$(os_type)
  if [[ "$os" == "unsupported" ]]; then
    echo "[error] Unsupported OS: $OSTYPE" >&2
    exit 1
  fi

  echo "Reverting loopback setup"
  for item in "${SHARDS[@]}"; do
    read -r ip name <<< "$item"
    unbind_alias "$ip" "$os"
  done
  remove_hosts_block
  echo "  [ok] removed the hosts block"
  echo
  echo "Done. The Caddyfile was left in place. Delete it yourself if you no longer need it."
}

main() {
  case "${1:-}" in
    "")                  setup ;;
    --status)            show_status ;;
    --uninstall|--undo)  uninstall ;;
    -h|--help)           usage ;;
    *)                   usage; exit 1 ;;
  esac
}

main "$@"
