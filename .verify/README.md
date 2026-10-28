# Project Verification (`.verify/`)

Discovered by `agent-brain verify` and `agent-brain report`.

## Usage
- Run verify: `agent-brain verify -- .verify/run.sh`
- Allowlisted test commands are recorded into `~/.autonomic/memory/brain.db` with tamper-evident cryptographic hashes.
- Edit `verify.toml` to customize allowlisted commands for your project.
