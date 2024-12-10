import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import DoctorDetail from "../views/DoctorDetail.vue";
import Admin from "../views/Admin.vue";
import DoctorsDataTable from "../components/DoctorsDataTable.vue";
import CategoriesDataTable from "../components/CategoriesDataTable.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import {useAuthStore} from "../store/auth/useAuthStore.js";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'no-found',
            component: NotFound,
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'doctorsDashboard',
                    name: 'doctorsDashboard',
                    component: DoctorsDataTable,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'departmentsDashboard',
                    name: 'departmentsDashboard',
                    component: CategoriesDataTable,
                    meta: { requiresAuth: true },
                }
            ]
        },
        {
            path: '/doctor/:id',
            name: 'doctor',
            component: DoctorDetail
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth) {
        if (authStore.isAdmin()) {
            next()
        } else {
            next('/login');
        }
    } else {
        next();
    }
});


export default router