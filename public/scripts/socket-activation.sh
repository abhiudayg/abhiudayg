#!/usr/bin/env bash
# Socket activation demo: Linux holds the port, your program stays at 0 MB
# until the first request arrives. Two unit files, no Docker.
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
  echo "needs root — run: curl -fsSL https://abhiudayg.dev/scripts/socket-activation.sh | sudo bash" >&2
  exit 1
fi

command -v systemctl >/dev/null || { echo "needs a systemd distro" >&2; exit 1; }
command -v python3   >/dev/null || { echo "needs python3" >&2; exit 1; }

cat > /usr/local/bin/socket-demo.py <<'PY'
#!/usr/bin/env python3
import http.server, os, socket, socketserver, sys

class H(http.server.BaseHTTPRequestHandler):
    def do_GET(s):
        body = b"ok\n"
        s.send_response(200)
        s.send_header("Content-Length", str(len(body)))
        s.end_headers()
        s.wfile.write(body)
    def log_message(*a):
        pass

class S(socketserver.TCPServer):
    allow_reuse_address = True

if os.environ.get("LISTEN_FDS") == "1":
    srv = S(("", 0), H, bind_and_activate=False)
    srv.socket.close()
    srv.socket = socket.socket(fileno=3)
else:
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    srv = S(("", port), H)
srv.serve_forever()
PY
chmod 0755 /usr/local/bin/socket-demo.py

cat > /etc/systemd/system/app.socket <<'UNIT'
[Socket]
ListenStream=8080
[Install]
WantedBy=sockets.target
UNIT

cat > /etc/systemd/system/app.service <<'UNIT'
[Service]
ExecStart=/usr/bin/python3 /usr/local/bin/socket-demo.py
UNIT

systemctl daemon-reload
systemctl enable --now app.socket

echo "[ok] app.socket listening on :8080 — app.service is inactive (0 MB)"
echo "test: curl localhost:8080        # first request, ~40 ms"
echo "      curl localhost:8080        # every request after, <1 ms"
echo "      systemctl status app.service"
