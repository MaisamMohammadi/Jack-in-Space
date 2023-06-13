import { createRouter, createWebHistory } from 'vue-router'
import { introStore } from '../stores/Store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        const store = introStore()
        if (store.goToIntro) {
          next({ name: 'Intro' })
          store.goToIntro = false
        } else {
          next()
        }
      }
    },
    {
      path: '/game',
      name: 'Game',
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/highscore',
      name: 'Highscore',
      component: () => import('../views/HighscoreView.vue')
    },
    {
      path: '/help',
      name: 'Help',
      component: () => import('../views/HelpView.vue')
    },
    {
      path: '/intro',
      name: 'Intro',
      component: () => import('../views/IntroView.vue')
    }
  ]
})

export default router
