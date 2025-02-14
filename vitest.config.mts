// Imports
import {defineConfig} from 'vitest/config';
import {resolve} from 'node:path';
import packageJson from './package.json';

/**
 * Configuration options
 * https://vitest.zhcndoc.com/guide/
 */
export default defineConfig({
    test: {
        // 为测试项目或 Vitest 进程分配一个自定义名称
        // https://vitest.zhcndoc.com/config/#name
        name: packageJson.name,

        // 项目的根目录
        // https://vitest.zhcndoc.com/config/#root
        root: resolve(__dirname),

        // 匹配包含测试文件的 glob 规则
        // https://vitest.zhcndoc.com/config/#include
        include: [
            '**/*.{test,spec}.?(c|m)[jt]s?(x)'
        ],

        // 匹配排除测试文件的 glob 规则
        // https://vitest.zhcndoc.com/config/#exclude
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/.{idea,git,cache,output,temp}/**',
            '**/{rollup,vite,vitest,jest,babel,eslint,prettier}.config.*',
        ],

        // 测试覆盖率
        // https://vitest.zhcndoc.com/config/#coverage
        coverage: {
            provider: 'istanbul',
            include: ['src/**/*'],
            exclude: ['src/_internal/**/*', 'src/locale/**/*', 'src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
        },

        // 启动监听模式
        // https://vitest.zhcndoc.com/config/#watch
        watch: false,

        // 处理依赖关系解析
        // https://vitest.zhcndoc.com/config/#deps
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
