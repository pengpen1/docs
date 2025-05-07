const fs = require("fs");
const path = require("path");

/**
 * 计算指定目录下 .md 文件的数量，支持排除特定文件。
 * @param {string} dirPath - 要扫描的目录路径 (可以是相对路径或绝对路径)。
 * @param {string[]} excludeFiles - 要排除的文件名列表 (例如 ['_sidebar.md', 'index.md'])。
 * @returns {number} - .md 文件的数量。
 */
function countMdFiles(dirPath, excludeFiles = ["_sidebar.md", "index.md"]) {
  try {
    // 将相对路径解析为绝对路径 (相对于脚本执行的当前工作目录)
    // Docsify 项目的根目录通常是脚本执行的目录
    const absoluteDirPath = path.resolve(process.cwd(), dirPath);

    if (
      !fs.existsSync(absoluteDirPath) ||
      !fs.lstatSync(absoluteDirPath).isDirectory()
    ) {
      console.warn(
        `警告: 目录 "${dirPath}" (解析为 "${absoluteDirPath}") 不存在或不是一个目录。返回 0。`
      );
      return 0;
    }

    const files = fs.readdirSync(absoluteDirPath, { withFileTypes: true });
    let count = 0;

    for (const file of files) {
      const filePath = path.join(absoluteDirPath, file.name);
      if (file.isDirectory()) {
        // 如果需要递归计数子目录，可以在这里添加逻辑
        // 当前需求是只计数给定目录下的文件，所以忽略子目录中的 .md 文件
        // 如果子目录也算作一个独立的文章，则需要调整这里的逻辑或在 categories 中单独列出子目录
      } else if (file.isFile() && file.name.endsWith(".md")) {
        if (!excludeFiles.includes(file.name)) {
          count++;
        }
      }
    }
    return count;
  } catch (error) {
    console.error(`错误: 扫描目录 "${dirPath}" 时发生错误:`, error.message);
    return 0; // 发生错误时返回0
  }
}

/**
 * 递归计算指定目录下 .md 文件的数量，支持排除特定文件和目录。
 * @param {string} dirPath - 要扫描的目录路径 (可以是相对路径或绝对路径)。
 * @param {string[]} excludeItems - 要排除的文件名或目录名列表 (例如 ['_sidebar.md', 'index.md', 'node_modules'])。
 * @returns {number} - .md 文件的数量。
 */
function countMdFilesRecursive(
  dirPath,
  excludeItems = ["_sidebar.md", "index.md"]
) {
  try {
    // dirPath拼接在 process.cwd() 返回 (Node.js 进程当前的工作目录)的绝对路径上
    const absoluteDirPath = path.resolve(process.cwd(), dirPath);

    if (
      !fs.existsSync(absoluteDirPath) ||
      !fs.lstatSync(absoluteDirPath).isDirectory()
    ) {
      console.warn(
        `警告: 目录 "${dirPath}" (解析为 "${absoluteDirPath}") 不存在或不是一个目录。返回 0。`
      );
      return 0;
    }

    const items = fs.readdirSync(absoluteDirPath, { withFileTypes: true });
    let count = 0;

    for (const item of items) {
      if (excludeItems.includes(item.name)) {
        continue; // 跳过排除项
      }

      const itemPath = path.join(absoluteDirPath, item.name);
      if (item.isDirectory()) {
        count += countMdFilesRecursive(itemPath, excludeItems); // 递归进入子目录
      } else if (item.isFile() && item.name.endsWith(".md")) {
        count++;
      }
    }
    return count;
  } catch (error) {
    console.error(`错误: 递归扫描目录 "${dirPath}" 时发生错误:`, error.message);
    return 0;
  }
}

// 预设的分类路径 (相对于项目根目录 e:/projects/document/docs)
// 注意：这里的路径是相对于项目根目录的，脚本执行时 process.cwd() 应该就是项目根目录
const categories = {
  frontend: "前端",
  ai: "AI",
  backend: "后端",
  algorithm: "算法",
  crawler: "爬虫",
  designpattern: "设计模式",
  tool: "工具",
  uidesign: "UI设计",
  thoughts: "一些想法",
  other: "其他",
};

// 需要排除的文件名，对于所有分类都适用
const globalExcludeFiles = ["_sidebar.md", "index.md"];

function generateArticleCounts() {
  console.log("正在统计文章数量...\n");
  const articleCounts = {};
  let totalArticles = 0;

  for (const key in categories) {
    const categoryPath = categories[key]; // 路径就是中文名文件夹
    // 使用递归计数函数，并传入全局排除列表
    const count = countMdFilesRecursive(categoryPath, globalExcludeFiles);
    articleCounts[key] = count;
    totalArticles += count;
    console.log(`- ${categoryPath}: ${count} 篇文章`);
  }

  console.log("\n----------------------------------------");
  console.log(`总计: ${totalArticles} 篇文章`);
  console.log("----------------------------------------\n");
  console.log("格式化输出：\n");
  // 格式化输出，使其可以直接粘贴
  let outputString = "const articleCounts = {\n";
  for (const key in articleCounts) {
    outputString += `  ${key}: ${articleCounts[key]},\n`;
  }
  // 移除最后一个逗号
  if (Object.keys(articleCounts).length > 0) {
    outputString = outputString.slice(0, -2) + "\n";
  }
  outputString += "};";
  console.log(outputString);
  console.log("\n----------------------------------------");
  console.log("脚本执行完毕。");
}

// 执行主函数
generateArticleCounts();
