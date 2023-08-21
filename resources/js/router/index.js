import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import PageNotFound from '../pages/PageNotFound.vue';

import AboutPage from '../pages/AboutPage.vue';
import MainLayout from '../components/shared/layout/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth';

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    {
        path: '/',
        component: MainLayout,
        redirect: '/',
        meta: {
            protected: true
        },
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
    { path: '/:pathMatch(.*)*', component: PageNotFound }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to) => {
    const authStore = useAuthStore()
    // instead of having to check every route record with
    // to.matched.some(record => record.meta.requiresAuth)
    if (to.meta.protected && !authStore.user) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        return {
            path: '/login',
            // save the location we were at to come back later
            query: { redirect: to.fullPath },
        }
    }

    if ((to.name === 'login' || to.name === 'register') && authStore.user) {
        return {
            path: '/'
        }
    }
})
export default router;