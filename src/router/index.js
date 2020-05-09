import Vue from 'vue'
import Router from 'vue-router'

// tarBar ----- 子页面
import Index from '@/views/index/index.vue'
// 懒加载
const Page01 = () =>
  import(
    /* webpackChunkName: "page01" */
    '@/views/index/subviews/page01.vue'
  )
const Page02 = () =>
  import(
    /* webpackChunkName: "page02" */
    '@/views/index/subviews/page02.vue'
  )
const Page03 = () =>
  import(
    /* webpackChunkName: "page03" */
    '@/views/index/subviews/page03.vue'
  )
const Page04 = () =>
  import(
    /* webpackChunkName: "page04" */
    '@/views/index/subviews/page04.vue'
  )

// 内嵌组件

Vue.use(Router)

const router = new Router({
  /**
   * name: 组件名称 (需要开启缓存，路由组件名称与组件内名称必须一致，区分大小写)
   * meta：{
   *  title: 页面标题，
   *  keepAlive：是否开启缓存（开启缓存是组件内name，所以这里需要和routes的name配合）
   *  isTransition: 是否开启过渡动画
   * }
   */
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '',
          name: 'page01',
          component: Page01,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/page02',
          name: 'page02',
          component: Page02,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/page03',
          name: 'page03',
          component: Page03,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/page04',
          name: 'page04',
          component: Page04,
          meta: {
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/about',
      component: () =>
        import(
          /* webpackChunkName: "about" */
          '@/views/about/about.vue'
        ),
      meta: {
        isTransition: true
      }
    },
    {
      path: '/example',
      component: () =>
        import(
          /* webpackChunkName: "example" */
          '@/views/example/example.vue'
        ),
      meta: {
        isTransition: true
      }
    }
  ]
})

export default router
