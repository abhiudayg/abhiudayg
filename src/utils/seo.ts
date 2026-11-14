import type { ImageMetadata } from 'astro';
import {
	AUTHOR_NAME,
	DEVTO_URL,
	GITHUB_URL,
	HASHNODE_URL,
	LINKEDIN_URL,
	REDDIT_URL,
	SITE_DESCRIPTION,
	SITE_TITLE,
	SITE_URL,
	TWITTER_URL,
} from '../consts';

export function formatTitle(pageTitle: string, siteTitle: string = SITE_TITLE) {
	if (pageTitle === siteTitle) return siteTitle;
	return `${pageTitle} | ${siteTitle}`;
}

export function absoluteUrl(path: string, site: URL | string = SITE_URL) {
	const base = typeof site === 'string' ? site : site.origin;
	return new URL(path, base).href;
}

export function resolveImageUrl(image: ImageMetadata | string | undefined, site: URL | string) {
	if (!image) return absoluteUrl('/og-default.jpg', site);
	if (typeof image === 'string') return absoluteUrl(image, site);
	return absoluteUrl(image.src, site);
}

export function twitterHandle() {
	const handle = TWITTER_URL.replace(/\/$/, '').split('/').pop();
	return handle ? `@${handle}` : undefined;
}

export function authorProfileUrl() {
	return GITHUB_URL;
}

export function personJsonLd(site: URL | string = SITE_URL) {
	return {
		'@type': 'Person',
		'@id': `${SITE_URL}/#person`,
		name: AUTHOR_NAME,
		alternateName: ['Abhiuday', 'aeswibon', 'abhiudayg'],
		url: authorProfileUrl(),
		sameAs: [GITHUB_URL, TWITTER_URL, LINKEDIN_URL, DEVTO_URL, HASHNODE_URL, REDDIT_URL].filter(Boolean),
		jobTitle: 'Senior Software Development Engineer (SDE 2) & Systems Architect',
		worksFor: {
			'@type': 'Organization',
			name: 'Zeta',
			url: 'https://www.zeta.tech',
		},
		description:
			'Systems & AI Engineer building Anode (Docker/Kubernetes alternative for Go backends), autonomous agent runtimes, and high-throughput fintech infrastructure.',
		knowsAbout: [
			'Go (Golang)',
			'Rust Systems Programming',
			'Anode Orchestration Engine',
			'Autonomous AI Agent Runtimes',
			'Model Context Protocol (MCP)',
			'Linux Kernel Primitives & Systemd',
			'SSA Compilers & Static Analysis',
			'Distributed Systems & High-Throughput Fintech',
			'Java Spring Boot Banking Architecture',
			'Tauri 2 & Developer Tooling',
		],
	};
}

export function websiteJsonLd(site: URL | string = SITE_URL) {
	return {
		'@type': 'WebSite',
		'@id': `${SITE_URL}/#website`,
		name: SITE_TITLE,
		description: SITE_DESCRIPTION,
		url: absoluteUrl('/', site),
		inLanguage: 'en-US',
		publisher: { '@id': `${SITE_URL}/#person` },
		author: { '@id': `${SITE_URL}/#person` },
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${absoluteUrl('/blog/', site)}?q={search_term_string}`,
			},
			'query-input': 'required name=search_term_string',
		},
	};
}

export function blogJsonLd(site: URL | string = SITE_URL) {
	return {
		'@type': 'Blog',
		'@id': `${SITE_URL}/blog/#blog`,
		name: `${SITE_TITLE} Blog`,
		description: SITE_DESCRIPTION,
		url: absoluteUrl('/blog/', site),
		inLanguage: 'en-US',
		author: { '@id': `${SITE_URL}/#person` },
		publisher: { '@id': `${SITE_URL}/#person` },
	};
}

export function aboutPageJsonLd(site: URL | string = SITE_URL) {
	return {
		'@type': 'AboutPage',
		'@id': `${SITE_URL}/about/#about`,
		name: `About ${AUTHOR_NAME}`,
		description: SITE_DESCRIPTION,
		url: absoluteUrl('/about/', site),
		inLanguage: 'en-US',
		mainEntity: { '@id': `${SITE_URL}/#person` },
	};
}

export function collectionPageJsonLd({
	name,
	description,
	url,
}: {
	name: string;
	description: string;
	url: string;
}) {
	return {
		'@type': 'CollectionPage',
		'@id': `${url}#collection`,
		name,
		description,
		url,
		inLanguage: 'en-US',
		isPartOf: {
			'@type': 'Blog',
			'@id': `${SITE_URL}/blog/#blog`,
			url: absoluteUrl('/blog/'),
		},
	};
}

export function blogPostJsonLd({
	title,
	description,
	url,
	image,
	pubDate,
	updatedDate,
	series,
	tags = [],
}: {
	title: string;
	description: string;
	url: string;
	image: string;
	pubDate: Date;
	updatedDate?: Date;
	series?: string;
	tags?: string[];
}) {
	return {
		'@type': ['BlogPosting', 'TechArticle'],
		'@id': `${url}#article`,
		headline: title,
		description,
		url,
		image: {
			'@type': 'ImageObject',
			url: image,
			width: 1200,
			height: 630,
		},
		datePublished: pubDate.toISOString(),
		dateModified: (updatedDate ?? pubDate).toISOString(),
		inLanguage: 'en-US',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url,
		},
		author: {
			'@type': 'Person',
			'@id': `${SITE_URL}/#person`,
			name: AUTHOR_NAME,
			url: authorProfileUrl(),
		},
		publisher: {
			'@type': 'Person',
			'@id': `${SITE_URL}/#person`,
			name: AUTHOR_NAME,
			url: authorProfileUrl(),
		},
		isPartOf: {
			'@type': 'Blog',
			'@id': `${SITE_URL}/blog/#blog`,
			name: `${SITE_TITLE} Blog`,
			url: absoluteUrl('/blog/'),
		},
		proficiencyLevel: 'Expert',
		...(series ? { articleSection: series } : {}),
		keywords: tags.length > 0 ? tags.join(', ') : (series ?? 'systems engineering, go, rust, autonomous agents'),
	};
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
	const lastItem = items[items.length - 1];
	return {
		'@type': 'BreadcrumbList',
		'@id': `${lastItem ? lastItem.url : SITE_URL}#breadcrumb`,
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

export function graphJsonLd(...nodes: Record<string, unknown>[]) {
	return {
		'@context': 'https://schema.org',
		'@graph': nodes,
	};
}
