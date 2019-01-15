import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import "./registerServiceWorker";
import "@/common/style/base.css";
import "@/common/js/rem.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
