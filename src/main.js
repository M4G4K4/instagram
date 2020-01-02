import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import passwordHash from 'password-hash';
import Vuex from 'vuex';


Vue.config.productionTip = false;
Vue.prototype.$http = axios;
const token = localStorage.getItem('token');
if(token){
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}
axios.defaults.baseURL = 'http://localhost:3000/api/';

new Vue({
  router,
  store,
  vuetify,
  passwordHash,
  Vuex,
  render: h => h(App)
}).$mount('#app')
