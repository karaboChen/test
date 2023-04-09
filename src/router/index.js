import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login-in.vue')
    },
    {
      path: '/dash',
      name: 'dash',
      component: () => import('../views/Dash-board.vue'),
      //巢狀路由
      children:[
        {
          path: 'products',
          component: () => import('../views/pro-ducts.vue')
        }
      ]
    },
  ]
})

export default router
