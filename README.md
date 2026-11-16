# Abhiuday Gupta 🤍

<p align="left">
  <strong>Software Engineer based in Bengaluru, India.</strong> Wrangling enterprise fintech Java by day ☕, hacking on bare-metal Go, Rust, and AI agents by night 🚀.
</p>

<p align="left">
  <a href="https://www.abhiudayg.dev"><strong>Website &amp; Essays</strong></a> ·
  <a href="https://www.abhiudayg.dev/rss.xml"><strong>RSS Feed</strong></a> ·
  <a href="https://x.com/abhiudayg"><strong>X (@abhiudayg)</strong></a> ·
  <a href="https://www.instagram.com/baremetal.dev/"><strong>Instagram (@baremetal.dev)</strong></a> ·
  <a href="https://linkedin.com/in/abhiudayg"><strong>LinkedIn</strong></a> ·
  <a href="https://dev.to/abhiudayg"><strong>Dev.to</strong></a>
</p>

---

### the living duality ☕🚀

* ☕ **by day:** SDE 2 at **Zeta** (`@zetasuite`) (previously built high-throughput UPI payment switches at **BillDesk**). Wrangling enterprise **Java, Spring Boot**, PostgreSQL, Kafka, and distributed ledger systems where the golden rule is: *"never lose money or double-charge someone even if the network blinks mid-request."*
* 🚀 **by night:** Hacking in **Go, Rust, and Linux kernel primitives** (`cgroups v2`, `systemd`, dynamic loopback networking). Building tools that compile in milliseconds, drink zero RAM, and make shipping software feel like magic ✨.

---

### featured open-source systems &amp; tools 🛠️

| System | Version | What it does | Stack | Repository |
|---|---|---|---|---|
| **`anode`** | `v1.1.0` | **The Docker Compose &amp; Kubernetes alternative for Go backends.** Deduces infrastructure topology from your code using Go SSA analysis and deploys to Linux systemd, cgroups v2, and Caddy with &lt;8.2ms cold boots (zero Docker, zero YAML) 🚀 | Go 1.27, SSA, systemd, Caddy | [`abhiudayg/anode`](https://github.com/abhiudayg/anode) · [Site](https://anode.abhiudayg.dev) |
| **`tekmor`** | `v1.0.0` | **Hard-gate verification engine &amp; cryptographic test ledger.** Intercepts tool calls via host stop hooks, executes allowlisted test suites in POSIX subshells, and records cryptographic verification receipts so coding agents never fake test passes 🛡️ | Rust, POSIX Subshell, SHA-256, Stop Hooks | [`autonomic-ai-dev/tekmor`](https://github.com/autonomic-ai-dev/tekmor) |
| **`shipnote`** | `v0.3.2` | **Turn the work you ship into posts you approve.** Provenance-backed drafting engine reading public commits with verified claim grounding against diffs 🚢 | TypeScript, Bun, GitHub Actions | [`abhiudayg/shipnote`](https://github.com/abhiudayg/shipnote) · [Site](https://shipnote.abhiudayg.dev) |
| **`agentrun`** | `Pre-alpha` | **Isolated coding agent environments on macOS.** Runs tasks as isolated, recoverable jobs using native Apple container sandboxes and git worktrees 🍏 | Go, Apple Containers, Git Worktrees | [`autonomic-ai-dev/agentrun`](https://github.com/autonomic-ai-dev/agentrun) |
| **`thesmos`** | `v1.0.0` | **Deterministic workflow DAG engine &amp; state machine.** Executes declarative graphs (`workflows/*.yaml`) with Tarjan SCC acyclicity checks and human approval checkpoints 🔗 | Rust, Tokio, YAML DAGs | [`autonomic-ai-dev/thesmos`](https://github.com/autonomic-ai-dev/thesmos) |
| **`harbor`** | `Pre-alpha` | **Agent-native, sidebar-first browser for macOS.** Built on WebKit with explicit permission engines, human approval gates, and a local MCP server 🧭 | Swift, WebKit, macOS | [`autonomic-ai-dev/harbor`](https://github.com/autonomic-ai-dev/harbor) |

---

### selected engineering dispatches 📖

* **[why we ditched docker for go backends: the magic of 8ms cold starts 🚀](https://www.abhiudayg.dev/blog/why-we-ditched-docker-for-go-backends/)**  
  *A fun deep dive into container memory bloat, containerd overhead, and how running compiled Go binaries directly under Linux systemd gives you 55x faster boots ✨.*
* **[inside the ssa compiler core: how Go reads its own infrastructure topology ✨](https://www.abhiudayg.dev/blog/inside-the-ssa-compiler-core/)**  
  *Why regex matching fails on real code, and how Anode uses Go SSA and Variable Type Analysis to deduce databases, routes, and ports in ~60ms without touching YAML 🤍.*
* **[tekmor: the architectural pivot — why gentle suggestions don’t stop AI chaos 🤍](https://www.abhiudayg.dev/blog/agent-brain-the-architectural-pivot-and-runtime/)**  
  *Why polite prompts fail in real coding agents, and how we built hard gates, token knapsacks, and real test receipts in Rust ✨.*
* **[tekmor: memory scopes, expiration dates, and teaching agents not to hoard context ✨](https://www.abhiudayg.dev/blog/agent-brain-memory-scopes-and-reinforcement/)**  
  *Why static memory turns into a digital attic, how we split global vs project scopes, and teaching AI agents to forget stale facts 🤍.*
* **[building dustmap: a sub-12ms mac disk visualizer in Rust and Tauri ✨](https://www.abhiudayg.dev/blog/dustmap-disk-space-visualizer-rust-tauri/)**  
  *Parallel Rayon file walks, flat memory arrays with zero pointer chasing, and a friendly Trash-first cleaner that never eats your files.*

---

### what i believe in ✨

* **Verification as an Invariant:** Every test, build, and claim requires real execution evidence (`tekmor verify`). Zero hallucinated success.
* **Token Budget Discipline:** High-signal, byte-capped context envelopes over noisy prompt dumps.
* **Bare-Metal Simplicity:** Embrace native kernel primitives (`systemd`, `cgroups v2`, socket activation) when single static binaries make virtualized shims redundant.
* **Zero Tracker Ethos:** Pure web standards, zero client-side tracking pixels, zero analytics scripts, and 100% full-text RSS syndication.

---

<details>
<summary><strong>Repository Source &amp; Platform Build Details</strong></summary>

<br>

This repository (`abhiudayg/abhiudayg`) houses the source code for my personal platform and engineering blog ([www.abhiudayg.dev](https://www.abhiudayg.dev)):

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
# Run unit test suite
bun test

# Run verified production build
bun run build
```

</details>

---

<p align="left">
  <sub>Licensed under <a href="LICENSE">MIT</a>. Written content published under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. Hope you enjoy exploring my work 🤍!</sub>
</p>
