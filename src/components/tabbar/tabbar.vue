<template>
  <ul class="tabbar-list">
    <li
      v-for="(item, index) in tabList"
      :key="index"
      @touchend="switchTab(item, index)"
      :class="['tabbar-item', { active: tabActiveIndex === index }]"
    >
      <img
        :src="tabActiveIndex === index ? item.icon_press : item.icon"
        class="tabbar-icon"
        v-if="item.icon"
      />
      <h3 :class="item.icon ? 'tabbar-name' : 'iconShow'">
        {{ item.title }}
      </h3>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    tabList: {
      /**
       * @description: tabItem字段
       * @param {title} 标题
       * @param {path} 路由路径
       * @param {icon} 图标
       * @param {icon_press} 选中图片
       * @Date: 2019-03-06 15:41:27
       */
      type: Array,
      default() {
        return []
      },
      required: true
    }
  },
  data() {
    return {
      tabActiveIndex: 0
    }
  },
  created() {
    this.tabActiveIndex = this.tabList.findIndex(
      item => item.path === this.$route.path
    )
    window.addEventListener('popstate', () => {
      this.tabActiveIndex = this.tabList.findIndex(
        item => item.path === this.$route.path
      )
    })
  },
  methods: {
    switchTab(item, idx) {
      if (this.tabActiveIndex !== idx) {
        this.tabActiveIndex = idx
        this.$router.push(item.path)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tabbar-list {
  display: flex;
  box-sizing: border-box;
  border-top: 1px solid #efefef;
  background-color: #ffffff;
  .tabbar-item {
    flex: 1;
    height: 50px;
    position: relative;
    color: #333333;
    text-align: center;
    cursor: pointer;
    .tabbar-icon {
      width: 25px;
      position: absolute;
      top: 5px;
      left: 50%;
      transform: translate(-50%);
    }
    .tabbar-name {
      box-sizing: border-box;
      font-size: 10px;
      text-align: center;
      line-height: 1.5;
      padding-top: 32px;
    }
    .iconShow {
      line-height: 50px;
      font-size: 16px;
    }
    &.active {
      color: #ff7d30;
    }
  }
}
</style>
