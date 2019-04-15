<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll-content" ref="listContent">
      <div class="scroll-view" ref="listWrapper">
        <slot>
          <ul class="list-content">
            <li
              @click="clickItem($event, item)"
              class="list-item"
              v-for="(item, index) in data"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </slot>
      </div>
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{ pullUpTxt }}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>
    <slot
      name="pulldown"
      :pullDownRefresh="pullDownRefresh"
      :pullDownStyle="pullDownStyle"
      :beforePullDown="beforePullDown"
      :isPullingDown="isPullingDown"
      :bubbleY="bubbleY"
    >
      <div
        ref="pulldown"
        class="pulldown-wrapper"
        :style="pullDownStyle"
        v-if="pullDownRefresh"
      >
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
          </div>
          <div v-else>
            <span>{{ refreshTxt }}</span>
          </div>
        </div>
      </div>
    </slot>
    <slot name="slideDot">
      <div class="dots" v-if="isDots">
        <span
          class="dot"
          :class="{ active: currentPageIndex === index }"
          v-for="(item, index) in dots"
          :key="index"
        ></span>
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import Loading from '../loadingMore/loadingMore.vue';
import Bubble from '../bubble/bubble.vue';
const COMPONENT_NAME = 'scroll';
const DIRECTION_H = 'horizontal';
const DIRECTION_V = 'vertical';
export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    // X轴滚动屏动态设置宽度
    readyScrollX: {
      type: Boolean,
      default: false
    },
    // 是否页面渲染开启实例（解决弹窗无法获取item宽度问题与readyScrollX配合）
    isScrollInit: {
      type: Boolean,
      default: true
    },
    // 是否开启轮播标记
    isDots: {
      type: Boolean,
      default: false
    },
    // 数据变化后是否自动滚动
    isAutoScroll: {
      default: false
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    momentum: {
      type: Boolean,
      default: true
    },
    snap: {
      type: [Boolean, Object],
      default: false
    },
    useTransition: {
      type: Boolean,
      default: true
    },
    bounceTime: {
      type: Number,
      default: 400
    },
    swipeBounceTime: {
      type: Number,
      default: 300
    },
    stopPropagation: {
      type: Boolean,
      default: false
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    listenScrollEnd: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    scrollbar: {
      type: null,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    pullUpLoad: {
      type: null,
      default: false
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    mouseWheel: {
      type: Boolean,
      default: false
    },
    bounce: {
      default: true
    },
    zoom: {
      default: false
    }
  },
  data() {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      isPullUpLoad: false,
      pullUpDirty: true,
      pullDownStyle: '',
      bubbleY: 0,
      isTransition: true,
      dots: [],
      currentPageIndex: 0
    }
  },
  computed: {
    pullUpTxt() {
      const moreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) || 'defaultLoadTxtMore'
      const noMoreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore) || 'defaultLoadTxtNoMore'
      return this.pullUpDirty ? moreTxt : noMoreTxt
    },
    refreshTxt() {
      return (this.pullDownRefresh && this.pullDownRefresh.txt) || 'defaultRefreshTxt'
    }
  },
  created() {
    // ios系统不启用useTransition 解决ios停止抖动问题
    let isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) this.isTransition = false;
    this.pullDownInitTop = -50
  },
  mounted() {
    if (this.isScrollInit) {
      setTimeout(() => {
        this.initScroll()
      }, 20)
    }
  },
  destroyed() {
    this.$refs.scroll && this.$refs.scroll.destroy()
  },
  methods: {
    getRect(el) {
      if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect()
        return {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        }
      } else {
        return {
          top: el.offsetTop,
          left: el.offsetLeft,
          width: el.offsetWidth,
          height: el.offsetHeight
        }
      }
    },
    initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      if (this.$refs.listWrapper && this.readyScrollX) {
        let listNode = this.$refs.listWrapper.children[0].children;
        let listWidth = [...listNode].map((item) => { return item.offsetWidth }).reduce((item, curr) => { return item + curr })
        this.$refs.listContent.style.width = listWidth + 'px';
        this.dots = new Array(listNode.length);
        this.currentPageIndex = 0;
      }
      if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
        this.$refs.listWrapper.style.minHeight = `${this.getRect(this.$refs.wrapper).height + 1}px`
      }
      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.scrollY || this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.scrollX || this.freeScroll || this.direction === DIRECTION_H,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll,
        mouseWheel: this.mouseWheel,
        bounce: this.bounce,
        zoom: this.zoom,
        momentum: this.momentum,
        snap: this.snap,
        stopPropagation: this.stopPropagation,
        swipeBounceTime: this.swipeBounceTime,
        bounceTime: this.bounceTime,
        useTransition: !this.useTransition || this.isTransition
      }
      this.scroll = new BScroll(this.$refs.wrapper, options)
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
      if (this.listenScrollEnd) {
        this.scroll.on('scrollEnd', (pos) => {
          if (this.isDots) this.currentPageIndex = this.scroll.getCurrentPage().pageX;
          this.$emit('scroll-end', pos)
        })
      }
      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart')
        })
        this.scroll.on('scrollStart', () => {
          this.$emit('scroll-start')
        })
      }
      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }
      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollBy() {
      this.scroll && this.scroll.scrollBy.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    clickItem(e, item) {
      this.$emit('click', item)
    },
    destroy() {
      this.scroll.destroy()
    },
    forceUpdate(dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false
        this._reboundPullDown().then(() => {
          this._afterPullDown()
        })
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false
        this.scroll.finishPullUp()
        this.pullUpDirty = dirty
        this.refresh()
      } else {
        this.refresh();
      }
      // 数据变化自动滚动某处
      if (this.isAutoScroll) {
        if (this.isAutoScroll instanceof Object) {
          this.isAutoScroll.direction = this.isAutoScroll.direction || 'bottom';
          this.isAutoScroll.time = this.isAutoScroll.time || '';
          this.isAutoScroll.method = this.isAutoScroll.method || 'scrollTo';
          switch (this.isAutoScroll.direction) {
            case 'left':
              this[this.isAutoScroll.method](this.scroll.minScrollX, 0, this.isAutoScroll.time);
              break;
            case 'right':
              this[this.isAutoScroll.method](this.scroll.maxScrollX, 0, this.isAutoScroll.time);
              break;
            case 'top':
              this[this.isAutoScroll.method](0, this.scroll.minScrollY, this.isAutoScroll.time);
              break;
            case 'bottom':
              this[this.isAutoScroll.method](0, this.scroll.maxScrollY, this.isAutoScroll.time);
              break;
            default:
              console.log('%cisAutoScroll是个Object,务必设置其对应属性', 'color:red')
              break;
          }
          this.$emit('update:isAutoScroll', null)
        }
      }
    },
    _initPullDownRefresh() {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false
        this.isPullingDown = true
        this.$emit('pullingDown')
      })
      this.scroll.on('scroll', (pos) => {
        if (!this.pullDownRefresh) {
          return
        }
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
          this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
        } else {
          this.bubbleY = 0
        }
        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
        }
      })
    },
    _initPullUpLoad() {
      this.scroll.on('pullingUp', () => {
        this.isPullUpLoad = true
        this.$emit('pullingUp')
      })
    },
    _reboundPullDown() {
      const { stopTime = 600 } = this.pullDownRefresh
      return new Promise((resolve) => {
        setTimeout(() => {
          this.isRebounding = true
          this.scroll.finishPullDown()
          resolve()
        }, stopTime)
      })
    },
    _afterPullDown() {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`
        this.beforePullDown = true
        this.isRebounding = false
        this.refresh()
      }, this.scroll.options.bounceTime)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.forceUpdate(true)
      }, this.refreshDelay)
    },
    isScrollInit(now) {
      if (now) {
        setTimeout(() => {
          this.initScroll();
        }, this.refreshDelay)
      }
    }
  },
  components: {
    Loading,
    Bubble
  }
}
</script>

<style lang="less">
.scroll-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  // background: #fff;
  /*position: absolute*/
  /*left: 0*/
  /*top: 0*/
  /*right: 0*/
  /*bottom: 0*/
  .scroll-content {
    position: relative;
    z-index: 1;
  }
  .list-content {
    position: relative;
    z-index: 10;
    background: #fff;
    .list-item {
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      padding-left: 20px;
      border-bottom: 1px solid #e5e5e5;
    }
  }
}
.pulldown-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all;
  .after-trigger {
    margin-top: 10px;
  }
}
.pullup-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
}
.dots {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 12px;
  transform: translateZ(1px);
  text-align: center;
  font-size: 0;
  .dot {
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    &.active {
      // width: 20px;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
