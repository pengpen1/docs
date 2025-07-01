<h1 align="center" id="Gemini CLI初体验">Gemini CLI初体验</h1>

**概要：** 本章节主包将分享下自己使用 Gemini CLI之后的感受。

>  100 万个 token 上下文长度，据说平替 `claude code`、`codex cli`



## 安装

安装前，请确保node版本最好新一点，不然会因为缺失依赖而报错

```
npm install -g @google/gemini-cli
```

```
gemini
```



## 查看帮助

```
/help
```

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/docs/20250630175018076.png)

最常用的是@符号引用特定文件或目录以及输入!即可进入运行shell命令的模式，按esc回答agent模式，其他常用命令如下：

- `/docs` - 在浏览器中打开完整的 Gemini CLI 文档

- `/clear` - 清除屏幕和对话历史

- `/theme` - 更改主题

- `/auth` - 更改认证方法

- `/editor` - 设置外部编辑器偏好

- `/stats` - 检查会话统计信息

- `/mcp` - 列出已配置的 MCP 服务器和工具

- `/memory` - 管理内存。

- `/tools` - 列出可用的 Gemini CLI 工具

- `/about` - 显示版本信息

- `/bug` - 提交错误报告

- `/chat` - 管理对话历史

- `/quit` - 退出命令行界面

- `/compress` - 通过将上下文替换为摘要来压缩上下文

  



## 测试

分析/重构/债务评估

```
@项目路径/ 分析这个项目的整体架构，包括：
- 主要模块和它们的职责
- 数据流向和依赖关系
- 设计模式的使用
- 潜在的架构问题


重构整个项目以支持新的数据库抽象层：
  1. 识别所有数据库相关的代码
  2. 创建统一的数据访问接口
  3. 生成迁移计划和时间表

评估这个代码库的技术债务：
  - 代码重复度分析
  - 过时依赖识别
  - 性能瓶颈检测
  - 安全漏洞扫描
```



## 安装mcp

```
cd ~.gemini
nano settings.json
```

或者直接找到这个json文件，打开然后编辑，测试的mcp依然是我们的老朋友context7

```
{
  "theme": "Default",
  "selectedAuthType": "oauth-personal",
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```



## 规则

```
# 刷新
/memory refresh

# 显示当前上下文
/memory show

# 增加
/memory add
```

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/docs/20250630183553165.png)



## 配合api key

1. 在 [Google AI Studio](https://aistudio.google.com/apikey) 中获取 API Key。

2. 设置环境变量：

   系统设置中搜索“环境变量”》修改“用户变量”（适用于当前用户）或“系统变量”（适用于所有用户，谨慎使用）》创建变量并添加 `export GEMINI_API_KEY=YOUR_API_KEY`》应用更改

```javascript
export GEMINI_API_KEY="YOUR_API_KEY"
```

OR当前项目根目录新建 .env 文件：

```
GEMINI_API_KEY="YOUR_API_KEY"
```



接口调用教程：https://apifox.com/apiskills/how-to-use-gemini-api/



## 配置优化

```
# 企业级配置文件
export GEMINI_MODEL="gemini-2.5-pro"
export GEMINI_TEMPERATURE="0.3"
export GEMINI_MAX_TOKENS="8192"
export MCP_SERVER_TIMEOUT="30000"
```



## 推荐工作流

1. **计划优先**：复杂任务先让AI制定详细计划
2. **分层配置**：创建多个层次的 `.gemini.md` 文件
3. **避免 YOLO 模式**：倾向于拦截并重新提示
4. **代码测试提交**：确保代码质量



## 总结

我觉得还是很不错的，挺聪明的，而且最重要的是免费！

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/docs/20250630184013454.png)
