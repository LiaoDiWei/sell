import Vue from 'vue';
import App from './App';
import router from './router/index';
import 'common/stylus/index.styl';
import Axios from 'axios';

Vue.config.productionTip = false;

//http配置
Vue.prototype.$http = Axios;            //修改Vue原型链中关于$http，以便更方便地调用axios
Axios.defaults.withCredentials = true;  //defaults为配置的默认值，这里withCredentials表示是否携带cookie

let bus = new Vue({});                  //用一个空vue实例（能够导出事件接口）作为事件总线

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
  data: {
    bus: bus
  }
});

//router.push('/goods');   //类似路由重定向，强制跳转
