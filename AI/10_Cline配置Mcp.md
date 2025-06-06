<style>
/* Reuse styles or add specific styles */
.ethical-dilemma {
  border-left: 4px solid #f0ad4e; /* Orange border */
  padding: 1rem;
  margin: 1.5rem 0;
  background-color: #fdf7e9;
}
.safety-challenge {
  border-left: 4px solid #d9534f; /* Red border */
  padding: 1rem;
  margin: 1.5rem 0;
  background-color: #fdeeec;
}
.responsible-ai-principle {
  border-left: 4px solid #5cb85c; /* Green border */
  padding: 1rem;
  margin: 1.5rem 0;
  background-color: #eef7ee;
}
</style>
<h1 align="center" id="Cline配置MCP服务器">Cline配置MCP服务器</h1>

**概要：** 本章我们将在cline上安装MCP服务。



## 准备工作

本次教程，准备使用pip安装相关服务器，如果想用[uv](https://docs.astral.sh/uv/)可以前往[modelcontextprotocol](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch)查看相关教程。

首先确保您已安装node.js（增加网页处理能力），python（Python 2.7.9+ 和 Python 3.4+ 的官方安装包会附带 `pip`）。

```
// 验证是否安装成功
pip --version
```



## Fetch MCP Server

提供网页内容提取功能的模型上下文协议服务器。此服务器支持检索和处理网页内容，并将 HTML 转换为 Markdown 格式，以便于使用。



1.通过 pip 安装 `mcp-server-fetch` ：

```python
pip install mcp-server-fetch
```



2.打开cline的mcp配置文件：

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/line-1.png)

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/cline-2.png)



3.配置Fetch服务器：

```json
    "fetch": {
      "command": "python",
      "args": ["-m", "mcp_server_fetch"]
    }

// 完整配置应该长这样
{
  "mcpServers": {
    "fetch": {
      "command": "python",
      "args": ["-m", "mcp_server_fetch"]
    }
  }
}
```



4.进行测试：

测试前，请确保你给了cline调用mcp服务的权限

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/line-5.png)

这里我让ai获取并总结我的网站

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/cline-3.png)

ok，来看看结果吧

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/cline-4.png)

个人觉得，还行



## 浏览器自动化服务

1.安装[mcp-playwright](https://github.com/executeautomation/mcp-playwright)

```shell
npm install -g @executeautomation/playwright-mcp-server
```

2.配置

```shell
// mac 电脑配置如下
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    }
  }
}

// windows配置
  "mcpServers": {
    "playwright": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@executeautomation/playwright-mcp-server"]
    }
  }
```

3.测试

我让它打开github并填入123

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250418171101410.png)

结果还是挺满意的



扩展：我也测试了[playwright-mcp](https://github.com/microsoft/playwright-mcp)这个服务器，[点击在vscode中安装](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522playwright%2522%252C%2522command%2522%253A%2522npx%2522%252C%2522args%2522%253A%255B%2522-y%2522%252C%2522%2540playwright%252Fmcp%2540latest%2522%255D%257D)，安装完它自动配置，vscode自带的copilot就能使用这MCP服务了。效果如下：

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/coploit.png)



## 扩展

**npx不是执行命令的吗？为什么还能用于安装mcp服务器？**

大家熟知的npx的作用之一就是帮助我们简对项目内部(*node_modules*)安装的模块的调用:

```
例如：
./node_modules/.bin/mocha -v

npx简化:
npx mocha -v
```

`npx` 还有一个重要的特性：**当尝试执行一个本地尚未安装的包时，`npx` 会先将这个包（及其依赖）下载到一个临时的位置，然后执行它，执行完毕后通常不会将包保留在全局或项目中（除非明确指定了安装）。**

例如：

`npx @agentdeskai/browser-tools-mcp@latest`:

- `npx @agentdeskai/browser-tools-mcp@latest` 首先检查系统中（包括当前项目和全局环境）是否已经安装了 `@agentdeskai/browser-tools-mcp` 这个包。
- 如果没找到，它会提示你是否需要安装（"Need to install the following packages: ... Ok to proceed? (y)"）。
- 你输入 `y` 确认后，`npx` 就会**临时下载**并安装 `@agentdeskai/browser-tools-mcp` 包及其依赖项。
- 下载完成后，`npx` 会**执行**该包预设的命令，然后运行这个包里预定义的启动命令，从而启动服务器。



**为什么不用 `npm install`?**

因为我们的主要目的是提供一个可执行文件或服务，而不是作为另一个项目的编程依赖。
