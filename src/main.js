import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import getVant from "./plugin";
Vue.config.productionTip = false;
import axios from "axios";
Vue.prototype.axios = axios;

let token = localStorage.getItem("TOKEN") || "";
Vue.prototype.$token = token;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=utf-8";
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

getVant(Vue); //循环引用，减少main.js中的代码量
