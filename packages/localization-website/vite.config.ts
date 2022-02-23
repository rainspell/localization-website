import fs from 'fs';
import path from 'path';
import { defineConfig, ConfigEnv, UserConfigExport, Alias } from 'vite';
import vue from '@vitejs/plugin-vue';
import packageJson from './package.json';

/**
 * TBD
 */
function createAlias(): Alias[] {
  const alias: Alias[] = [];
  const records: string[] = fs.readdirSync('src');

  for (const record of records) {
    const absolutePath: string = path.resolve('src', record);

    if (!fs.lstatSync(absolutePath).isDirectory()) continue;
    if (record !== 'assets' && !fs.existsSync(path.join(absolutePath, 'index.ts'))) continue;

    console.log(`Create alias @${record}`);
    alias.push({
      find: `@${record}`,
      replacement: record === 'assets'
        ? path.join(absolutePath, '')
        : path.join(absolutePath, 'index.ts')
    });
  }

  return alias;
}

/**
 * Vite configuration.
 * 
 * @see https://vitejs.dev/config/
 */
export default function(env: ConfigEnv): UserConfigExport {
  return defineConfig({
    base: '/',
    resolve: {
      alias: createAlias()
    },
    build: {
      minify: false,
      sourcemap: false,
      rollupOptions: {
        output: {
          entryFileNames: 'js/[name].[format].js',
          chunkFileNames: 'js/[name].[format].js'
        }
      }
    },
    define: {
      APP_VERSION: JSON.stringify(packageJson.version)
    },
    plugins: [
      vue()
    ]
  });
}