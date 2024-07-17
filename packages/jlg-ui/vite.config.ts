import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';
import dts from 'vite-plugin-dts';
import svgLoader from 'vite-svg-loader';
import ElementPlus from 'unplugin-element-plus/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		DefineOptions(),
		AutoImport({
			imports: ['vue'],
			dirs: [],
			resolvers: [ElementPlusResolver()],
			dts: 'auto-imports.d.ts',
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
		}),
		dts({
			// 读取tsconfig.json include字段
			tsconfigPath: 'tsconfig.node.json',
		}),
		ElementPlus({}),
		svgLoader(),
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'packages/index.ts'),
			name: 'jlg-ui',
			fileName: (format) => `jlg-ui.${format}.js`,
		},
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ['vue'],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			'@pac': resolve(__dirname, 'packages'),
		},
		// 导入时忽略的后缀名
		extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
	},
	server: {
		port: 10100,
		host: '0.0.0.0',
	},
});
