import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.vue'
import router from './router'
import { currency,date } from './method/calc';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App)
//加入全域使用方法
app.config.globalProperties.$filters = {
  currency,date
};
app.use(VueAxios, axios)
app.use(createPinia())
app.use(router)
app.component('Load-ing', Loading);
app.mount('#app')
