import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/game',
      name: 'Game',
      component: () => import('../views/GameView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/highscore',
      name: 'Highscore',
      component: () => import('../views/HighscoreView.vue'),
    },
    {
      path: '/help',
      name: 'Help',
      component: () => import('../views/HelpView.vue'),
    },
  ],
});

export default router;
