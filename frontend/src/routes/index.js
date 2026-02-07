import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/auth/Login.vue'),
            meta: { requiresGuest: true }
        },
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/Home.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/users',
            name: 'Users',
            component: () => import('../views/Users.vue')
        },
        {
            path: '/categories',
            name: 'Categories',
            component: () => import('../views/Categories.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')

    if (to.meta.requiresAuth && !token) {
        next('/login')
        return
    }

    if (to.meta.requiresGuest && token) {
        next('/')
        return
    }

    next()
})

export default router