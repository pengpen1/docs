<h1 align="center" id="kiro初尝试">kiro初尝试</h1>

**概要：** 本章节主包将分享下使用kiro编辑器的体验。



### 感想

当我提出一个需求后，它会依次创建`需求文档`、`设计文档`、`设计列表`，之后会让用户选择需要保留可选任务不（边际处理，动画之类的）。

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/docs/20251120162538009.png)

`kiro`不会像其他AI编辑器那样，自行执行，需要用户前往`.kiro/specs/safety-inspection-integration/tasks.md` 文件，然后点击任务旁边的`Start task`按钮来开始执行具体任务。

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/docs/20251120162548221.png)



### 其他高级功能

- 引导配置（类似与其他编辑器的`rulers`）
- 自定义Spec模板（团队协作用的）
- 自定义Agent Hook（**触发时机**包括代码生成前、代码生成后、Spec验证前等等）



`Kiro`采用了模块化、可扩展的分层架构，主要包括以下几个核心层次：

| 层次           | 主要职责                               | 关键组件                                               |
| :------------- | :------------------------------------- | :----------------------------------------------------- |
| 用户交互层     | 提供友好的用户界面和交互方式           | Vibe模式界面、Spec模式界面、代码编辑器                 |
| 核心业务逻辑层 | 实现Kiro的核心功能和业务流程           | 需求分析引擎、系统设计引擎、代码生成引擎、文档生成引擎 |
| 模型交互层     | 负责与各种大语言模型进行交互           | 模型适配器、提示词管理器、响应处理器                   |
| 数据存储层     | 负责存储用户数据、项目信息、配置文件等 | 项目数据库、用户数据库、配置数据库                     |
| 外部集成层     | 负责与各种外部工具和服务进行集成       | 版本控制系统集成、CI/CD工具集成、项目管理工具集成      |



### 引导配置

Steering 通过存放在 `.kiro/steering/` 目录下的 markdown 文件，为 `Kiro` 提供对你项目的持久知识。

点击**Generate Steering Docs**

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/docs/20251120163558977.png)

![](https://cdn.jsdelivr.net/gh/pengpen1/blog-images/docs/20251120163604922.png)

```
--- inclusion: always ---
始终包含

--- inclusion: fileMatch fileMatchPattern: "components/**/*.tsx" ---
条件包含

--- inclusion: manual ---
手动包含，需要在聊天中用 #steering-file-name 引用后才会生效，方便根据场景精确控制上下文
```

