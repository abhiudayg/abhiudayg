# Project Verification (`.verify/`)

Discovered by `tekmor verify` and `tekmor report`.

## Usage
- Run verify: `tekmor verify -- .verify/run.sh`
- Allowlisted test commands are recorded into `~/.autonomic/memory/tekmor.db` with tamper-evident cryptographic hashes.
- Edit `verify.toml` to customize allowlisted commands for your project.
