import fs from 'fs';
import path from 'path';
import { defineConfig, npx, serial, task, Task } from '@rainspell/roy';
import { eslint } from '@rainspell/roy-plugin-typescript';

/**
 * TBD
 */
function getRootDirectoryNames(): string[] {
  const dirs = [];
  const records = fs.readdirSync('src');

  for (const record of records) {
    const absolutePath = path.resolve('src', record);
    if (fs.lstatSync(absolutePath).isDirectory()) {
      dirs.push(record);
    }
  }

  return dirs.sort((d1, d2) => d1.localeCompare(d2));
}

/**
 * TBD
 */
export function updateTsconfigPaths(): Task {
  return task('update-tsconfig-paths', function() {
    const tsconfig = require('./tsconfig.json');
    const currentTsconfigStr: string = JSON.stringify(tsconfig, undefined, 2);
    const rootDirectoryNames: string[] = getRootDirectoryNames();

    tsconfig.compilerOptions.paths = {};

    for (const rootDir of rootDirectoryNames) {
      const relativePath: string = path.join('src', rootDir).replace(/\\/g, '/');

      // Skip root directories that does not contain an `index.ts` file
      if (rootDir !== 'assets' && !fs.existsSync(path.join(relativePath, 'index.ts'))) {
        continue;
      }

      tsconfig.compilerOptions.paths[`@${rootDir}`] = rootDir === 'assets'
        ? [`${relativePath}/*`]
        : [`${relativePath}/index.ts`];
    }

    const tsconfigStr: string = JSON.stringify(tsconfig, undefined, 2);

    if (tsconfigStr !== currentTsconfigStr) {
      this.log.verbose(`Updating tsconfig.json paths`);
      fs.writeFileSync('tsconfig.json', tsconfigStr, { encoding: 'utf8' });
    }
    else {
      this.log.verbose(`tsconfig.json paths are up-to-date`);
    }

    this.complete();
  });
}

/**
 * roy config.
 */
export default defineConfig({
  tasks: {
    'develop': serial(
      updateTsconfigPaths(),
      npx('vite', ['--host'])
    ),
    'build': serial(
      updateTsconfigPaths(),
      npx('vite', ['build', '--logLevel', 'error'])
    ),
    'lint': eslint(),
    'lint:fix': eslint({ fix: true })
  }
});