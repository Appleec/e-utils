import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import * as fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import pc from 'picocolors';

// @ts-ignore
const DIR_ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIR_DIST = resolve(DIR_ROOT, 'dist');
const watch = process.argv.includes('--watch');

/**
 * main
 */
async function main() {
  // Clean
  console.log('\n# Clean up',);
  console.log(pc.green(`> rm ${DIR_DIST}`));
  await cleanDist();

  // do something...

  // Rollup
  console.log('\n# Rollup',);
  const command = `npm run build:rollup${watch ? ' -- --watch' : ''}`;
  console.log(pc.green(`> ${command}`));
  execSync(command, { stdio: 'inherit' });

  // do something...
}

/**
 * Clean dist dir
 */
async function cleanDist() {
  if (!existsSync(DIR_DIST))
    return;

  await fs.rm(DIR_DIST, { recursive: true });
}

main().catch((err) => console.error(pc.red('error'), err));
