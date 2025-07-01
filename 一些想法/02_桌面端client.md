<h1 align="center" id="桌面端client">桌面端client</h1>

**概要：** 我想实现个桌面端 client。

[**GitHub 仓库地址**](https://github.com/pengpen1/agent-desk)

## agent-desk

- 支持 AG-UI 协议

- 支持 MCP 协议

- 支持人机交互

- 支持 Function Call

## AG-UI 协议

由 copilotkit 发起的，专注构建开放、轻量级、基于事件的 Agent-用户交互（Agent-User Interaction）标准化协议，其核心目标是标准化 AI Agent 连接到前端应用的方式。

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/agui.png)

关键设计原则包括：

- **事件驱动：**在 Agent 执行过程中，Agent 后端会发出符合 AG-UI 定义的 16 种标准事件类型之一的事件。前端应用根据这些事件进行响应。

- **简单的输入机制：**Agent 后端可以接受几种简单的、与 AG-UI 兼容的输入作为参数。

- **灵活的中间件层：**AG-UI 包含一个中间件层，旨在确保在不同事件传输环境下（如 SSE, WebSockets, webhooks 等）的兼容性，并允许宽松的事件格式匹配，以支持广泛的 Agent 和应用互操作性。

交互功能：

- **💬Agentic Chat 实时流式传输：**支持流畅的对话式交互。

- **🔄 双向状态同步：**确保聊天内外状态的一致性。

- **🧩 生成式 UI 和结构化消息（支持增量流）：**Agent 可以不仅仅返回文本，还能驱动前端生成动态 UI 组件。

- **🧠 实时上下文丰富：**动态地为 Agent 提供交互所需的上下文信息。

- **🛠️ 前端工具调用 (Tool Calls)：**允许 Agent 调用在前端定义的工具或函数。

- **🧑‍💻 人机协作 (Human-in-the-loop / Human-on-the-loop)：**支持人类用户在 Agent 执行过程中进行干预或协作。

## 步骤

丝滑小连招

```shell
git clone https://github.com/jinhuaxiao/mcp-client.git agent-desk & cd agent-desk & cursor .

git branch -M main
git remote add origin git@github.com:pengpen1/agent-desk.git
git push -u origin main
```
