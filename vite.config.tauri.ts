/// <reference types="vite/client" />
/// <reference types="./src/vite-env.d.ts" />

import path from 'node:path'
import { UserConfig, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
// @ts-ignor
export default defineConfig(({ command }) => {
  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  return {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        '@shared': path.join(__dirname, 'shared')
      },
    },
    plugins: [react()],
    // prevent vite from obscuring rust errors
    clearScreen: false,
    // Tauri expects a fixed port, fail if that port is not available
    // server: {
    //   strictPort: true,
    // },
    // to access the Tauri environment variables set by the CLI with information about the current target
    envPrefix: ['VITE_', 'TAURI_PLATFORM', 'TAURI_ARCH', 'TAURI_FAMILY', 'TAURI_PLATFORM_VERSION', 'TAURI_PLATFORM_TYPE', 'TAURI_DEBUG'],
    build: {
      // Tauri uses Chromium on Windows and WebKit on macOS and Linux
      target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
      // don't minify for debug builds
      minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
      // 为调试构建生成源代码映射 (sourcemap)
      sourcemap: !!process.env.TAURI_DEBUG,
    },

    server: process.env.VSCODE_DEBUG ? (() => {
      const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
      return {
        host: url.hostname,
        port: +url.port,
      }
    })() : undefined,
  }
})