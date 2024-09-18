import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replaceKeywordPlugin from './replaceKeywordPlugin.js'
import { envParse } from 'vite-plugin-env-parse'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), replaceKeywordPlugin(), envParse()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://www.ggapi.cn/api', //跨域地址
        changeOrigin: true, //支持跨域
        rewrite: (path) => path.replace(/^\/api/, '') //重写路径,替换/api
      }
    }
  }
})
