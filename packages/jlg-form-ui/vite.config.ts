import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'path';
import dts from 'vite-plugin-dts';
import ElementPlus from 'unplugin-element-plus/vite';
import SvgLoader from 'vite-svg-loader'; // Vite插件，用于将svg文件转为组件

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		DefineOptions(),
		AutoImport({
			imports: ['vue'],
			dirs: [],
			dts: 'auto-imports.d.ts',
		}),
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue', 'packages/**/*.ts', 'packages/**/*.vue', 'packages/*.ts', 'packages/*.vue'],
		}),
		dts({
			// 读取tsconfig.json include字段
			tsconfigPath: 'tsconfig.node.json',
		}),
		ElementPlus({}),
		SvgLoader({
			// 将svg文件转为组件
			defaultImport: 'component', // svg组件名称
		}),
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'packages/index.ts'),
			name: 'jlg-form-ui',
			fileName: (format) => `jlg-form-ui.${format}.js`,
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
