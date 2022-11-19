import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './routes';
import store from './store/index';
import VueCookies from 'vue3-cookies'

createApp(App).use(router).use(store).use(VueCookies).mount('#app')