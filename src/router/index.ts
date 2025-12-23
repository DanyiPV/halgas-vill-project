import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '', name: 'home', component: () => import('@/views/HomeView.vue'), meta: { order: 0 } },
        { path: 'services', name: 'services', component: () => import('@/views/ServicesView.vue'), meta: { order: 1 } },
        { path: 'portfolio', name: 'portfolio', component: () => import('@/views/PortfolioView.vue'), meta: { order: 2 } },
        { path: 'contact', name: 'contact', component: () => import('@/views/ContactView.vue'), meta: { order: 3 } },
      ],
    },
    {
      path: '/adatkezelesi-tajekoztato',
      name: 'adatkezeles',
      component: () => import('@/views/DataManagementView.vue'),
    },
    {
      path: '/impresszum',
      name: 'impresszum',
      component: () => import('@/views/ImpresszumView.vue'),
    }
  ],


})

export default router