import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import "./registerServiceWorker"; // pwa
import "@/common/styles/base.css"; // 样式初始化
import "@/common/js/rem.js"; // 引入rem自适应
import "../public/js/api.js"; // 引入apiCloud-api
import * as method from "@/common/js/mixin.js"; // 引入全局方法
import API from "@/server/apis.js"; // 引入api接口
import VConsole from "vconsole";
import Navigation from "vue-navigation";
// 导入vant所有组件,支持按需加载
// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);
Vue.config.productionTip = false;
// 全局引入公用方法，也可以在组件中单独引入，推荐在组件中单独引入。
Vue.prototype.$METHOD = method;
// 全局引入API
Vue.prototype.$SERVER = API;
// 引入路由记录插件
Vue.use(Navigation, {
  router,
  moduleName: "navigation",
  keyName: "AS"
});
// 开启console调试(正式打包请注释)
new VConsole();
// 通过apiID判断是否为app
if (window.api && window.api.appId === "A6006996353979") {
  window.apiready = function() {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  };
} else {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}
