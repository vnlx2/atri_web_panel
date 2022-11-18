import LoginVue from "../views/Login.vue";
import DashboardVue from "../views/admin/Dashboard.vue";
import AdminVue from "../views/Admin.vue";
import VisualNovelVue from "../views/admin/VisualNovel.vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

// let isAuthentic = store.state.auth.isLogin;
// const isAuthentic = false;

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginVue,
        meta: {
            title: 'Login',
            requiredNotAuth: true
        }
    },
    {
        path: '/',
        name: 'home',
        component: AdminVue,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: DashboardVue
            },
            {
                path: '/visualnovel',
                name: 'vn',
                component: VisualNovelVue
            }
        ],
        meta: {
            requiredAuth: true
        }
    }
];

const router = createRouter({    
    history: createWebHistory(),
    routes
});

router.beforeEach((toRoute, fromRoute, next) => {
    window.document.title = `ATRI Control Panel - ${toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'Login'}`;    
    if(toRoute.matched.some(record => record.meta.requiredAuth)) {
        if(!store.getters['auth/getLoginStatus']) {
            next({ name: 'login' });
        }
        next();
    } 
    else if(toRoute.matched.some(record => record.meta.requiredNotAuth)) {
        if(store.getters['auth/getLoginStatus']) {
            next({ name: 'dashboard' });
        }
        next();
    }
    else {
        next();
    }
}); 

export default router;