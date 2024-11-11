import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import DoctorDetail from "../views/DoctorDetail.vue";
import Admin from "../views/Admin.vue";
import DoctorsDataTable from "../components/DoctorsDataTable.vue";
import CategoriesDataTable from "../components/CategoriesDataTable.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin,
            children: [
                {
                    path: '/admin/doctorsDashboard',
                    name: 'doctorsDashboard',
                    component: DoctorsDataTable
                },
                {
                    path: '/admin/departmentsDashboard',
                    name: 'departmentsDashboard',
                    component: CategoriesDataTable
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

export default router