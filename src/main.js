// 导入样式
import 'docsify/lib/themes/vue.css'

// 导入脚本
import 'docsify/lib/docsify.min.js'
import 'docsify/lib/plugins/zoom-image.min.js'
import 'docsify/lib/plugins/search.min.js'
import 'mermaid/dist/mermaid.min.js'
import 'docsify-pagination/dist/docsify-pagination.min.js'

// 配置 docsify
window.$docsify = {
  name: "<div id='docs-name'>docs-coderpeng<div>",
  nameLink: "/",
  nativeEmoji: false,
  loadSidebar: true,
  loadNavbar: false,
  subMaxLevel: 2,
  auto2top: true,
  autoHeader: false,
  homepage: "home.html",
  coverpage: true,
  themeColor: "#42b983",
  search: {
    maxAge: 86400000,
    paths: "auto",
    placeholder: "Type to search",
    noData: "No Results!",
    depth: 5,
    hideOtherSidebarContent: true,
  },
  breadcrumb: {
    showHome: true,
    homeText: "首页",
    separator: " &rsaquo; ",
    casing: "capitalize",
    linkColor: "var(--theme-color, #42b983)",
    size: "normal",
  },
  notFoundPage: "my404.md",
  pagination: {
    previousText: "上一章节",
    nextText: "下一章节",
    crossChapter: true,
    crossChapterText: true,
  },
  mermaidConfig: {
    theme: "dark",
  },
  markdown: {
    renderer: {
      code: function (code, lang) {
        var html = "";
        if (
          code.match(/^sequenceDiagram/) ||
          code.match(/^graph/) ||
          code.match(/^gantt/)
        ) {
          html = '<div class="mermaid">' + code + "</div>";
        }
        var hl = Prism.highlight(
          code,
          Prism.languages[lang] || Prism.languages.markup
        );
        return (
          html +
          '<pre v-pre data-lang="' +
          lang +
          '"><code class="lang-' +
          lang +
          '">' +
          hl +
          "</code></pre>"
        );
      },
    },
  },
  executeScript: true,
  plugins: [
    function (hook, vm) {
      hook.doneEach(function () {
        const scriptLoaders =
          document.querySelectorAll("[data-load-script]");
        scriptLoaders.forEach((loader) => {
          const scriptSrc = loader.dataset.loadScript;
          const scriptId =
            "script-" + scriptSrc.replace(/[^a-zA-Z0-9]/g, "");
          if (scriptSrc) {
            var script = document.createElement("script");
            script.id = scriptId;
            script.src = scriptSrc;
            document.body.appendChild(script);
          }
        });
      });
    },
    function (hook, vm) {
      hook.ready(function () {
        if (window.mermaid) {
          mermaid.initialize({ startOnLoad: false });
        }
      });
      hook.doneEach(function () {
        if (window.mermaid) {
          mermaid.init(undefined, ".mermaid");
        }
      });
    },
  ],
};

// 动态加载本地脚本
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// 加载本地脚本文件
loadScript('./_media/scripts/click-effect2.js').catch(err => {
  console.log('click-effect2.js 加载失败，但不影响主要功能');
}); 