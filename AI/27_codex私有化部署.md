<h1 align="center" id="prompt收集">codex私有化部署</h1>

**概要：** 本章节主包将分享下私有化部署codex的方法。



**1.获取API Key**

```
sk-b6bHYUlKJ8DBCJABLkeP6XFT8zOMzf6JywOHBvO1jlzQ80Sy
```



**2.设置系统环境变量,变量名为 `AGENT_ROUTER_TOKEN` ,值为APIkey（如果是官方APIkey，直接在扩展/cli那使用即可，无需设置变量）**

```
Windows系统，win+s 搜索，环境变量，编辑用户环境变量
```



**3.Windows创建文件夹：C:\Users\你Windows用户名\.codex**

在文件夹里创建文件：config.toml

```toml
model = "gpt-5"
model_provider = "openai-chat-completions"
preferred_auth_method = "apikey"


[model_providers.openai-chat-completions]
name = "OpenAI using Chat Completions"
base_url = "https://agentrouter.org/v1"
env_key = "AGENT_ROUTER_TOKEN"
wire_api = "chat"
query_params = {}
```

另一个文件 auth.json

```json
{
 "OPENAI_API_KEY":"第2步申请的api令牌"
}
```



**4.安装  codex 扩展 或者 cli**

```shell
npm install -g @openai/codex
```



**5.运行codex**

cli的在命令行输入codex

/model 设置模型

/quit 退出codex

要他执行系统命令可以，Run: commands



扩展的类似于其他ai编辑器，无需多言

常用命令如下：

| 命令       | 中文说明                       |
| ---------- | ------------------------------ |
| /model     | 切换模型和推理等级             |
| /approvals | 设置授权模式                   |
| /new       | 开启新的会话                   |
| /init      | 初始化 **AGENTS.md** 指导文件  |
| /compact   | 上下文压缩，避免触发上下文限制 |
| /diff      | 显示 git 差异                  |
| /mention   | 引用某个文件                   |
| /status    | 显示当前会话配置和 Token 用量  |

#### 
