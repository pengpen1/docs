const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// CDN 资源映射
const cdnResources = {
  'docsify.min.js': 'https://cdn.jsdelivr.net/npm/docsify@4/lib/docsify.min.js',
  'vue.css': 'https://cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css',
  'zoom-image.min.js': 'https://cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js',
  'mermaid.min.js': 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js',
  'docsify-mermaid.js': 'https://cdn.jsdelivr.net/npm/docsify-mermaid@latest/dist/docsify-mermaid.js',
  'search.min.js': 'https://cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js',
  'docsify-pagination.min.js': 'https://unpkg.com/docsify-pagination/dist/docsify-pagination.min.js',
  'docsify-plantuml.min.js': 'https://unpkg.com/docsify-plantuml/dist/docsify-plantuml.min.js'
};

// 下载文件
async function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        let data = '';
        response.on('data', chunk => data += chunk);
        response.on('end', async () => {
          try {
            await fs.writeFile(filepath, data);
            console.log(`✅ 下载完成: ${filepath}`);
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}: ${url}`));
      }
    }).on('error', reject);
  });
}

// 创建本地依赖目录并下载资源
async function buildLocal() {
  try {
    // 创建 assets 目录
    const assetsDir = path.join(__dirname, 'assets');
    await fs.mkdir(assetsDir, { recursive: true });
    
    console.log('📦 开始下载 CDN 资源...');
    
    // 并行下载所有资源
    const downloadPromises = Object.entries(cdnResources).map(([filename, url]) => {
      const filepath = path.join(assetsDir, filename);
      return downloadFile(url, filepath);
    });
    
    await Promise.all(downloadPromises);
    
    console.log('🎉 所有资源下载完成！');
    console.log('📁 资源已保存到 assets/ 目录');
    console.log('💡 请将原 index.html 备份后，将 index-local.html 重命名为 index.html');
    
  } catch (error) {
    console.error('❌ 构建失败:', error.message);
  }
}

buildLocal(); 