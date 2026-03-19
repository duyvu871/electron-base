import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    envDir: resolve('.'),
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@shared': resolve('src/shared'),
        '@generated': resolve('src/generated')
      }
    },
    build: {
      rollupOptions: {
        external: []
      }
    }
  },
  preload: {
    envDir: resolve('.'),
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    envDir: resolve('.'),
    assetsInclude: 'src/renderer/assets/**',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
        '@generated': resolve('src/generated'),
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
