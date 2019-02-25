<template>
  <ul class="tabbar-list">
    <router-link
      to="/"
      :exact="this.$route.path === '/' ? false : true"
      tag="li"
      class="tabbar-item"
    >
      <div class="tabbar-icon"></div>
      <h3 class="tabbar-name">page01</h3>
    </router-link>
    <router-link to="/page02" tag="li" class="tabbar-item">
      <div class="tabbar-icon"></div>
      <h3 class="tabbar-name">page02</h3>
    </router-link>
    <router-link to="/about" tag="li" class="tabbar-item">
      <div class="tabbar-icon"></div>
      <h3 class="tabbar-name">page03</h3>
    </router-link>
    <router-link to="/page04" tag="li" class="tabbar-item">
      <div class="tabbar-icon"></div>
      <h3 class="tabbar-name">page04</h3>
    </router-link>
  </ul>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {}
};
</script>

<style lang="less" scoped>
.tabbar-list {
  display: flex;
  .tabbar-item {
    flex: 1;
    font-size: 28px;
    &.router-link-active {
      color: red;
    }
  }
}
</style>
