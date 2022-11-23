import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './routes';
import store from './store/index';
import VueCookies from 'vue3-cookies';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
});

createApp(App).use(router).use(store).use(VueCookies).use(vuetify).mount('#app')