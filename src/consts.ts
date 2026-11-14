export const SITE_TITLE = 'Abhiuday Gupta — Systems & AI Engineer';
export const SITE_DESCRIPTION =
	'Architecting autonomous agent runtimes, real-time distributed systems, and low-latency developer tooling. Documenting the build, one commit at a time.';
export const AUTHOR_NAME = 'Abhiuday Gupta';
export const AUTHOR_HANDLE = 'abhiudayg';
export const SITE_URL = 'https://www.abhiudayg.dev';
export const RSS_FEED_URL = `${SITE_URL}/rss.xml`;

export const GITHUB_URL = 'https://github.com/abhiudayg';
export const TWITTER_URL = 'https://x.com/abhiudayg';
export const LINKEDIN_URL = 'https://linkedin.com/in/abhiudayg';
export const DEVTO_URL = 'https://dev.to/abhiudayg';
export const HASHNODE_URL = 'https://hashnode.com/@abhiudayg';
export const REDDIT_URL = 'https://www.reddit.com/user/abhiudayg/';
export const REPO_URL = 'https://github.com/abhiudayg/abhiudayg-blog';

export type SocialIconId = 'github' | 'x' | 'linkedin' | 'devto' | 'hashnode' | 'reddit';

export const SOCIAL_LINKS: ReadonlyArray<{
	name: string;
	href: string;
	icon: SocialIconId;
}> = [
		{ name: 'GitHub', href: GITHUB_URL, icon: 'github' },
		{ name: 'X', href: TWITTER_URL, icon: 'x' },
		{ name: 'LinkedIn', href: LINKEDIN_URL, icon: 'linkedin' },
		{ name: 'dev.to', href: DEVTO_URL, icon: 'devto' },
		{ name: 'Hashnode', href: HASHNODE_URL, icon: 'hashnode' },
		{ name: 'Reddit', href: REDDIT_URL, icon: 'reddit' },
	];

export const BLOG_SERIES = {
	'anode': {
		title: 'anode',
		description: 'The Docker Compose & Kubernetes alternative for Go backends. Deploy unmodified Go to any Linux VPS without Dockerfiles, container daemons, or YAML drift.',
		repoUrl: 'https://github.com/abhiudayg/anode',
		tag: 'Orchestration',
		badge: 'v1.1.0',
	},
	'agent-brain': {
		title: 'agent-brain',
		description: 'Local-first cognitive governor, turn router & procedure graph for coding agents under token budgets.',
		repoUrl: 'https://github.com/autonomic-ai-dev/agent-brain',
		tag: 'AI Agents',
		badge: 'v1.0.0-rc8',
	},
	'shipnote': {
		title: 'shipnote',
		description: 'Turn the work you ship into posts you approve — provenance-backed technical drafting engine from public git commits.',
		repoUrl: 'https://github.com/abhiudayg/shipnote',
		tag: 'Developer Tools',
		badge: 'v0.3.2',
	},
	'dustmap': {
		title: 'dustmap',
		description: 'A blazing-fast, transparent macOS disk space analyzer and conservative cleaner in Rust and Tauri 2.',
		repoUrl: 'https://github.com/abhiudayg/dustmap',
		tag: 'Systems',
		badge: 'v1.0.1',
	},
	'agentrun': {
		title: 'agentrun',
		description: 'Isolated, recoverable coding agent jobs on your machine with container sandboxes and git worktrees.',
		repoUrl: 'https://github.com/autonomic-ai-dev/agentrun',
		tag: 'Sandboxing',
		badge: 'Pre-alpha',
	},
	'agent-spine': {
		title: 'agent-spine',
		description: 'Deterministic workflow DAG engine and cognitive state machine for coding agents.',
		repoUrl: 'https://github.com/autonomic-ai-dev/agent-spine',
		tag: 'Orchestration',
		badge: 'v1.0.0-rc3',
	},
	'harbor': {
		title: 'harbor',
		description: 'Agent-native, sidebar-first web browser for macOS built on WebKit with approval gates and local MCP.',
		repoUrl: 'https://github.com/autonomic-ai-dev/harbor',
		tag: 'Agent Browser',
		badge: 'Pre-alpha',
	},
} as const;

export type BlogSeriesSlug = keyof typeof BLOG_SERIES;

export const BLOG_SERIES_SLUGS = Object.keys(BLOG_SERIES) as BlogSeriesSlug[];

export const POSTS_PER_PAGE = 10;
