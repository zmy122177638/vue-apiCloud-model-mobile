<template>
  <BetterScroll
    ref="scroll"
    :data="data"
    :pullDownRefresh="{ threshold: 50, stop: 40, txt: '刷新成功' }"
    :pullUpLoad="{
      threshold: 50,
      txt: { more: '上拉加载更多', noMore: '暂无更多数据' }
    }"
    @pullingDown="onPullingDown"
    @pullingUp="onPullingUp"
  >
    <ul class="list">
      <li
        v-for="i in data"
        :key="i"
        :style="`background-color: ${roandomColor()}`"
      >
        {{ i }}
      </li>
    </ul>
  </BetterScroll>
</template>

<script>
import BetterScroll from '../../components/better-scroll/better-scroll.vue'
export default {
  data() {
    return {
      data: []
    }
  },
  mounted() {
    this.updateData()
  },
  components: {
    BetterScroll
  },
  methods: {
    updateData() {
      const len = this.data.length + 30
      for (let i = this.data.length; i < len; i++) {
        this.data.push(i)
      }
    },
    roandomColor() {
      //rgb颜色随机
      var r = Math.floor(Math.random() * 256)
      var g = Math.floor(Math.random() * 256)
      var b = Math.floor(Math.random() * 256)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    onPullingDown() {
      // 模拟更新数据
      console.log('pulling down and load data')
      setTimeout(() => {
        // eslint-disable-next-line no-constant-condition
        if (true) {
          // 如果有新数据
          this.data = []
          this.updateData()
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 2000)
    },
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      setTimeout(() => {
        // eslint-disable-next-line no-constant-condition
        if (true) {
          // 如果有新数据
          this.updateData()
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1500)
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  li {
    color: #ffffff;
    padding: 40px 0;
  }
}
</style>
