import LoginVue from "../views/Login.vue";
import DashboardVue from "../views/admin/Dashboard.vue";
import AdminVue from "../views/Admin.vue";
import VisualNovelVue from "../views/admin/VisualNovel.vue";
import { createRouter, createWebHistory } from "vue-router";
import { mapGetters } from "vuex";

const isAuthentic = mapGetters("auth", { getLoginToken: "getLoginStatus" });

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginVue,
        redirect: to => {
            if(isAuthentic) {
                return '/dashboard';
            }
        },
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/',
        name: 'home',
        component: AdminVue,
        redirect: to => {
            if(!isAuthentic) {
                return '/login';
            }
            else {
                return '/dashboard';
            }
        },
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
        ]
    }
];

const router = createRouter({    
    history: createWebHistory(),
    routes
});

router.beforeEach((toRoute, fromRoute, next) => {
    window.document.title = `ATRI Control Panel - ${toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'Login'}`;    
    next();
}); 

export default router;