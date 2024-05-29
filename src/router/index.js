import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '../views/SignUp.vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/sign-up',
      name: 'singup',
      component: SignUp,
      meta: {
        auth: false
      }
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: () => import('../views/SignIn.vue'),
      meta: {
        auth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.auth && !authStore.userInfo.token) {
    next("/sign-in");
  } else if (!to.meta.auth && authStore.userInfo.token) {
    next("/");
  } else {
    next()
  }
})

export default router
