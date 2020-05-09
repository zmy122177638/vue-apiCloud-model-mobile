const path = require('path')
const fs = require('fs')
const { exec, spawn } = require('child_process')

const appname = 'apiCloud' // 项目文件名
const appPort = 8000 // 真机同步端口,浏览器打开端口。
const scriptActive = process.env.npm_lifecycle_event

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  outputDir: appname, // 运行时生成的生产环境构建文件的目录(默认""dist""，构建之前会被清除)
  indexPath: 'index.html', //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  filenameHashing:
    process.env.NODE_ENV === 'production' /** 开发环境关闭文件哈希值 */,
  pages: {
    //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {
      //除了 entry 之外都是可选的
      entry: 'src/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      template: 'public/index.html', // 模板来源
      filename: 'index.html', // 在 apiCloud/index.html 的输出
      title: 'vue-apiCloud-model-mobile' // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
    }
  },
  lintOnSave: true, // 是否在保存的时候检查
  // webpack配置
  chainWebpack: config => {
    config.entry('index').add('@babel/polyfill') // 添加babel-poiyfill
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    )
  },
  configureWebpack: config => {
    config.plugins = config.plugins.concat([
      {
        apply: compiler => {
          if (scriptActive === 'watch-build') {
            /** 插件初始化后开启wifi服务 */
            compiler.hooks.afterPlugins.tap('apicloud', () => {
              const wifiWorker = spawn(`apicloud wifiStart --port ${appPort}`, {
                shell: true
              })
              wifiWorker.stdout.on('data', function(chunk) {
                console.log(
                  '\\033[32m' +
                    '【APICloud-cli】:' +
                    chunk.toString() +
                    '\\033[0m\n'
                )
              })
              wifiWorker.on('error', err => {
                console.log('请确保已安装apicloud-cli' + err)
              })
            })
            /** 生成资源后,删除重复热更新文件 */
            compiler.hooks.afterEmit.tap('apicloud', compilation => {
              const assets = compilation.assets
              const unlinked = []
              const files = fs.readdirSync(
                path.join(__dirname, `./${appname}/`)
              )
              if (files.length) {
                let jsFiles = files.filter(f => /.*(\.js|\.json)$/.test(f))
                jsFiles.forEach(file => {
                  if (!assets[file]) {
                    fs.unlinkSync(path.resolve(`./${appname}/${file}`))
                    unlinked.push(file)
                  }
                })
                if (unlinked.length > 0) {
                  console.log('删除热更新文件: ', unlinked)
                }
              }
            })
            /** 编译完成，真机同步 */
            compiler.hooks.done.tap('apicloud', () => {
              exec(
                `apicloud wifiSync --project ./${appname} --updateAll false --port ${appPort}`,
                (error, stdout) => {
                  if (error) {
                    console.error(`exec error: ${error}`)
                    console.log(
                      `error: wifi真机同步失败，请确保已安装apicloud-cli或已启动Wifi服务`
                    )
                    return
                  }
                  console.log(
                    '\\033[35m' +
                      '【APICloud-cli】:wifi真机同步成功' +
                      stdout.toString() +
                      '\\033[0m\n'
                  )
                }
              )
            })
          }
        }
      }
    ])
  },
  // webpack-dev-server配置
  devServer: {
    // 环境配置
    host: '192.168.1.94',
    hot: false,
    port: appPort,
    https: false,
    hotOnly: false,
    open: true,
    proxy: {
      /** 解决本地测试跨域问题 */
      '/api': {
        target: 'https://hy.yixueqm.com/interface/index.php/',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  transpileDependencies: ['swiper', 'dom7', 'ssr-window'],
  // 第三方插件配置
  pluginOptions: {}
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/styles/theme.less')]
    })
}
