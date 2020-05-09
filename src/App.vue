<template>
  <div id="app">
    <!-- 全局组件 -->
    <transition :name="transitionName">
      <keep-alive :max="10" :include="keepAlive">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import router from './router'
import api from './api/index'
export default {
  name: 'App',
  data() {
    return {
      transitionName: '',
      keepAlive: []
    }
  },
  created() {
    // 递归路由设置KeepAlive  ***** 注意路由name必须和组件内的name一致 *****
    this.setRouteKeepAlive(router.options.routes)
    // 记录路由,动态给定动画
    this.$navigation.on('forward', to => {
      this.transitionName = to.route.meta.isTransition ? 'slide-left' : ''
    })
    this.$navigation.on('back', (to, from) => {
      if (to.route.meta.isTransition || from.route.meta.isTransition) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = ''
      }
    })
  },
  mounted() {
    console.log(this.keepAlive) // 设置缓存匹配
    console.log(this.$APICLOUD) // 只有在apicloud环境下才能获取
    // 接口调用
    api.getTodayFortune({ typeid: 1 }).then(res => {
      console.log(res)
    })
  },
  methods: {
    setRouteKeepAlive(routes) {
      routes.map(item => {
        if (item.children && Array.isArray(item.children)) {
          this.setRouteKeepAlive(item.children)
        } else {
          if (item.meta && item.meta.keepAlive) {
            this.keepAlive.push(item.name)
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scope>
#app {
  font-family: Helvetica, Tahoma, Arial, 'PingFang SC', 'Hiragino Sans GB',
    'Heiti SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: hidden;
  background-color: #f5f5f5;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 450ms;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backface-visibility: hidden;
  perspective: 800;
}
.slide-right-enter {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
