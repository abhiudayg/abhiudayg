import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface ProductConfig {
	repo: string;
	version: string;
	fallback?: string;
	lastChecked?: string;
	lastReleaseUrl?: string;
}

export type ProductVersionsMap = Record<string, ProductConfig>;

/**
 * Normalizes and extracts semantic version strings from git tags (e.g., 'v1.6.0' -> [1, 6, 0]).
 */
export function parseSemver(tag: string): { major: number; minor: number; patch: number; prerelease: string } | null {
	const match = tag.trim().match(/^v?(\d+)\.(\d+)(?:\.(\d+))?(?:-(.+))?$/);
	if (!match) return null;
	return {
		major: parseInt(match[1] ?? '0', 10),
		minor: parseInt(match[2] ?? '0', 10),
		patch: parseInt(match[3] ?? '0', 10),
		prerelease: match[4] ?? '',
	};
}

/**
 * Compares two semantic version tags. Returns > 0 if a is newer than b, < 0 if b is newer than a.
 */
export function compareVersions(a: string, b: string): number {
	const semA = parseSemver(a);
	const semB = parseSemver(b);

	if (!semA && !semB) return a.localeCompare(b);
	if (!semA) return -1;
	if (!semB) return 1;

	if (semA.major !== semB.major) return semA.major - semB.major;
	if (semA.minor !== semB.minor) return semA.minor - semB.minor;
	if (semA.patch !== semB.patch) return semA.patch - semB.patch;

	// Releases without prerelease string are considered higher than prereleases
	if (!semA.prerelease && semB.prerelease) return 1;
	if (semA.prerelease && !semB.prerelease) return -1;

	return semA.prerelease.localeCompare(semB.prerelease);
}

/**
 * Fetches the latest release or tag from GitHub API for a given repository.
 */
export async function fetchLatestVersion(
	repo: string,
	token?: string,
): Promise<{ version: string; url?: string } | null> {
	const headers: Record<string, string> = {
		'User-Agent': 'abhiudayg-product-version-pipeline/1.0',
		Accept: 'application/vnd.github.v3+json',
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	// 1. Try /releases/latest first
	try {
		const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers });
		if (res.ok) {
			const data = (await res.json()) as { tag_name?: string; html_url?: string };
			if (data.tag_name) {
				return {
					version: data.tag_name,
					url: data.html_url,
				};
			}
		}
	} catch (err) {
		console.warn(`[WARN] Failed to fetch latest release for ${repo}:`, err);
	}

	// 2. Fall back to /tags if /releases/latest returns 404
	try {
		const res = await fetch(`https://api.github.com/repos/${repo}/tags?per_page=10`, { headers });
		if (res.ok) {
			const tags = (await res.json()) as Array<{ name?: string }>;
			const validTags = tags
				.map((t) => t.name)
				.filter((t): t is string => Boolean(t && parseSemver(t)))
				.sort(compareVersions);

			const latestTag = validTags[validTags.length - 1];
			if (latestTag) {
				return {
					version: latestTag,
					url: `https://github.com/${repo}/releases/tag/${latestTag}`,
				};
			}
		}
	} catch (err) {
		console.warn(`[WARN] Failed to fetch tags for ${repo}:`, err);
	}

	return null;
}

/**
 * Main pipeline runner.
 */
export async function runProductVersionUpdate(options: { dryRun?: boolean; configPath?: string } = {}) {
	const configPath = options.configPath || resolve(process.cwd(), 'src/data/product-versions.json');
	const dryRun = options.dryRun ?? false;
	const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

	console.log(`[INFO] Starting product version update pipeline...`);
	console.log(`[INFO] Reading config from: ${configPath}`);

	const raw = readFileSync(configPath, 'utf-8');
	const products: ProductVersionsMap = JSON.parse(raw);
	let hasChanges = false;
	const timestamp = new Date().toISOString();

	for (const [key, product] of Object.entries(products)) {
		console.log(`\n[CHECK] Inspecting ${key} (${product.repo}). Current: ${product.version}`);

		const latest = await fetchLatestVersion(product.repo, token);
		product.lastChecked = timestamp;

		if (latest && latest.version) {
			const isUpgrade = compareVersions(latest.version, product.version) > 0;
			if (isUpgrade) {
				console.log(`  🚀 New version published for ${key}: ${product.version} -> ${latest.version}`);
				product.version = latest.version;
				if (latest.url) product.lastReleaseUrl = latest.url;
				hasChanges = true;
			} else {
				console.log(`  ✓ ${key} is up to date (current: ${product.version}, remote: ${latest.version})`);
			}
		} else {
			console.log(`  ℹ No releases/tags returned for ${product.repo}. Keeping fallback: ${product.version}`);
		}
	}

	if (hasChanges) {
		if (dryRun) {
			console.log(`\n[DRY RUN] Changes detected, but skipping write.`);
		} else {
			writeFileSync(configPath, JSON.stringify(products, null, 2) + '\n', 'utf-8');
			console.log(`\n[SUCCESS] Updated ${configPath} with fresh product versions.`);
		}
	} else {
		console.log(`\n[SUCCESS] All product versions are up to date.`);
		if (!dryRun) {
			// Update lastChecked timestamps
			writeFileSync(configPath, JSON.stringify(products, null, 2) + '\n', 'utf-8');
		}
	}

	return { hasChanges, products };
}

// Execute when run directly via bun or node
if (import.meta.main || process.argv[1]?.endsWith('update-product-versions.ts')) {
	const isDryRun = process.argv.includes('--dry-run');
	runProductVersionUpdate({ dryRun: isDryRun })
		.then(() => {
			process.exit(0);
		})
		.catch((err) => {
			console.error('[ERROR] Pipeline failed:', err);
			process.exit(1);
		});
}
