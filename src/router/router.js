import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(Router);

const router = new Router({
  /**
   * meta：{
   *  title: 页面标题，
   *  keepAlive：是否开启缓存
   *  tabHiiden： 是否隐藏tabbar
   *  isTransition: 是否开启过渡动画
   * }
   */
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
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
