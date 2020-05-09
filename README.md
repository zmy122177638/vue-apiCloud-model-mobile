# vue-apiCloud-model-mobile

# 使用说明 \*

安装 vscode 编辑器

一切都已经配置好，入手即用。

```
1、安装 npm install -g apicloud-cli
2、vue.config.js配置自己当前ip`host: "192.168.1.240"`
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
npm run serve
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
