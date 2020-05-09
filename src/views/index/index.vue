<template>
  <div class="view-container">
    <main class="view-main">
      <router-view />
    </main>
    <footer>
      <Tabbar :tabList="tabList"></Tabbar>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabbar from '@/components/tabbar/tabbar.vue'

export default {
  components: {
    Tabbar
  },
  data() {
    return {
      tabList: [
        {
          title: 'page01',
          path: '/'
        },
        {
          title: 'page02',
          path: '/page02'
        },
        {
          title: 'page03',
          path: '/page03'
        },
        {
          title: 'page04',
          path: '/page04'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.view-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.view-main {
  flex: 1;
  overflow: hidden;
  // 兼容安卓低版本浏览器
  height: calc(100% - 51px);
}
</style>
