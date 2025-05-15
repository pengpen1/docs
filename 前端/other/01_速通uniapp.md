<h1 align="center" id="速通uniapp">速通uniapp</h1>

本文将带你从安装环境、项目创建、目录结构、页面路由、组件使用、API 概览、运行调试，到打包发布等全流程，以最精炼的方式快速上手 uni‑app。首先介绍为什么选择 uni‑app 及其核心优势，然后演示如何通过 HBuilderX 和 Vue CLI 两种方式创建项目并理解目录结构；接着深入页面配置与组件用法，再探讨跨平台 API 的调用及条件编译；最后介绍在各类端上的运行、调试和打包发布流程，并附上实用小贴士，助你在最短时间内完成第一个 uni‑app 项目。

## 为什么选择 uni‑app

`uni‑app` 是 DCloud 推出的基于 Vue.js 的跨平台前端框架，开发者编写一套代码，可发布到 iOS、Android、Web（响应式）、以及微信/支付宝/百度/抖音/快应用等多端。
采用 Vue 语法，无需额外学习成本，且官方维护的插件生态完善，社区资源丰富，适合从 Vue2/Vue3 迁移的前端工程师快速上手。

### 核心优势

- **真正的跨端一致性**：基于 Vue 语法，统一的组件、API，确保多端兼容性
- **高性能**：App端支持weex原生渲染和uni小程序引擎，H5端支持Vite构建
- **生态完善**：丰富的插件市场，可直接使用现成组件和模板
- **Vue双版本支持**：同时支持Vue2和Vue3，可根据项目需求选择
- **全面的学习资源**：官方文档齐全，社区活跃

## 1. 安装与环境配置

### 1.1 使用 HBuilderX（可视化）

1. 从 DCloud 官方下载 [HBuilderX](https://www.dcloud.io/hbuilderx.html) 安装包并解压，注意路径及文件名不可包含特殊字符。
2. 运行 HBuilderX，首次使用需在"运行设置"中配置各端开发者工具路径：
   - 微信开发者工具路径
   - 支付宝小程序开发者工具路径
   - 抖音开发者工具路径
   - App开发环境（如需打包Android应用）

### 1.2 使用 Vue CLI（命令行）

1. 安装全局脚手架：

   ```bash
   npm install -g @vue/cli
   ```

2. 创建 uni‑app Vue3 项目（推荐）：

   ```bash
   npx degit dcloudio/uni-preset-vue#vite my-vue3-project
   ```

   或创建 Vue2 项目：

   ```bash
   vue create -p dcloudio/uni-preset-vue my-vue2-project
   ```

3. 选择模板：
   - `hello uni-app`：综合示例
   - 默认模板：基础项目框架
   - `uni-ui`项目模板：内置常用组件库的项目

4. 进入项目目录，安装依赖：

   ```bash
   cd my-project
   npm install
   ```

## 2. 创建项目

### 2.1 HBuilderX 创建

1. 在 HBuilderX 欢迎页点击"新建项目"
2. 选择"uni-app"类型
3. 填写项目名称和存储路径
4. 选择模板（默认模板、Hello uni-app、uniCloud）
5. 选择开发框架（Vue2/Vue3）
6. 点击"创建"

### 2.2 CLI 创建

执行上文 Vue CLI 命令后，脚手架会下载并安装 uni‑app 依赖，生成基础项目结构。Vue3项目默认使用Vite构建，开发体验更好。

### 2.3 Vue3 vs Vue2项目对比

**Vue3项目优势：**
- 性能更佳（Proxy响应式系统）
- 支持Composition API（更好的逻辑复用）
- TypeScript集成更好
- Vite构建（速度更快）

**注意事项：**
- Vue3使用`<script setup>`语法时，生命周期钩子需从`@dcloudio/uni-app`中导入：

```js
<script setup>
import { onLoad, onShow } from "@dcloudio/uni-app";

onLoad((option) => {
  console.log("页面加载", option);
});
</script>
```

## 3. 项目目录结构

一个典型 uni‑app 项目基于 Vue，默认包含以下主要文件夹与配置：

```
┌─pages              // 页面文件目录
│  └─index
│     └─index.vue    // index页面
├─static             // 静态资源目录
├─uni_modules        // 插件市场插件目录
├─main.js            // Vue初始化入口文件
├─App.vue            // 应用配置（全局样式、生命周期）
├─manifest.json      // 应用配置（应用信息、权限、模块配置等）
├─pages.json         // 页面配置（路由、导航条、tabBar等）
└─uni.scss           // uni-app内置的常用样式变量
```

### 关键文件详解

- **main.js**: 应用入口文件，实例化Vue并加载需要的插件
- **App.vue**: 应用级别的配置和全局样式
- **pages.json**: 配置页面路由、窗口样式、tabBar等
- **manifest.json**: 应用的配置项，包括应用名称、图标、版本等

## 4. 页面与路由

### 4.1 页面注册

所有页面需在 `pages.json` 中注册，示例：

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页",
        "enablePullDownRefresh": true
      }
    },
    {
      "path": "pages/user/profile",
      "style": {
        "navigationBarTitleText": "个人中心"
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  }
}
```

### 4.2 页面跳转

uni-app提供多种页面跳转API：

```js
// 保留当前页面，跳转到应用内的某个页面
uni.navigateTo({
  url: '/pages/user/profile?id=1'
});

// 关闭当前页面，跳转到应用内的某个页面
uni.redirectTo({
  url: '/pages/index/index'
});

// 关闭所有页面，打开到应用内的某个页面
uni.reLaunch({
  url: '/pages/index/index'
});

// 跳转到 tabBar 页面
uni.switchTab({
  url: '/pages/index/index'
});

// 关闭当前页面，返回上一页面或多级页面
uni.navigateBack({
  delta: 2
});
```

### 4.3 页面生命周期

uni-app页面支持Vue生命周期与uni-app特有生命周期：

```js
export default {
  data() {
    return { title: 'Hello' }
  },
  // 页面加载时
  onLoad(options) {
    console.log('页面参数:', options);
  },
  // 页面显示时
  onShow() {
    console.log('页面进入前台');
  },
  // 页面初次渲染完成
  onReady() {
    console.log('页面首次渲染完成');
  },
  // 页面隐藏
  onHide() {
    console.log('页面进入后台');
  },
  // 页面卸载
  onUnload() {
    console.log('页面卸载');
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log('触发下拉刷新');
    // 完成刷新后停止动画
    uni.stopPullDownRefresh();
  },
  // 上拉加载
  onReachBottom() {
    console.log('触发上拉加载');
  }
}
```

### 4.4 TabBar配置

定义应用底部标签栏，在`pages.json`中设置：

```json
{
  "tabBar": {
    "color": "#7A7E83",
    "selectedColor": "#3cc51f",
    "borderStyle": "black",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "static/images/home.png",
        "selectedIconPath": "static/images/home_active.png",
        "text": "首页"
      },
      {
        "pagePath": "pages/user/profile",
        "iconPath": "static/images/user.png",
        "selectedIconPath": "static/images/user_active.png",
        "text": "我的"
      }
    ]
  }
}
```

## 5. 组件使用

### 5.1 内置组件

uni-app提供了丰富的跨平台组件，无需注册直接使用：

```html
<template>
  <view class="container">
    <!-- 基础容器 -->
    <view class="box">
      <!-- 文本 -->
      <text>{{message}}</text>
      
      <!-- 图片 -->
      <image src="/static/logo.png" mode="aspectFit"></image>
      
      <!-- 按钮 -->
      <button type="primary" @click="handleClick">点击按钮</button>
      
      <!-- 输入框 -->
      <input v-model="inputValue" placeholder="请输入内容" />
      
      <!-- 滚动区域 -->
      <scroll-view scroll-y="true" style="height: 200px;">
        <view v-for="(item, index) in list" :key="index" class="item">
          {{item}}
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello uni-app',
      inputValue: '',
      list: Array.from({length:20}, (_, i) => `列表项 ${i+1}`)
    }
  },
  methods: {
    handleClick() {
      uni.showToast({
        title: '你点击了按钮',
        icon: 'success'
      })
    }
  }
}
</script>
```

### 5.2 uniUI组件库

uni-app官方提供了uniUI组件库，安装方式：

1. 通过HBuilderX插件市场安装
2. 或通过npm安装：`npm install @dcloudio/uni-ui`

使用示例：

```html
<template>
  <view>
    <uni-search-bar @confirm="search" @input="input" />
    <uni-card title="标题" sub-title="副标题" thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg">
      <text>这是一个uni-card</text>
    </uni-card>
  </view>
</template>

<script>
export default {
  methods: {
    search(res) {
      uni.showToast({
        title: '搜索：' + res.value,
        icon: 'none'
      })
    },
    input(res) {
      console.log('输入内容：', res.value)
    }
  }
}
</script>
```

### 5.3 easycom组件规范

uni-app提供了easycom组件规范，可以免注册、零配置使用符合规范的组件：

- 组件仅需放在项目的components目录下
- 或遵循`uni_modules`规范，放置在uni_modules目录下
- 无需在每个页面手动引入和注册

## 6. 跨端 API 概览

### 6.1 基础API

uni-app提供了丰富的跨端API，覆盖了常见的功能需求：

```js
// 显示消息提示框
uni.showToast({
  title: '操作成功',
  icon: 'success',
  duration: 2000
});

// 显示模态对话框
uni.showModal({
  title: '提示',
  content: '确认执行此操作吗？',
  success: function (res) {
    if (res.confirm) {
      console.log('用户点击确定');
    } else if (res.cancel) {
      console.log('用户点击取消');
    }
  }
});

// 网络请求
uni.request({
  url: 'https://api.example.com/data',
  method: 'GET',
  data: {
    id: 1
  },
  success: (res) => {
    console.log(res.data);
  },
  fail: (err) => {
    console.error(err);
  }
});

// 数据缓存
// 设置缓存
uni.setStorage({
  key: 'userInfo',
  data: {
    name: '张三',
    id: 100
  },
  success: function () {
    console.log('缓存成功');
  }
});

// 同步设置缓存
try {
  uni.setStorageSync('token', 'abc123');
} catch (e) {
  console.error(e);
}

// 获取缓存
uni.getStorage({
  key: 'userInfo',
  success: function (res) {
    console.log(res.data);
  }
});

// 同步获取缓存
try {
  const value = uni.getStorageSync('token');
  if (value) {
    console.log(value);
  }
} catch (e) {
  console.error(e);
}
```

### 6.2 条件编译

uni-app通过条件编译实现在不同平台发布不同代码：

```js
// #ifdef APP-PLUS
// 仅在APP环境下执行的代码
console.log('当前为APP环境');
// #endif

// #ifdef H5
// 仅在H5环境下执行的代码
console.log('当前为H5环境');
// #endif

// #ifdef MP-WEIXIN
// 仅在微信小程序环境下执行的代码
wx.login({
  success(res) {
    console.log('微信登录成功', res.code);
  }
});
// #endif

// #ifndef MP-ALIPAY
// 除了支付宝小程序，其他平台均执行的代码
console.log('非支付宝小程序环境');
// #endif
```

条件编译支持的平台包括：
- `APP-PLUS`：App 
- `H5`：H5
- `MP-WEIXIN`：微信小程序
- `MP-ALIPAY`：支付宝小程序
- `MP-BAIDU`：百度小程序
- `MP-TOUTIAO`：抖音小程序
- `MP-JD`：京东小程序
- `QUICKAPP-WEBVIEW`：快应用

### 6.3 使用Promise和Async/Await

uni-app API支持Promise，可以避免回调地狱：

```js
// 使用Promise
uni.request({
  url: 'https://api.example.com/data'
}).then(res => {
  console.log(res[1].data);
  return uni.showToast({
    title: '请求成功'
  });
}).catch(err => {
  console.error(err);
});

// 使用async/await
async function fetchData() {
  try {
    const res = await uni.request({
      url: 'https://api.example.com/data'
    });
    console.log(res[1].data);
    
    await uni.showToast({
      title: '请求成功'
    });
  } catch (err) {
    console.error(err);
  }
}
```

**注意**：Vue3项目中Promise返回单一结果，Vue2项目中返回数组[err, res]。

## 7. 运行与调试

### 7.1 HBuilderX运行调试

1. 打开uni-app项目
2. 点击工具栏的"运行"按钮
3. 选择运行环境：
   - 浏览器：运行H5版本
   - 小程序开发工具：需提前安装并配置
   - 真机运行：通过数据线连接手机
   - 模拟器：iOS/Android模拟器

### 7.2 命令行运行

对于CLI创建的项目，可以使用npm脚本运行：

```bash
# 运行到H5
npm run dev:h5

# 运行到微信小程序
npm run dev:mp-weixin

# 运行到App
npm run dev:app-plus
```

### 7.3 调试技巧

1. **Console调试**：使用`console.log`进行输出调试
2. **网络请求检查**：H5端可以使用浏览器开发工具
3. **断点调试**：
   - H5端：使用Chrome开发者工具
   - 小程序：使用小程序开发工具
   - App端：使用HBuilderX "运行" -> "Debug模式"
4. **设备日志**：App端运行时查看控制台输出
5. **条件编译调试**：使用`// #ifdef`进行特定平台调试

## 8. 打包与发布

### 8.1 原生 App（云端/离线）

#### 云端打包

1. HBuilderX顶部菜单 -> "发行" -> "原生App-云端打包"
2. 填写应用名称、包名、版本等信息
3. 选择证书（开发版/生产版）
4. 配置启动图标、启动页等
5. 点击"打包"，等待云端完成

#### 离线打包

1. HBuilderX顶部菜单 -> "发行" -> "生成本地打包App资源"
2. 将资源导入对应原生项目（Android Studio/Xcode）
3. 使用原生工具进行打包

### 8.2 H5发布

1. HBuilderX顶部菜单 -> "发行" -> "网站-H5手机版"
2. 选择发布目录，点击"发行"
3. 将生成的`dist/build/h5`目录上传至静态web服务器

CLI方式：

```bash
npm run build:h5
```

### 8.3 微信小程序发布

1. HBuilderX顶部菜单 -> "发行" -> "小程序-微信"
2. 填写微信小程序AppID
3. 点击"发行"
4. 在微信开发者工具中上传发布

CLI方式：

```bash
npm run build:mp-weixin
```

### 8.4 其他小程序平台

类似微信小程序的发布流程，选择对应的平台：
- "小程序-支付宝"
- "小程序-百度"
- "小程序-抖音"
- "小程序-QQ"
- "小程序-快手"

## 9. 高级特性

### 9.1 分包加载

对于较大的小程序可以使用分包加载优化体积：

```json
{
  "pages": [
    "pages/index/index"
  ],
  "subPackages": [
    {
      "root": "pagesA", 
      "pages": [
        "list/list"
      ]
    },
    {
      "root": "pagesB",
      "pages": [
        "detail/detail"
      ]
    }
  ]
}
```

### 9.2 uniCloud云开发

uniCloud是uni-app官方提供的云开发服务：

1. 在HBuilderX中创建uniCloud云服务空间
2. 创建云函数实现后端逻辑
3. 前端调用云函数：

```js
// 调用云函数
uniCloud.callFunction({
  name: 'get_list',
  data: {
    page: 1,
    pageSize: 10
  }
}).then(res => {
  this.dataList = res.result.data
}).catch(err => {
  console.error(err)
})
```

### 9.3 nvue原生渲染

对于复杂列表和高性能要求场景，可以使用nvue页面替代vue页面：

1. 创建.nvue文件代替.vue文件
2. 使用flex布局（默认flex-direction为column）
3. 仅支持部分组件，但性能接近原生

```html
<template>
  <div class="container">
    <text class="title">nvue原生渲染页面</text>
    <list class="list">
      <cell v-for="(item, index) in listData" :key="index">
        <text class="item">{{item}}</text>
      </cell>
    </list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: Array.from({length: 100}, (_, i) => `Item ${i+1}`)
    }
  }
}
</script>

<style>
.container {
  flex: 1;
}
.title {
  font-size: 36px;
  text-align: center;
  margin: 20px 0;
}
.list {
  flex: 1;
}
.item {
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #eeeeee;
}
</style>
```

## 10. Vue3特性支持

uni-app全面支持Vue3生态，包括：

### 10.1 Composition API

```html
<script setup>
import { ref, computed, onMounted } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

// 响应式状态
const count = ref(0);
const doubleCount = computed(() => count.value * 2);

// 方法
function increment() {
  count.value++;
}

// 生命周期
onLoad((options) => {
  console.log('页面参数:', options);
});

onMounted(() => {
  console.log('组件挂载完成');
});
</script>

<template>
  <view class="container">
    <view>Count: {{ count }}</view>
    <view>Double: {{ doubleCount }}</view>
    <button @click="increment">增加</button>
  </view>
</template>
```

### 10.2 Teleport

在H5和App平台支持Teleport组件实现内容传送：

```html
<template>
  <view>
    <!-- 将内容传送到页面特定位置 -->
    <teleport to="#app-teleport-target">
      <view class="modal">
        这是一个模态框内容
      </view>
    </teleport>
  </view>
</template>
```

### 10.3 Fragments

支持多根节点模板：

```html
<template>
  <view>第一个根节点</view>
  <view>第二个根节点</view>
</template>
```

## 11. 实用小贴士

### 11.1 样式处理

1. **rpx单位**：响应式单位，根据屏幕宽度自动调整
2. **样式隔离**：单Vue文件的样式默认仅对当前组件生效
3. **全局样式**：在App.vue的style标签定义全局样式
4. **动态样式**：

```html
<view :class="{ active: isActive }" :style="{ color: textColor }"></view>
```

### 11.2 性能优化

1. **长列表优化**：使用`recycle-list`或分页加载
2. **图片懒加载**：`<image lazy-load></image>`
3. **避免频繁setData**：合并数据更新
4. **分包加载**：减小首次启动时间
5. **按需引入组件**：减小包体积

### 11.3 多端兼容

1. **样式兼容**：使用flex布局提高兼容性
2. **接口兼容**：使用条件编译处理平台差异
3. **UI适配**：关注不同平台屏幕尺寸和交互习惯

### 11.4 发布检查清单

1. **图标与启动页**：确认各端图标和启动页配置
2. **权限声明**：检查manifest.json中权限配置
3. **应用信息**：检查应用名称、版本号等信息
4. **白屏优化**：检查首屏加载速度
5. **适配测试**：在多种设备上测试外观和功能

## 12. 学习资源

1. [uni-app官方文档](https://uniapp.dcloud.io)
2. [插件市场](https://ext.dcloud.net.cn)
3. [项目模板](https://ext.dcloud.net.cn/search?q=模板)
4. [HelloUniApp示例项目](https://github.com/dcloudio/hello-uniapp)
5. [uni-app GitHub仓库](https://github.com/dcloudio/uni-app)

通过本文的系统学习，你已经掌握了uni-app开发的核心知识，可以开始构建自己的跨平台应用。uni-app凭借其优秀的跨平台性能和完善的生态系统，是构建多端应用的理想选择。