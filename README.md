# Abhiuday — Personal Brand & Engineering Hub

<p align="center">
  <strong>Architecting autonomous agent runtimes, deterministic DAG workflow engines, and low-latency sandboxing infrastructure.</strong><br>
  <em>Documenting internal design decisions, production post-mortems, and open-source tooling as I build.</em>
</p>

<p align="center">
  <a href="https://abhiudayg-blog.vercel.app"><strong>Live Platform »</strong></a> ·
  <a href="https://abhiudayg-blog.vercel.app/blog"><strong>Technical Essays »</strong></a> ·
  <a href="https://abhiudayg-blog.vercel.app/rss.xml"><strong>Full-Text RSS »</strong></a>
</p>

---

## Aesthetic & Architecture

Designed with a high-contrast **Resend** and **Vercel** minimalist dark-first aesthetic, synthesized using **Stitch MCP** and the **`ui-ux-pro-max`** design system:

* **Typography**: Razor-sharp [Geist](https://vercel.com/font) sans-serif paired with [Geist Mono](https://vercel.com/font) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/) for code and live telemetry.
* **Framer-Style Motion Background**: GPU-accelerated drifting ambient gradient orbs with a fine 36px coordinate grid mask and desktop pointer-tracking spotlight.
* **Harmonic Bento Systems Grid**: Mathematical 12-column grid highlighting active flagship systems, complete with direct GitHub link buttons.
* **Interactive Live DAG State Engine**: Client-side interactive visualizer breaking down Tokio broadcast channels, Tarjan SCC cycle detection, and zero-copy IPC streaming.
* **Instant ⌘K Command Palette**: Global modal for real-time fuzzy searching across essays, series tracks, and external repositories with full keyboard navigation.
* **Zero-Tracker Ethos**: Pure web standards with zero tracking pixels, zero analytics scripts, and 100% full-text RSS syndication.

---

## Featured Systems & Runtimes

| System | Focus | Core Stack | Repository |
|---|---|---|---|
| **`agent-brain`** | Local MCP routing, skills, rules & memory under token budgets | Rust · Tokio · gRPC · SQLite WAL | [autonomic-ai-dev/agent-brain](https://github.com/autonomic-ai-dev/agent-brain) |
| **`dustmap`** | Blazing-fast macOS disk visualizer & conservative cleaner (< 12ms scan) | Rust · Tauri · Rayon parallel walk | [abhiudayg/dustmap](https://github.com/abhiudayg/dustmap) |
| **`agentrun`** | Isolated, recoverable coding agent runtimes with container sandboxing (4ms boot) | Containers · eBPF · Linux cgroups | [autonomic-ai-dev/agentrun](https://github.com/autonomic-ai-dev/agentrun) |
| **`agent-spine`** | Deterministic multi-step DAG workflow runner with approval gates | Rust · Tokio · YAML DAGs | [autonomic-ai-dev/agent-spine](https://github.com/autonomic-ai-dev/agent-spine) |
| **`harbor`** | Headless browser execution engine & DOM inspection sandbox for agents | TypeScript · Playwright · CDP | [autonomic-ai-dev/harbor](https://github.com/autonomic-ai-dev/harbor) |

---

## Stack & Tooling

* **Framework**: [Astro 7](https://astro.build/) (Static Site Generation, zero client JS overhead for content)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
* **Package Manager & Runtime**: [Bun](https://bun.sh/)
* **Math & Diagrams**: KaTeX and Mermaid.js for architecture specs
* **Verification Harness**: [`agent-brain verify`](https://github.com/autonomic-ai-dev/agent-brain) with strict evidence recording

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/abhiudayg/abhiudayg.git
cd abhiudayg

# Install dependencies with Bun
bun install

# Start local development server
bun dev
```

Open [http://localhost:4321](http://localhost:4321) to explore the site locally.

### Verification & Testing

```bash
# Run unit test suite (SEO, canonical URLs, JSON-LD, pagination)
agent-brain verify -- bun test

# Run static production build
agent-brain verify -- bun run build
```

---

## Writing New Dispatches

Posts live in `src/content/blog/` as Markdown (`.md`) or MDX (`.mdx`):

```yaml
---
title: 'Benchmarking Firecracker MicroVM Boot Latencies'
description: 'Detailed breakdowns of kernel init times and seccomp jail policies.'
pubDate: 2026-10-28
series: 'agentrun'
seriesPart: 1
---

Content goes here with standard Markdown, LaTeX math ($E=mc^2$), or Mermaid diagrams.
```

---

## License

* Code and implementation licensed under [MIT](LICENSE).
* Technical essays and articles published under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
