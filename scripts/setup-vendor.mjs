/**
 * USSYSITE5 // VENDOR SETUP SCRIPT
 *
 * Ensures `js/vendor/three/` contains Three.js r186 (`0.186.0`) build and post-processing addons.
 * Run via `npm run setup:vendor`.
 */

import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const threeCoreFile = join(rootDir, 'js/vendor/three/build/three.module.js');

if (existsSync(threeCoreFile)) {
  console.log('[setup:vendor] Three.js r186 vendor files already present in js/vendor/three/.');
  process.exit(0);
}

console.log('[setup:vendor] Downloading Three.js 0.186.0 tarball and extracting vendor modules...');
execSync(
  `mkdir -p js/vendor/three/build js/vendor/three/addons/postprocessing js/vendor/three/addons/shaders js/vendor/three/addons/lines && ` +
  `npm pack three@0.186.0 --silent && ` +
  `tar -xzf three-0.186.0.tgz && ` +
  `cp package/build/three.module.js package/build/three.core.js js/vendor/three/build/ && ` +
  `cp -r package/examples/jsm/* js/vendor/three/addons/ && ` +
  `rm -rf package three-0.186.0.tgz`,
  { cwd: rootDir, stdio: 'inherit' }
);
console.log('[setup:vendor] Complete.');
