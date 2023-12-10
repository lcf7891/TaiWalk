import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(
      {
        template: { // 解決使用 swiper 元件出現錯誤訊息
          compilerOptions: {
            isCustomElement: (tag) => [
              'swiper-container',
              'swiper-slide'
            ].includes(tag),
          }
        }
      }
    ),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    watch: {
      usePolling: true,   // 修復 HMR 更新失效
    },
  }
})
