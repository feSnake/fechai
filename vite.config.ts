import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import replaceKeywordPlugin from './replaceKeywordPlugin.js'
import { envParse } from 'vite-plugin-env-parse'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // replaceKeywordPlugin(),
    envParse(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        // target: 'https://api.coze.cn/v1', //跨域地址
        // target: 'https://api.coze.cn/v3', //跨域地址
        // target: 'https://be.fechai.com/', //跨域地址
        target: 'http://localhost:3000/', //跨域地址
        changeOrigin: true, //支持跨域
        rewrite: (path) => path.replace(/^\/api/, '') //重写路径,替换/api
      }
    }
  }
})
