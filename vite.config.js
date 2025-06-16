import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        // 复制所有 .md 文件
        { src: '*.md', dest: '.' },
        { src: '**/*.md', dest: '.' },
        // 复制 HTML 文件（排除index.html和模板文件）
        { src: '*.html', dest: '.', ignore: ['index.html', 'index-*.html'] },
        // 复制媒体文件
        { src: '_media/**/*', dest: '_media' },
        // 复制其他必要文件
        { src: '.nojekyll', dest: '.' },
        { src: 'favicon.ico', dest: '.' },
        { src: '_sidebar.md', dest: '.' },
        { src: '_navbar.md', dest: '.' },
        { src: '_coverpage.md', dest: '.' }
      ]
    })
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