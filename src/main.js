import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './routes';
import VueCookies from 'vue3-cookies';
import vuetify from '../plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App)
    .use(router)
    .use(VueSweetalert2)
    .use(VueCookies)
    .use(vuetify)
    .mount('#app')