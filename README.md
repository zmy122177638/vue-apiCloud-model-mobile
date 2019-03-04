# vue-apiCloud-model-mobile

# 安装所需依赖 \*

安装 node.js，安装 apicloud-cli

```
  npm install apicloud-cli -g
```

安装 vscode 编辑器，下载 apiCloud 插件。

---

你必须注意以下问题： 1.你需将 vue-apiCloud-model-mobile 项目放置在 widget 文件夹内，并在 vscode 工作区的第一个，由于 wifi 配置，vscode 默认打开一个路径 2.需在 apiCloud 插件的路径配置 apiCloud 路径

vscode 工作区应为
widget >> vue-apiCloud-model-mobile >> apiCloud(执行 npm run watch-build 生成的 apiCloud 项目)

## vue-apiCloud-model-mobile 项目结构

- apiCloud (执行 npm run watch-build 生成的 apiCloud 项目)
- public (公共文件)
  - img (公共图片，webpack 不处理，只 copy)
  - js
    - api.js (apiCloud 至关重要的 api.js)
  - config.xml (apiCloud 至关重要的 config.xml)
  - favicon.ico
  - index.html (模板)
  - manifest.json
  - robots.txt
- src (配置主要结构)
  - assets (资产文件，放置 css,js,font,img 等资源类文件)
  - common (公用文件)
    - js (包含：自适应 rem.js,全局方法 mixin.js，微信 wx_sdk.js)
    - styles (包含：css 初始 base.css,全局样式 mixin.less)
  - components (vue 组件)
  - router (vue 路由)
  - server
    - api.js (api 接口文件)
    - axios.js (axios 二次封装，全局拦截处理)
    - envconfig.js
  - store (vuex 状态管理)
  - views (vue 页面)
  - App.vue
  - main.js

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
