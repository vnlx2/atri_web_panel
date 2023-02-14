import LoginVue from "../views/Login.vue";
import DashboardVue from "../views/admin/Dashboard.vue";
import AdminVue from "../views/Admin.vue";
import VisualNovelVue from "../views/admin/VisualNovel.vue";
import FanTranslatorVue from "../views/admin/FanTranslator.vue";
import UserManagementVue from "../views/admin/UserManagement.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginVue,
        meta: {
            title: 'Login',
            requiredAuth: false
        }
    },
    {
        path: '/',
        name: 'home',
        component: AdminVue,
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: DashboardVue
            },
            {
                path: '/visualnovel',
                name: 'Visual Novel',
                component: VisualNovelVue
            },
            {
                path: '/fantl',
                name: 'Fan Translator',
                component: FanTranslatorVue
            },
            {
                path: '/user',
                name: 'User Management',
                component: UserManagementVue
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
    window.document.title = `ATRI Control Panel - ${toRoute.name}`;    
    if(toRoute.meta.requiredAuth) {
        if(!cookies.get('token')) {
            next({ name: 'login' });
        }
        else if(toRoute.name == 'home') {
            next({ name: 'Dashboard' });
        }
        else {
            next();
        }
    } 
    else {
        if(cookies.get('token')) {
            next({ name: 'home' });
        }
        else {
            next();
        }
    }
}); 

export default router;