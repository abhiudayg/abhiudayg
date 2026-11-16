import { describe, expect, it } from 'bun:test';
import { compareVersions, parseSemver } from './update-product-versions';
import productVersions from '../src/data/product-versions.json';

describe('semver parsing and comparison', () => {
	it('parses valid semver strings with or without v prefix', () => {
		expect(parseSemver('v1.6.0')).toEqual({ major: 1, minor: 6, patch: 0, prerelease: '' });
		expect(parseSemver('1.2.3')).toEqual({ major: 1, minor: 2, patch: 3, prerelease: '' });
		expect(parseSemver('v0.3.2-alpha.1')).toEqual({ major: 0, minor: 3, patch: 2, prerelease: 'alpha.1' });
	});

	it('returns null for non-semver strings like Pre-alpha', () => {
		expect(parseSemver('Pre-alpha')).toBeNull();
		expect(parseSemver('wip')).toBeNull();
	});

	it('correctly compares version increments', () => {
		expect(compareVersions('v1.6.0', 'v1.1.0')).toBeGreaterThan(0);
		expect(compareVersions('v1.1.0', 'v1.6.0')).toBeLessThan(0);
		expect(compareVersions('v1.6.0', 'v1.6.0')).toBe(0);
		expect(compareVersions('v2.0.0', 'v1.9.9')).toBeGreaterThan(0);
	});

	it('considers semver higher than non-semver strings', () => {
		expect(compareVersions('v1.0.0', 'Pre-alpha')).toBeGreaterThan(0);
		expect(compareVersions('Pre-alpha', 'v1.0.0')).toBeLessThan(0);
	});

	it('does not upgrade when remote is older than current', () => {
		expect(compareVersions('v0.20.0', 'v1.0.0')).toBeLessThan(0);
	});
});

describe('product-versions.json integrity', () => {
	it('contains all required product keys', () => {
		const required = ['anode', 'tekmor', 'shipnote', 'agentrun', 'thesmos', 'harbor'];
		for (const key of required) {
			expect(productVersions).toHaveProperty(key);
			const item = (productVersions as any)[key];
			expect(item.repo).toBeTruthy();
			expect(item.version).toBeTruthy();
		}
	});
});
