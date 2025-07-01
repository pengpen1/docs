import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: [
            'AI',
            'UI设计',
            '一些想法',
            '其他',
            '前端',
            '后端',
            '学好英语走天下',
            '工具',
            '爬虫',
            '爱生活爱自己',
            '算法',
            '设计模式',
            '_media',
            '*.md',
            '*.html',
            'favicon.ico',
          ],
          dest: '.',
          // vite build会清空dist目录，所以要忽略index.html
          ignore: ['index.html'],
        },
      ],
    }),
  ],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'public/index.html'
    },
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      allow: ['..']
    }
  }
}) 