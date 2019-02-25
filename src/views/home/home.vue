<template>
  <div class="home-container">
    <main class="home-main">
      <router-view />
    </main>
    <footer>
      <V-tabbar></V-tabbar>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import VTabbar from "@/components/tabbar/tabbar.vue";

export default {
  name: "home",
  components: {
    VTabbar
  }
};
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
header {
  height: 100px;
  line-height: 100px;
  font-size: 32px;
}
.home-main {
  flex: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}
footer {
  // width: 100%;
  // position: fixed;
  // bottom: 0;
  // right: 0;
  // left: 0;
  height: 100px;
  line-height: 100px;
  font-size: 32px;
}
</style>
