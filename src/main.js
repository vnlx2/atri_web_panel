import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './routes';
import store from './store/index';
import VueCookies from 'vue3-cookies';
import vuetify from '../plugins/vuetify';

createApp(App).use(router).use(store).use(VueCookies).use(vuetify).mount('#app')