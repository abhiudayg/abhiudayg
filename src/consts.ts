export const SITE_TITLE = 'Abhiuday Gupta — Systems & AI Engineer';
export const SITE_DESCRIPTION =
	'Architecting autonomous agent runtimes, real-time distributed systems, and low-latency developer tooling. Documenting the build, one commit at a time.';
export const AUTHOR_NAME = 'Abhiuday Gupta';
export const AUTHOR_HANDLE = 'abhiudayg';
export const SITE_URL = 'https://www.abhiudayg.dev';
export const RSS_FEED_URL = `${SITE_URL}/rss.xml`;

export const GITHUB_URL = 'https://github.com/abhiudayg';
export const TWITTER_URL = 'https://x.com/abhiudayg';
export const INSTAGRAM_URL = 'https://www.instagram.com/baremetal.dev/';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/abhiudayg/';
export const DEVTO_URL = 'https://dev.to/abhiudayg';
export const HASHNODE_URL = 'https://hashnode.com/@abhiudayg';
export const REDDIT_URL = 'https://www.reddit.com/user/abhiudayg/';
export const REPO_URL = 'https://github.com/abhiudayg/abhiudayg-blog';

export type SocialIconId = 'github' | 'x' | 'linkedin' | 'instagram' | 'devto' | 'hashnode' | 'reddit';

export const SOCIAL_LINKS: ReadonlyArray<{
	name: string;
	href: string;
	icon: SocialIconId;
}> = [
		{ name: 'GitHub', href: GITHUB_URL, icon: 'github' },
		{ name: 'X', href: TWITTER_URL, icon: 'x' },
		{ name: 'Instagram (@baremetal.dev)', href: INSTAGRAM_URL, icon: 'instagram' },
		{ name: 'LinkedIn', href: LINKEDIN_URL, icon: 'linkedin' },
		{ name: 'dev.to', href: DEVTO_URL, icon: 'devto' },
		{ name: 'Hashnode', href: HASHNODE_URL, icon: 'hashnode' },
		{ name: 'Reddit', href: REDDIT_URL, icon: 'reddit' },
	];

import productVersions from './data/product-versions.json';

export const BLOG_SERIES = {
	'anode': {
		title: 'anode',
		description: 'The Docker Compose & Kubernetes alternative for Go backends. Deploy unmodified Go to any Linux VPS without Dockerfiles, container daemons, or YAML drift.',
		repoUrl: 'https://github.com/abhiudayg/anode',
		tag: 'Orchestration',
		badge: productVersions.anode.version,
	},
	'tekmor': {
		title: 'tekmor',
		description: 'Hard-gate verification engine & cryptographic test ledger for AI coding agents.',
		repoUrl: 'https://github.com/autonomic-ai-dev/tekmor',
		tag: 'AI Verification',
		badge: productVersions.tekmor.version,
	},
	'shipnote': {
		title: 'shipnote',
		description: 'Turn the work you ship into posts you approve — provenance-backed technical drafting engine from public git commits.',
		repoUrl: 'https://github.com/abhiudayg/shipnote',
		tag: 'Developer Tools',
		badge: productVersions.shipnote.version,
	},
	'agentrun': {
		title: 'agentrun',
		description: 'Isolated, recoverable coding agent jobs on your machine with container sandboxes and git worktrees.',
		repoUrl: 'https://github.com/autonomic-ai-dev/agentrun',
		tag: 'Sandboxing',
		badge: productVersions.agentrun.version,
	},
	'thesmos': {
		title: 'thesmos',
		description: 'Deterministic workflow DAG engine and cognitive state machine for coding agents.',
		repoUrl: 'https://github.com/autonomic-ai-dev/thesmos',
		tag: 'Orchestration',
		badge: productVersions.thesmos.version,
	},
	'harbor': {
		title: 'harbor',
		description: 'Agent-native, sidebar-first web browser for macOS built on WebKit with approval gates and local MCP.',
		repoUrl: 'https://github.com/autonomic-ai-dev/harbor',
		tag: 'Agent Browser',
		badge: productVersions.harbor.version,
	},
} as const;

export type BlogSeriesSlug = keyof typeof BLOG_SERIES;

export const BLOG_SERIES_SLUGS = Object.keys(BLOG_SERIES) as BlogSeriesSlug[];

export const POSTS_PER_PAGE = 10;
