import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import MainLayout from '../components/shared/layout/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    {
        path: '/',
        component: MainLayout,
        redirect: '/',
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: DashboardPage
            },
            {
                path: '/about',
                name: 'about',
                component: AboutPage
            }
        ]
    },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/register', name: 'register', component: RegisterPage },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export default router;