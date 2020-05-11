import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/common.css';
import echarts from "echarts";
import axios from 'axios';
import qs from 'qs';
axios.defaults.baseURL = 'http://m.zcblack.top/sell/';

Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
