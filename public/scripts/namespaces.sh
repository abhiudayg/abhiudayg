#!/usr/bin/env bash
# A "container" is three kernel switches, not a thing. This builds one static
# binary, leaves it alone in /tmp/bare, and starts it at PID 1 inside fresh
# mount + pid namespaces — its entire filesystem is itself. No Docker.
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
  echo "needs root — run: curl -fsSL https://abhiudayg.dev/scripts/namespaces.sh | sudo bash" >&2
  exit 1
fi

command -v unshare >/dev/null || { echo "needs unshare (util-linux)" >&2; exit 1; }
command -v go       >/dev/null || { echo "needs Go — or drop any static binary at /tmp/bare/server and run the unshare line yourself" >&2; exit 1; }

mkdir -p /tmp/bare
BUILD=$(mktemp -d)
cat > "$BUILD/server.go" <<'GO'
package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "bare-metal logs #06 — served from a one-file 'container'")
	})
	_ = http.ListenAndServe(":8090", nil)
}
GO

(cd "$BUILD" && CGO_ENABLED=0 go build -ldflags="-s -w" -o /tmp/bare/server server.go)
rm -rf "$BUILD"
chmod 0755 /tmp/bare/server

echo "[ok] /tmp/bare holds exactly one file:"
ls -la /tmp/bare

# the kernel switches: CLONE_NEWNS (-m), CLONE_NEWPID (-p), fork (-f).
# --mount-proc gives the jail a fresh /proc so `ps` inside sees only itself.
# --kill-child stops the jail when the unshare parent exits.
pkill -x server 2>/dev/null || true
unshare --mount --pid --fork --kill-child --mount-proc chroot /tmp/bare /server &
sleep 1

echo
echo "[ok] 'container' is up — PID 1 in a world with one file:"
echo "      curl localhost:8090                             # it answers"
echo "      ls /proc/\$(pgrep -x server)/root               # its whole fs: 'server'"
echo "      nsenter -t \$(pgrep -x server) -m -p ps -e      # PID 1, ~2 processes"
echo "      pkill -x server                                 # stop it"
