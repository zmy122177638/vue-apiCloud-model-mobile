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
import router from "./router/router.js";
export default {
  name: "App",
  data() {
    return {
      transitionName: "",
      keepAlive: []
    };
  },
  created() {
    // 遍历路由设置keepAlive
    router.options.routes.map(item => {
      if (item.meta && item.meta.keepAlive) {
        this.keepAlive.push(item.name);
      }
    });
    // 记录路由,动态给定动画
    this.$navigation.on("forward", to => {
      this.transitionName = to.route.meta.isTransition ? "slide-left" : "";
    });
    this.$navigation.on("back", (to, from) => {
      if (to.route.meta.isTransition || from.route.meta.isTransition) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "";
      }
    });
  },
  mounted() {
    console.log(this);
    this.$API.getData({ typeid: 1 }).then(data => {
      console.log(data);
    });
  }
};
</script>
<style lang="less">
// 全局样式
@import url("common/styles/mixin.less");
</style>

<style lang="less" scope>
#app {
  font-family: Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB",
    "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
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
  position: fixed;
  top: 0;
  left: 0;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
