# vue-apiCloud-model-mobile

# 使用说明 \*

安装 vscode 编辑器

一切都已经配置好，入手即用。

```
需要在vue.config.js配置自己当前ip`host: "192.168.1.240"`
```

```
一般我们在H5开发Ui页面，之后再使用watch-build在apicloud环境下联调app环境
```

```
`npm run watch-build` apicloud环境
```

```
`npm run serve` H5环境
```

---

## vue-apiCloud-model-mobile 项目结构

- apiCloud (执行 npm run watch-build 生成的 apiCloud 项目)
- public (公共文件)
  - img (公共图片，webpack 不处理，只 copy)
  - js
    - api.js (apiCloud 可有可无的 api.js)
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

## 其他模板

apicloud+vue 单页模式可三端同时开发： https://github.com/122177638/vue-apiCloud-model-mobile

vue (移动端) axios 拦截封装，px 转 rem,页面切换动画,vant 组件库，缓存配置： https://github.com/122177638/vue-model-mobile

vue (pc 端) axios 拦截封装，element 组件库，兼容 IE9，缓存配置： https://github.com/122177638/vue-model-pc

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run server
```

### Compile and hot reload for development and push to APicloud-loader environment WIFI mobile phone synchronization

```
npm run watch-build
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
