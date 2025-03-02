import { execSync } from 'node:child_process'
import fs from "node:fs/promises"
import { join, resolve} from 'node:path'
import { fileURLToPath } from 'node:url'
import { chdir } from 'node:process'

import * as execa from 'execa'
import c from 'ansis'

import { version } from '../package.json';

// @ts-ignore
const DIR_ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIR_DIST = resolve(DIR_ROOT, 'dist');

/**
 * main
 */
async function main() {
  // Check before build
  console.log(c.cyan(`\n# Check before build`))
  await run('npm', ['run', 'build:types'])

  // Build the package
  console.log(c.cyan(`\n# Build the package`))
  await run('npm', ['run', 'build'])

  // Generate the `package.json`, `LICENSE`, `README.md`, `README-zh.md`
  console.log(c.cyan(`\n# Generate the assets`))
  await genAssets()

  // Publishing the package
  console.log(c.cyan(`\n# Publishing the package`))
  // Enter `dist` dir for root
  // console.log(c.green(`> cd ${DIR_DIST}`))
  // chdir(DIR_DIST)

  await run('npm', [
    'publish',
    '-r',
    '--access public',
    '--registry https://registry.npmjs.org/',
    '--ignore-scripts',
    '--no-git-checks',
    version.includes('beta') && '--tag beta',
  ].filter(Boolean), { cwd: DIR_DIST })
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

  console.log()
  console.log(c.bold`${c.green(4)} files output:`)
  console.log()
  console.log([
    c.green.underline(resolve(DIR_DIST, 'package.json')),
    c.greenBright.underline(resolve(DIR_DIST, 'LICENSE')),
    c.greenBright.underline(resolve(DIR_DIST, 'README.md')),
    c.greenBright.underline(resolve(DIR_DIST, 'README-zh.md'))
  ].join('\n'))
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

/**
 * Run command
 * @param bin
 * @param args
 * @param opt
 */
async function run(bin, args, opt?) {
  opt = Object.assign({ logger: true }, opt)
  if (opt.logger) console.log(c.green(`> ${[bin, ...args].join(' ')}`))
  try {
    return await execa.execa(bin, args, { stdio: 'inherit', ...opt })
  } catch (e) {
    throw new Error(c.bold(c.red(`Error running ${c.bold([bin, ...args].join(' '))} in ${c.underline(process.cwd)}:`)) + (e.stderr || e.stack || e.message))
  }
}

main().catch((err) => console.error(err))
