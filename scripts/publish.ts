import { execSync } from 'node:child_process';
import fs from "node:fs/promises";
import {join, resolve} from 'node:path';
import { fileURLToPath } from 'node:url';
import pc from 'picocolors';

import { version } from '../package.json';

// @ts-ignore
const DIR_ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIR_DIST = resolve(DIR_ROOT, 'dist');

/**
 * main
 */
async function main() {
  // Check before build
  console.log(pc.cyan(`\n# Check before build`));
  console.log(pc.green(`> npm run build:types`));
  execSync('npm run build:types', { stdio: 'inherit' });

  // Build the package
  console.log(pc.cyan(`\n# Build the package`));
  console.log(pc.green(`> npm run build`));
  execSync('npm run build', { stdio: 'inherit' });

  // Generate the `package.json`, `LICENSE`, `README.md`, `README-zh.md`
  console.log(pc.cyan(`\n# Generate the files`));
  await genAssets();

  console.log(pc.cyan('info'), `Output files
    at ${pc.green(`package.json`)} ${pc.gray(`(${pc.blueBright(pc.underline(resolve(DIR_DIST, 'package.json')))})`)}
    at ${pc.green(`LICENSE`)} ${pc.gray(`(${pc.blueBright(pc.underline(resolve(DIR_DIST, 'LICENSE')))})`)}
    at ${pc.green(`README.md`)} ${pc.gray(`(${pc.blueBright(pc.underline(resolve(DIR_DIST, 'README.md')))})`)}
    at ${pc.green(`README-zh.md`)} ${pc.gray(`(${pc.blueBright(pc.underline(resolve(DIR_DIST, 'README-zh.md')))})`)}
    `
  );

  // Ready to publish
  console.log(pc.cyan(`\n# Ready to publish`));
  // Enter `dist` dir for root
  console.log(pc.green(`> cd ${DIR_DIST}`));
  process.chdir(DIR_DIST);

  // Publishing the package
  console.log(pc.cyan(`\n# Publishing the package`));
  let command = `npm publish -r --access public --registry https://registry.npmjs.org/ --no-git-checks`;

  if (version.includes('beta'))
    command += ' --tag beta'

  console.log(pc.green(`> ${command}`));
  execSync(command, { stdio: 'inherit' });
}

/**
 * Generate files
 */
async function genAssets() {
  const packageJSON = await getPackageJson();

  await fs.writeFile(join(DIR_DIST, 'package.json'), `${JSON.stringify(packageJSON, null, 2)}\n`);
  await fs.copyFile(join(DIR_ROOT, 'LICENSE'), join(DIR_DIST, 'LICENSE'));
  await fs.copyFile(join(DIR_ROOT, 'README.md'), join(DIR_DIST, 'README.md'));
  await fs.copyFile(join(DIR_ROOT, 'README-zh.md'), join(DIR_DIST, 'README-zh.md'));
}

/**
 * Get json from package.json
 */
async function getPackageJson() {
  const packageJSON = JSON.parse(await fs.readFile(join(DIR_ROOT, 'package.json'), { encoding: 'utf8' }));

  packageJSON.scripts = {
    "test": "echo \"Error: no test specified\" && exit 1"
  };

  packageJSON.main = "./cjs/index.js";
  packageJSON.module = "./esm/index.js";
  packageJSON.types = "./index.d.ts";
  packageJSON.exports = {
    ".": {
      "import": {
        "types": "./index.d.ts",
        "default": "./esm/index.js"
      },
      "require": {
        "types": "./index.d.ts",
        "default": "./cjs/index.js"
      }
    },
    "./package.json": "./package.json"
  };
  // packageJSON.files = [
  //   "*.d.ts",
  //   "package.json",
  //   "README.md",
  // ]

  delete packageJSON.devDependencies;
  delete packageJSON.publishConfig;
  delete packageJSON.private;
  delete packageJSON.files;

  return packageJSON;
}

main().catch((err) => console.error(pc.red('error'), err));
