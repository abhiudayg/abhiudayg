export const SITE_TITLE = 'Abhiuday — Systems & AI Engineer';
export const SITE_DESCRIPTION =
	'Architecting autonomous agent runtimes, real-time distributed systems, and low-latency developer tooling. Documenting the build, one commit at a time.';
export const AUTHOR_NAME = 'Abhiuday';
export const SITE_URL = 'https://abhiudayg.dev';
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
	'agent-brain': {
		title: 'agent-brain',
		description: 'Local MCP routing for agents, skills, rules, and memory under a token budget.',
		repoUrl: 'https://github.com/autonomic-ai-dev/agent-brain',
		tag: 'AI Agents',
		badge: 'v1.0.0-rc3',
	},
	'dustmap': {
		title: 'dustmap',
		description: 'A blazing-fast, transparent macOS disk space analyzer and conservative cleaner in Rust and Tauri.',
		repoUrl: 'https://github.com/abhiudayg/dustmap',
		tag: 'Systems',
		badge: 'v1.0.1',
	},
	'agentrun': {
		title: 'agentrun',
		description: 'Isolated, recoverable coding agent runtimes with container sandboxing on your own machine.',
		repoUrl: 'https://github.com/autonomic-ai-dev/agentrun',
		tag: 'Sandboxing',
		badge: '4ms boot',
	},
	'agent-spine': {
		title: 'agent-spine',
		description: 'Deterministic multi-step DAG workflow engine with human-in-the-loop approval gates.',
		repoUrl: 'https://github.com/autonomic-ai-dev/agent-spine',
		tag: 'Orchestration',
		badge: 'v1.0.0-rc3',
	},
	'harbor': {
		title: 'harbor',
		description: 'Headless browser execution engine and DOM inspection sandbox designed for autonomous agents.',
		repoUrl: 'https://github.com/autonomic-ai-dev/harbor',
		tag: 'Agent Browser',
		badge: 'CDP Engine',
	},
} as const;

export type BlogSeriesSlug = keyof typeof BLOG_SERIES;

export const BLOG_SERIES_SLUGS = Object.keys(BLOG_SERIES) as BlogSeriesSlug[];

export const POSTS_PER_PAGE = 10;
