import { defineConfig } from 'vitest/config';
import packageJson from './package.json';

/**
 * https://vitest.zhcndoc.com/guide/
 */
export default defineConfig({
  test: {
    name: packageJson.name,
    exclude: ['./benchmarks/**/*', '.yarn/**/*'],
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*'],
      exclude: ['src/_internal/**/*', 'src/locale/**/*', 'src/**/*.spec.ts'],
    },
    watch: false,
    deps: {
      optimizer: {
        ssr: {
          enabled: true,
          include: ['@elinzy/e-utils'],
        },
      },
    },
  },
});
