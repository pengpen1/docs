<h1 align="center" id="解决GitHub100MB限制">解决GitHub100MB限制</h1>

**概要：** 本次将介绍如何解决GitHub100MB限制。



## 问题描述

本地有个项目写完了，准备推送到github上，结果报错，说我一个文件超过了100Mb，不允许上传。我删掉这个文件，重新上传也不行，因为

无论是当前版本还是历史版本，只要存在超过100MB的情况，都不允许上传。



## 方案二：Git LFS

我使用的就是这个方案，因为那个大文件我后续是不需要的

**安装**

```
# macOS (用 brew)
brew install git-filter-repo

# Windows / Linux（推荐通过 pip）
pip install git-filter-repo
```

**移除**

> 假设large-folder/bigfile.zip是要删除的文件

```
git filter-repo --path large-folder/bigfile.zip --invert-paths
```

`--invert-paths` 表示 **删除**这个路径下的文件；

会修改 `.git` 历史，把这个文件 **从每一个 commit 中彻底删除**；

执行后 `.git` 会被重写，慎用（但这是你想要的效果）。

有可能会存在失败的情况，如下

```
$ git filter-repo --path frontend/assets/lottie/robot.json --invert-paths
Aborting: Refusing to destructively overwrite repo history since
this does not look like a fresh clone.
  (expected freshly packed repo)
Please operate on a fresh clone instead.  If you want to proceed
anyway, use --force.
```

按照提示我们再加上 `--force`即可

```
git filter-repo --path large-folder/bigfile.zip --invert-paths --force
```

因为历史被改写，所以需要重新设置远程

```
git remote add origin <你的远程仓库地址>
```

最后推送即可



## 方案二：Git LFS

安装 Git LFS：

从 Git LFS[官网](https://git-lfs.com/)下载并安装。

初始化 Git LFS：

```
git lfs install
```

追踪大文件类型： 在你的项目目录中，运行以下命令来追踪 .jar 文件：

```
git lfs track "*.jar"
```

提交更改： 添加 .gitattributes 文件并提交：

```
git add .gitattributes git add jars/aws-java-sdk-bundle-1.12.772.jar git commit -m "Add jar file using Git LFS"
```

推送到 GitHub：

```
git push origin 目标分支名称
```



