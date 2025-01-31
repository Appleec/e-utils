// rollup.config.mjs
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import esbuild, { minify } from 'rollup-plugin-esbuild'
import externals from 'rollup-plugin-node-externals'

// babel
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const usePreferConst = false; // Use "const" instead of "var"
const usePreserveModules = true; // `true` -> keep modules structure, `false` -> combine everything into a single file
const useStrict = true; // Use "strict"
const useThrowOnError = true; // On error throw and exception
const useSourceMap = false; // Generate source map files
const useEsbuild = true; // `true` -> use esbuild, `false` use tsc

// https://rollup.nodejs.cn/
export default [
    // .d.ts build
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.d.ts',
            format: 'es'
        },
        plugins: [externals(), dts()]
    },
    // CJS build
    {
        input: 'src/index.ts',
        output: {
            dir: 'dist/cjs',
            format: 'cjs',
            generatedCode: {
                constBindings: usePreferConst
            },
            preserveModules: usePreserveModules,
            strict: useStrict,
            entryFileNames: '[name].js', // .cjs
            sourcemap: useSourceMap
        },
        plugins: [
            resolve(),
            externals(),
            useEsbuild
                ? esbuild()
                : typescript({
                    noEmitOnError: useThrowOnError,
                    outDir: 'dist/cjs',
                    removeComments: true
                }),
            // NOTE: Babel转义，兼容性支持
            babel({
                presets: ['@babel/preset-env', "@babel/preset-typescript"],
                babelHelpers: "bundled",
                exclude:"node_modules/**",
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            }),
        ]
    },
    // ESM builds
    {
        input: 'src/index.ts',
        output: {
            dir: 'dist/esm',
            format: 'es',
            generatedCode: {
                constBindings: usePreferConst
            },
            preserveModules: usePreserveModules,
            strict: useStrict,
            entryFileNames: '[name].js', // .mjs
            sourcemap: useSourceMap
        },
        plugins: [
            externals(),
            useEsbuild
                ? esbuild()
                : typescript({
                    noEmitOnError: useThrowOnError,
                    outDir: 'dist/esm',
                    removeComments: true
                })
        ]
    },
    // CDN build
    {
        input: 'src/index.ts',
        output: [
            // iife
            {
                format: 'iife',
                generatedCode: {
                    constBindings: usePreferConst
                },
                preserveModules: false,
                strict: useStrict,
                file: 'cdn/eUtils.js',
                name: 'eUtils',
                sourcemap: false
            },
            {
                format: 'iife',
                generatedCode: {
                    constBindings: usePreferConst
                },
                preserveModules: false,
                strict: useStrict,
                file: 'cdn/eUtils.min.js',
                name: 'eUtils',
                sourcemap: false,
                plugins: [minify()]
            },
            // esm
            {
                format: 'es',
                generatedCode: {
                    constBindings: usePreferConst
                },
                preserveModules: false,
                strict: useStrict,
                file: 'cdn/eUtils.esm.js',
                sourcemap: false
            },
            {
                format: 'es',
                generatedCode: {
                    constBindings: usePreferConst
                },
                preserveModules: false,
                strict: useStrict,
                file: 'cdn/eUtils.esm.min.js',
                name: 'eUtils',
                sourcemap: false,
                plugins: [minify()]
            },
            // umd
            {
                format: 'umd',
                generatedCode: {
                    constBindings: usePreferConst
                },
                preserveModules: false,
                strict: useStrict,
                file: 'cdn/eUtils.umd.js',
                name: 'eUtils',
                sourcemap: false
            },
            {
                format: 'umd',
                generatedCode: {
                    constBindings: usePreferConst
                },
                preserveModules: false,
                strict: useStrict,
                file: 'cdn/eUtils.umd.min.js',
                name: 'eUtils',
                sourcemap: false,
                plugins: [minify()]
            }
        ],
        plugins: [
            resolve(),
            externals(),
            useEsbuild
                ? esbuild()
                : typescript({
                    noEmitOnError: useThrowOnError,
                    outDir: 'cdn',
                    removeComments: true
                }),
            // NOTE: Babel转义，兼容性支持
            babel({
                presets: ['@babel/preset-env', "@babel/preset-typescript"],
                babelHelpers: "bundled",
                exclude:"node_modules/**",
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            }),
        ]
    }
]
