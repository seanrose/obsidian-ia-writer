#!/usr/bin/env node
import { lstatSync, mkdirSync, symlinkSync, unlinkSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const target = process.argv[2];
if (!target) {
	console.error("Usage: npm run link-to-vault -- <vault>/.obsidian/plugins/ia-writer");
	console.error("Example: npm run link-to-vault -- ~/Documents/MyVault/.obsidian/plugins/ia-writer");
	process.exit(1);
}

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const targetDir = resolve(target.replace(/^~(?=$|\/)/, process.env.HOME ?? ""));

mkdirSync(targetDir, { recursive: true });

for (const name of ["main.js", "manifest.json"]) {
	const src = join(repoRoot, name);
	const dest = join(targetDir, name);
	if (lstatSync(dest, { throwIfNoEntry: false })) {
		unlinkSync(dest);
	}
	symlinkSync(src, dest);
	console.log(`linked ${dest} -> ${src}`);
}

console.log("\nReload the plugin in Obsidian to pick up changes.");
