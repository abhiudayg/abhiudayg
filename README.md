# Abhiuday

<p align="left">
  <strong>Systems &amp; AI Engineer</strong> architecting autonomous agent runtimes, deterministic DAG workflow engines, and low-latency sandboxing infrastructure.
</p>

<p align="left">
  <a href="https://www.abhiudayg.dev"><strong>Website &amp; Essays</strong></a> ·
  <a href="https://www.abhiudayg.dev/rss.xml"><strong>RSS Feed</strong></a> ·
  <a href="https://x.com/abhiudayg"><strong>X (@abhiudayg)</strong></a> ·
  <a href="https://linkedin.com/in/abhiudayg"><strong>LinkedIn</strong></a> ·
  <a href="https://dev.to/abhiudayg"><strong>Dev.to</strong></a>
</p>

---

### Featured Systems &amp; Runtimes

| System | Version | Role | Architecture &amp; Stack | Repository |
|---|---|---|---|---|
| **`agent-brain`** | `v1.0.0-rc3` | Cognitive Runtime &amp; Token Gate | Local-first cognitive governor, pre-tool `route_gate` hook, ~500-token knapsack packer, and `agent-brain verify` execution ledger (Rust, SQLite + HNSW, FastEmbed ONNX, stdio MCP) | [`autonomic-ai-dev/agent-brain`](https://github.com/autonomic-ai-dev/agent-brain) |
| **`agent-spine`** | `v1.0.0-rc3` | Workflow State Machine | Deterministic workflow DAG engine &amp; cognitive state machine executing `workflows/*.yaml` with Tarjan SCC acyclicity checks and approval gates (Rust, Tokio, SQLite) | [`autonomic-ai-dev/agent-spine`](https://github.com/autonomic-ai-dev/agent-spine) |
| **`dustmap`** | `v1.0.1` | Native Systems Utility | High-performance macOS disk space analyzer and conservative cleaner with squarified treemaps, sector donuts, and parallel Rayon walk (Rust, Tauri 2, 100% offline) | [`abhiudayg/dustmap`](https://github.com/abhiudayg/dustmap) |
| **`agentrun`** | `Pre-alpha` | Job &amp; Container Runtime | Runs coding-agent tasks as isolated, recoverable jobs on your machine in dedicated containers and git worktrees with shared queues and audit trails (Go, Containers, Git Worktrees, macOS) | [`autonomic-ai-dev/agentrun`](https://github.com/autonomic-ai-dev/agentrun) |
| **`harbor`** | `Pre-alpha` | Agent-Native Browser | Open-source agent-native macOS browser built on WebKit with explicit permission engines, human approval gates, SHA-256 hash-chained audit logs, and local MCP server (Swift, WebKit, macOS) | [`autonomic-ai-dev/harbor`](https://github.com/autonomic-ai-dev/harbor) |

---

### Selected Technical Essays &amp; Publications

* **[agent-brain: the architectural pivot — from passive retrieval to deterministic cognitive runtime](https://www.abhiudayg.dev/blog/agent-brain-the-architectural-pivot-and-runtime/)** (Part 3)  
  *Why passive context retrieval broke down in real-world autonomous coding, how we pivoted into a hard-gated execution runtime with token budgets, verify invariants, and upstream MCP routing.*
* **[agent-brain: memory scopes, temporal pruning, and cross-session routing](https://www.abhiudayg.dev/blog/agent-brain-memory-scopes-and-reinforcement/)** (Part 2)  
  *Multi-session context persistence, temporal fact decay, and circuit-broken upstream tools.*
* **[agent-brain: local MCP routing under a token budget](https://www.abhiudayg.dev/blog/agent-brain-local-mcp-routing/)** (Part 1)  
  *Answering the question: what should the model see right now under a strict 700-token ceiling?*
* **[agentrun: isolated coding agent runtimes with container workspaces](https://www.abhiudayg.dev/blog/agentrun-isolated-coding-agent-runtimes/)**  
  *Designing hermetic, reproducible execution environments with copy-on-write workspaces.*
* **[dustmap: sub-12ms disk space visualizer in Rust and Tauri](https://www.abhiudayg.dev/blog/dustmap-disk-space-visualizer-rust-tauri/)**  
  *Low-latency parallel directory traversal with Rayon and native macOS disk reporting.*

---

### Engineering Philosophy

* **Verification as an Invariant**: Every test, build, and claim requires cryptographic execution evidence (`agent-brain verify`). Zero hallucinated success.
* **Token Budget Discipline**: High-signal, byte-capped context envelopes over noisy prompt dumps.
* **Zero Comment Slop**: Self-documenting code with clear boundary discipline over LLM-generated narrative noise.
* **Open Standards &amp; Web Fidelity**: Pure web standards, zero tracking pixels, zero analytics scripts, and 100% full-text RSS syndication.

---

### Tech Stack &amp; Focus

* **Languages &amp; Runtimes**: Rust, Go, Swift, TypeScript, Node.js, Bun, POSIX Shell
* **Distributed &amp; Systems**: Tokio, SQLite + HNSW, FastEmbed ONNX, macOS WebKit, Container Sandboxing, Git Worktrees, Unix Domain Sockets
* **AI &amp; Autonomous Agents**: Model Context Protocol (MCP), Agent-Spine Workflow DAGs, Cognitive Governors
* **Web Platform**: Astro, Tailwind CSS v4, Web Standards, KaTeX, Mermaid.js

---

<details>
<summary><strong>Repository Source &amp; Platform Build Details</strong></summary>

<br>

This repository (`abhiudayg/abhiudayg`) also houses the source code for the personal brand platform and engineering blog ([www.abhiudayg.dev](https://www.abhiudayg.dev)):

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
