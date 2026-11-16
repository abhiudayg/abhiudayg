#!/usr/bin/env bash
set -euo pipefail

# Project verification entrypoint executed by `tekmor verify -- .verify/run.sh`
echo "==> Running verification suite..."

if [ -f bun.lock ] || [ -f bun.lockb ]; then
  bun test
elif [ -f Cargo.toml ]; then
  cargo test
elif [ -f package.json ]; then
  npm test
elif [ -f pyproject.toml ] || [ -f requirements.txt ]; then
  pytest
elif [ -f Makefile ]; then
  make test
else
  echo "No default test runner detected. Please edit .verify/run.sh."
fi

echo "==> Verification completed successfully."
