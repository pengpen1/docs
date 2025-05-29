<h1 align="center" id="github冷知识">GitHub冷知识</h1>

**概要：** 分享一下我所知道的GitHub冷知识，希望对你有帮助。



###  GitHub API

GitHub其实提供了很多很有用的API，只不过没有公开，比如我们可以查一个仓库的创建时间，最近更新时间等等。



### 分类整理

**1. 用户 (User)**

- **current_user_url**: https://api.github.com/user
  - **作用**: 获取当前经过身份验证的用户的信息。
- **emails_url**: https://api.github.com/user/emails
  - **作用**: 列出当前经过身份验证的用户的电子邮件地址。
- **followers_url**: https://api.github.com/user/followers
  - **作用**: 列出当前经过身份验证的用户的关注者。
- **following_url**: https://api.github.com/user/following{/target}
  - **作用**: 列出当前经过身份验证的用户正在关注的人。如果提供了 {target} 用户名，则检查当前用户是否正在关注该目标用户。
- **keys_url**: https://api.github.com/user/keys
  - **作用**: 列出、添加或删除当前经过身份验证的用户的公钥（SSH keys）。
- **starred_url**: https://api.github.com/user/starred{/owner}{/repo}
  - **作用**: 列出当前经过身份验证的用户加星标（starred）的仓库。也可以用来检查或管理对特定仓库的星标状态。
- **user_url**: https://api.github.com/users/{user}
  - **作用**: 获取指定用户 {user} 的公开信息。
- **user_organizations_url**: https://api.github.com/user/orgs
  - **作用**: 列出当前经过身份验证的用户所属的组织。
- **user_repositories_url**: https://api.github.com/users/{user}/repos{?type,page,per_page,sort}
  - **作用**: 列出指定用户 {user} 的公开仓库。可以根据类型、分页、排序等参数进行过滤。
- **current_user_repositories_url**: https://api.github.com/user/repos{?type,page,per_page,sort}
  - **作用**: 列出当前经过身份验证的用户拥有的仓库（包括私有仓库）。可以根据类型、分页、排序等参数进行过滤。

**2. 仓库 (Repositories)**

- **repository_url**: https://api.github.com/repos/{user}/{repo}
  - **作用**: 获取指定仓库 {user}/{repo} 的详细信息。
- **organization_repositories_url**: https://api.github.com/orgs/{org}/repos{?type,page,per_page,sort}
  - **作用**: 列出指定组织 {org} 的仓库。可以根据类型、分页、排序等参数进行过滤。
- **topic_search_url**: https://api.github.com/search/topics?q={query}{&page,per_page}
  - **作用**: 根据关键词 {query} 搜索相关的仓库主题（Topics）。

**3. 搜索 (Search)**

- **code_search_url**: https://api.github.com/search/code?q={query}{&page,per_page,sort,order}
  - **作用**: 根据关键词 {query} 在 GitHub 的代码库中搜索代码。
- **commit_search_url**: https://api.github.com/search/commits?q={query}{&page,per_page,sort,order}
  - **作用**: 根据关键词 {query} 搜索提交（Commits）。
- **issue_search_url**: https://api.github.com/search/issues?q={query}{&page,per_page,sort,order}
  - **作用**: 根据关键词 {query} 搜索问题（Issues）和拉取请求（Pull Requests）。
- **label_search_url**: https://api.github.com/search/labels?q={query}&repository_id={repository_id}{&page,per_page}
  - **作用**: 在指定的仓库 {repository_id} 内根据关键词 {query} 搜索标签（Labels）。
- **repository_search_url**: https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}
  - **作用**: 根据关键词 {query} 搜索仓库。
- **user_search_url**: https://api.github.com/search/users?q={query}{&page,per_page,sort,order}
  - **作用**: 根据关键词 {query} 搜索用户。

**4. 组织 (Organizations)**

- **organization_url**: https://api.github.com/orgs/{org}
  - **作用**: 获取指定组织 {org} 的公开信息。
- **organization_teams_url**: https://api.github.com/orgs/{org}/teams
  - **作用**: 列出指定组织 {org} 下的团队。通常需要组织成员或管理员权限。

**5. Gists**

- **gists_url**: https://api.github.com/gists{/gist_id}
  - **作用**: 列出公开的 Gists、当前用户的 Gists（需认证）或获取/管理指定的 Gist {gist_id}。
- **public_gists_url**: https://api.github.com/gists/public
  - **作用**: 列出所有公开的 Gists。
- **starred_gists_url**: https://api.github.com/gists/starred
  - **作用**: 列出当前经过身份验证的用户加星标（starred）的 Gists。

**6. 认证与授权 (Authentication & Authorization)**

- **current_user_authorizations_html_url**: https://github.com/settings/connections/applications{/client_id}
  - **作用**: 指向用户 GitHub 设置中“授权的应用”页面的 URL 模板。这是一个网页链接，不是纯粹的 API 端点。
- **authorizations_url**: https://api.github.com/authorizations
  - **作用**: 用于管理 OAuth 授权令牌（列出、获取、创建、删除）。需要 Basic Auth 或 OAuth 认证。

**7. 通知与事件 (Notifications & Events)**

- **events_url**: https://api.github.com/events
  - **作用**: 获取公共的 GitHub 事件时间线。
- **feeds_url**: https://api.github.com/feeds
  - **作用**: 获取各种 Atom/RSS 订阅源的列表。
- **notifications_url**: https://api.github.com/notifications
  - **作用**: 获取当前经过身份验证的用户的通知。

**8. 杂项 (Miscellaneous)**

- **emojis_url**: https://api.github.com/emojis
  - **作用**: 获取 GitHub 支持的所有表情符号（Emojis）及其 URL。
- **hub_url**: https://api.github.com/hub
  - **作用**: 用于管理 PubSubHubbub/WebSub 钩子（Hooks）的端点，主要用于 Gists 和 Repositories 的事件订阅。
- **issues_url**: https://api.github.com/issues
  - **作用**: 列出分配给当前经过身份验证的用户的所有问题（Issues）。
- **rate_limit_url**: https://api.github.com/rate_limit
  - **作用**: 获取当前 API 请求速率限制的状态（剩余请求次数、重置时间等）。



### 示例

比如我想查一个仓库的相关信息，以https://github.com/activepieces/activepieces为例，我们把activepieces/activepieces填充到api（https://api.github.com/repos/{user}/{repo}）里面去

```
https://api.github.com/repos/activepieces/activepieces
```

然后在浏览器一回车，ok，就能得到这个仓库的很多信息了。比如它是2022-12-3创建的，用的ts。

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/githu-api.png)


### 下载资源
我们经常在GitHub上下载开源软件，有时候会发现下载速度相当忙，我们可以用下面的链接拼接下载地址来快速下载

```txt
https://github.abskoop.workers.dev/地址

如：想下载https://github.com/2dust/v2rayN/releases/download/7.12.3/v2rayN-windows-64.zip

只需：https://github.abskoop.workers.dev/2dust/v2rayN/releases/download/7.12.3/v2rayN-windows-64.zip
```

原理：利用 Cloudflare Workers (从 workers.dev 后缀可以看出来) 搭建的。Cloudflare Workers 允许开发者在 Cloudflare 的全球边缘网络上运行 JavaScript (或其他编译到 WebAssembly 的代码)。

当你通过这个 URL 访问 GitHub 资源时，你的请求首先会发送到离你最近的 Cloudflare 边缘节点。然后，这个边缘节点上的 Worker 会代替你向 GitHub 的真实服务器发起请求。

或者用别人搭建好的下载站点：比如[gh](https://gh.zhcn.it/)，要下载的链接直接复制进去就行。


### **快速跳转**

- 按下 `T` 键：在代码库页面按下 `T` 键，弹出文件快速搜索框，直接输入文件名即可快速定位到文件。

- 按下 `L` 键：在代码文件页面按下 `L` 键，可以快速跳转到某一行代码。

  

### **代码搜索技巧**

- 在代码库中搜索特定文件：

  ```
  path:src/ filename:main.js
  ```

- 搜索某段精确代码：

  ```
  content:"function myFunction()"
  ```



### 快捷键

- `S`：全局搜索
- `G` + `I`：跳转到 Issues
- `G` + `P`：跳转到 Pull Requests
- `Shift` + `?`：查看所有快捷键列表

- 在仓库页面，按下 `.` 键，会打开 GitHub 的网页版 VS Code 编辑器，方便快速浏览和编辑代码。



### **查看代码的历史变更**

**查看 Blame (b)**:

- 在查看单个文件时，按 b 键。
- 会跳转到该文件的 "Blame" 视图，显示每一行代码最后是由哪个 commit 修改的，以及修改者和时间。非常适合追溯某行代码的来源和原因。

- 在代码页面，点击某一行代码的行号，选择“Blame”功能，查看该行代码的历史修改记录。



### 查看未合并的 Pull Request

- 在 Pull Request 页面，使用 `is:open is:unmerged` 搜索未合并的 PR。
- 可以通过 `author:@your-username` 来筛选由你创建的 PR。



###  **代码片段高亮和建议**

- 你可以在评论中引用代码片段，直接在代码行旁边点击加号（`+`），然后选中部分代码进行评论，方便讨论。



### 自动关闭 Issue 的关键字

- 在 Pull Request 描述中使用以下关键字可以在合并时自动关闭 Issue：
  - `Fixes #123` 或 `Closes #123`
  - 合并后 Issue #123 会自动关闭。



### **GitHub Pages**

- 你可以通过 GitHub Pages 免费托管静态网站，只需将内容放在 `gh-pages` 分支或 `docs/` 文件夹。


### GitHub Copilot
可以在.github/copilot-instructions.md中自定义提示词，帮助 Copilot 更好地理解你的意图。
https://vscode.js.cn/docs/copilot/copilot-customization



### 真冷知识

**克隆仓库时 .git 后缀可选**:

- 使用 git clone https://github.com/user/repo 和 git clone https://github.com/user/repo.git 效果完全一样。.git 后缀是可选的。



**查看任意两个 Commit/Branch/Tag 之间的差异**:

- 直接在浏览器地址栏输入 https://github.com/user/repo/compare/ref1...ref2 即可。
- ref1 和 ref2 可以是分支名、标签名或 Commit SHA。例如 .../compare/main...develop 或 .../compare/v1.0...v1.1。



**个人 Profile README**:

- 创建一个与你的 GitHub 用户名同名的公开仓库 (e.g., github.com/your-username/your-username)。
- 在该仓库根目录下创建一个 README.md 文件。
- 这个 README 的内容会显示在你的个人主页顶部，可以用来做个性化的自我介绍。



**GitHub Actions 不仅仅用于 CI/CD**:

- 虽然 Actions 常用于构建、测试和部署，但它可以被触发来做任何自动化任务，比如：定时更新 README 中的内容、自动给新 Issue 打标签、在有人 Star 你的仓库时发推特等



**Gist 是匿名的 Git 仓库**:

- 每个 Gist (代码片段分享) 实际上都是一个完整的 Git 仓库。你可以 clone、push、pull 一个 Gist。公开 Gist 对所有人可见，私有 Gist 只有你自己能看到（但知道 URL 的人也能访问，不是真正意义上的私有）。
