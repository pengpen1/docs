<h1 align="center" id="MCP之QQ邮箱">MCP之QQ邮箱</h1>

**概要：** 本章节将介绍主啵是如何实现用 MCP 服务器来实现 LLM 发送 QQ 邮箱的，代码来自于[快速手搓一个大模型 mcp 服务](https://www.bilibili.com/video/BV14WZqYNEXb/?share_source=copy_web&vd_source=893cb317da62ac44f0b67020a2c1ebe4)，本期码农我们选择 cursor。

先丝滑的打开文件夹

```shell
mkdir first-mcp-server & cd first-mcp-server & cursor .
```

再指挥我们的`码农`干活，复制下面代码给 chart：

```txt
# 安装mcp sdk依赖
npm install @modelcontextprotocol/sdk @anthropic-ai/sdk dotenv
npm install -D typescript @types/node
npm install --save nodemailer @types/nodemailer

# 创建 TypeScript 配置
npx tsc --init

# 创建必要的文件
mkdir src
touch src/index.ts
加入如下代码：
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import * as nodemailer from "nodemailer";
const server = new Server({
    name: "email-mcp-server",
    version: "0.0.1",
}, {
    capabilities: {
        tools: {},
    },
});
// 环境变量配置
const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.qq.com";
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || "465");
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
if (!EMAIL_USER || !EMAIL_PASS) {
    console.error("EMAIL_USER or EMAIL_PASS environment variable is not set");
    process.exit(1);
}
// 创建邮件传输器
const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});
// List available tools 一定要有，否则无法接入mcp-client
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "send-email",
                description: "发送邮件，支持HTML内容、表格和附件",
                inputSchema: {
                    type: "object",
                    properties: {
                        to: {
                            type: "string",
                            description: "收件人邮箱，多个收件人用逗号分隔",
                        },
                        cc: {
                            type: "string",
                            description: "抄送邮箱，多个抄送用逗号分隔",
                        },
                        subject: {
                            type: "string",
                            description: "邮件主题",
                        },
                        html: {
                            type: "string",
                            description: "邮件HTML内容，支持表格等HTML标签",
                        },
                        attachments: {
                            type: "array",
                            description: "附件列表",
                            items: {
                                type: "object",
                                properties: {
                                    filename: { type: "string" },
                                    path: { type: "string" },
                                },
                            },
                        },
                    },
                    required: ["to", "subject", "html"],
                },
            },
        ],
    };
});
// 处理发送邮件请求
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
        if (!request.params.name || !request.params.arguments) {
            return {
                success: false,
                error: "Tool name and arguments are required",
            };
        }
        if (request.params.name === "send-email") {
            const args = request.params.arguments;
            if (!args.to || !args.subject || !args.html) {
                return {
                    success: false,
                    error: "Required fields missing: to, subject, and html are required",
                };
            }
            const mailOptions = {
                from: EMAIL_USER,
                to: args.to,
                cc: args.cc,
                subject: args.subject,
                html: args.html,
                attachments: args.attachments,
            };
            const info = await transporter.sendMail(mailOptions);
            return {
                success: true,
                data: {},
            };
        }
        return {
            success: false,
            error: `Unknown tool: ${request.params.name}`,
        };
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error occurred",
        };
    }
});
// 启动服务
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("First MCP Server running on stdio");
}
// 异常捕获
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});

```

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/20250519153305040.png)

继续：

```txt
tsconfig.json改为如下

{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
package.json加入如下代码

{
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node build/index.js"
  }
}

最后执行：
npm run build
```

搞定，不到两分钟，就完成了一个 MCP 服务器，当然这只是写好代码，要真正使用，还得：

- 手动去开启邮箱的 smtp 服务获取 EMAIL_PASS
- 修改参数
  ```ts
  // 示例：
  EMAIL_HOST=smtp.qq.com
  EMAIL_PORT=465
  EMAIL_USER=88888888@qq.com
  EMAIL_PASS=lrjlmbyslnxxxx
  ```
- 选择一个支持 MCP 的 Client 和 LLM
