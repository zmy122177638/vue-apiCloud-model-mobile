import Vue from "vue";
import axios from "axios";
import qs from "qs";
import envconfig from "./envconfig.js";
import { Toast } from "vant";
Vue.use(Toast);

// 发起请求前
axios.interceptors.request.use(
  config => {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: "spinner",
      message: "加载中..."
    });
    if (config.method.toUpperCase() === "POST") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    Toast.fail("加载超时");
    return Promise.reject(error);
  }
);
// 发起请求后
axios.interceptors.response.use(
  res => {
    Toast.clear();
    return res;
  },
  error => {
    console.log("好多人在访问呀，请重新试试");
    Toast.clear();
    if (error) {
      let errortime = null;
      clearTimeout(errortime);
      errortime = setTimeout(() => {
        Toast.fail("网络错误");
        clearTimeout(errortime);
      }, 0);
    }
    return Promise.reject(error);
  }
);

export default class Axios {
  axios(method, url, params, config) {
    return new Promise((resolve, reject) => {
      if (typeof params !== "object") params = {};
      let _option = Object.assign(
        {
          method,
          url,
          baseURL: envconfig.baseURL,
          timeout: 30000,
          headers: null
          // withCredentials: true, //是否携带cookies发起请求
        },
        config
      );
      method.toUpperCase() === "POST"
        ? (_option.data = params)
        : (_option.params = params);
      axios.request(_option).then(
        res => {
          resolve(res.data);
        },
        error => {
          if (error.response) {
            reject(error.response.data);
          } else {
            reject(error);
          }
        }
      );
    });
  }
}
