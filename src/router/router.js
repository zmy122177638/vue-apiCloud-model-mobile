import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home/home.vue";
import Page01 from "@/views/home/subviews/page01.vue";
import Page02 from "@/views/home/subviews/page02.vue";
import Page03 from "@/views/home/subviews/page03.vue";
import Page04 from "@/views/home/subviews/page04.vue";

Vue.use(Router);

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
      path: "/",
      // name: "home",
      component: Home,
      children: [
        {
          path: "",
          name: "page01",
          component: Page01
        },
        {
          path: "/page02",
          name: "page02",
          component: Page02
        },
        {
          path: "/page03",
          name: "page03",
          component: Page03
        },
        {
          path: "/page04",
          name: "page04",
          component: Page04
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/About.vue"),
      meta: {
        title: "大师详情",
        tabHiiden: true,
        isTransition: true,
        keepAlive: false
      }
    }
  ]
});

export default router;
