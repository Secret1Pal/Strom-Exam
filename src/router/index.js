import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { remoteEvent } from '../components/remoteEvent';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/FAQ.vue')
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('../views/Service.vue')
    },
    {
      path: '/nyheder',
      name: 'nyheder',
      component: () => import('../views/Nyheder.vue')
    },
    {
      path: '/nyhed/:id',
      name: 'nyhed',
      component: () => import('../views/Nyhed.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SigninView.vue')
    },
    {
      path: '/admin/home',
      name: 'adminHome',
      component: () => import('../views/admin/AdminHome.vue')
    },
    {
      path: '/admin/about',
      name: 'aboutedit',
      component: () => import('../views/admin/AboutPut.vue')
    },
    {
      path: '/admin/news',
      name: 'newstable',
      component: () => import('../views/admin/NewsTable.vue')
    },
    {
      path: '/admin/news/post',
      name: 'newspost',
      component: () => import('../views/admin/NewsPost.vue')
    },
    {
      path: '/admin/news/put/:id',
      name: 'newsput',
      component: () => import('../views/admin/NewsPut.vue')
    },
    {
      path: '/:pathMatch(.*)*',  // Wildcard route for 404
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    },
  ]
})

let isFirstNavigation = true

router.beforeEach((to, from, next) => {
  if (isFirstNavigation) {
    remoteEvent.triggerFlashbang = true
    isFirstNavigation = false
  } else if (to.path !== from.path) {
    remoteEvent.triggerFlashbang = true
  }
  next()
});


export default router
