# Abhiuday

<p align="left">
  <strong>Systems &amp; AI Engineer</strong> architecting autonomous agent runtimes, deterministic DAG workflow engines, and low-latency sandboxing infrastructure.
</p>

<p align="left">
  <a href="https://abhiudayg.dev"><strong>Website &amp; Essays</strong></a> ·
  <a href="https://abhiudayg.dev/rss.xml"><strong>RSS Feed</strong></a> ·
  <a href="https://x.com/abhiudayg"><strong>X (@abhiudayg)</strong></a> ·
  <a href="https://linkedin.com/in/abhiudayg"><strong>LinkedIn</strong></a> ·
  <a href="https://dev.to/abhiudayg"><strong>Dev.to</strong></a>
</p>

---

### Featured Systems &amp; Runtimes

| System | Version | Role | Architecture &amp; Stack | Repository |
|---|---|---|---|---|
| **`agent-brain`** | `v1.0.0-rc3` | Cognitive Runtime &amp; Token Gate | Hard read gates (`read_gate=hard`), token-budgeted local MCP routing, supervised daemon (`serve.sock`), and verification contracts | [`autonomic-ai-dev/agent-brain`](https://github.com/autonomic-ai-dev/agent-brain) |
| **`agent-spine`** | `v1.0.0-rc3` | Workflow State Machine | Declarative DAG execution (`workflows/*.yaml`), Tarjan SCC cycle detection, automated verification gates, and human approval checkpoints | [`autonomic-ai-dev/agent-spine`](https://github.com/autonomic-ai-dev/agent-spine) |
| **`dustmap`** | `v1.0.1` | Native Systems Utility | High-performance macOS disk space analyzer and conservative cleaner built with Rust, Tauri, and parallel lock-free directory traversal (&lt; 12ms scans) | [`abhiudayg/dustmap`](https://github.com/abhiudayg/dustmap) |
| **`agentrun`** | `v0.4.0` | Isolated Agent Workspace | Ephemeral coding environments, copy-on-write filesystem snapshotting, eBPF network telemetry, and sub-4ms recovery boot | [`autonomic-ai-dev/agentrun`](https://github.com/autonomic-ai-dev/agentrun) |
| **`harbor`** | `v0.2.0` | Execution Sandbox | Firewalled, headless execution runtime for autonomous coding without host filesystem corruption | [`autonomic-ai-dev/harbor`](https://github.com/autonomic-ai-dev/harbor) |

---

### Selected Technical Essays &amp; Publications

* **[agent-brain: the architectural pivot — from passive retrieval to deterministic cognitive runtime](https://abhiudayg.dev/blog/agent-brain-the-architectural-pivot-and-runtime/)** (Part 3)  
  *Why passive context retrieval broke down in real-world autonomous coding, how we pivoted into a hard-gated execution runtime with token budgets, verify invariants, and upstream MCP routing.*
* **[agent-brain: memory scopes, temporal pruning, and cross-session routing](https://abhiudayg.dev/blog/agent-brain-memory-scopes-and-reinforcement/)** (Part 2)  
  *Multi-session context persistence, temporal fact decay, and circuit-broken upstream tools.*
* **[agent-brain: local MCP routing under a token budget](https://abhiudayg.dev/blog/agent-brain-local-mcp-routing/)** (Part 1)  
  *Answering the question: what should the model see right now under a strict 700-token ceiling?*
* **[agentrun: isolated coding agent runtimes with container workspaces](https://abhiudayg.dev/blog/agentrun-isolated-coding-agent-runtimes/)**  
  *Designing hermetic, reproducible execution environments with copy-on-write workspaces.*
* **[dustmap: sub-12ms disk space visualizer in Rust and Tauri](https://abhiudayg.dev/blog/dustmap-disk-space-visualizer-rust-tauri/)**  
  *Low-latency parallel directory traversal with Rayon and native macOS disk reporting.*

---

### Engineering Philosophy

* **Verification as an Invariant**: Every test, build, and claim requires cryptographic execution evidence (`agent-brain verify`). Zero hallucinated success.
* **Token Budget Discipline**: High-signal, byte-capped context envelopes over noisy prompt dumps.
* **Zero Comment Slop**: Self-documenting code with clear boundary discipline over LLM-generated narrative noise.
* **Open Standards &amp; Web Fidelity**: Pure web standards, zero tracking pixels, zero analytics scripts, and 100% full-text RSS syndication.

---

### Tech Stack &amp; Focus

* **Languages &amp; Runtimes**: Rust, TypeScript, Node.js, Bun, POSIX Shell
* **Distributed &amp; Systems**: Tokio, Tonic (gRPC), SQLite WAL, Unix Domain Sockets, eBPF, Linux cgroups
* **AI &amp; Autonomous Agents**: Model Context Protocol (MCP), FastEmbed ONNX, Agent-Spine DAGs
* **Web Platform**: Astro, Tailwind CSS v4, Web Standards, KaTeX, Mermaid.js

---

<details>
<summary><strong>Repository Source &amp; Platform Build Details</strong></summary>

<br>

This repository (`abhiudayg/abhiudayg`) also houses the source code for the personal brand platform and engineering blog ([abhiudayg.dev](https://abhiudayg.dev)):

```bash
# Clone repository
git clone https://github.com/abhiudayg/abhiudayg.git
cd abhiudayg

# Install dependencies
bun install

# Start local development server
bun dev
```

#### Automated Verification

```bash
# Run verified unit test suite
agent-brain verify -- bun test

# Run verified production build
agent-brain verify -- bun run build
```

</details>

---

<p align="left">
  <sub>Licensed under <a href="LICENSE">MIT</a>. Written content published under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</sub>
</p>
