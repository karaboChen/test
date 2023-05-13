import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/ho-me.vue'),
    },
    {
      path: '/user',
      name:'UserBoard',
      component: () => import('../views/UserBoard.vue'),
      //巢狀路由
      children:[
         {
          path: 'cart',
          name:'UserCart',
          component: () => import('../views/UserCart.vue'),
         },
         {
          path: 'product/:productId',
          name:'UserProduct',
          component: () => import('../views/UserProduct.vue'),
         },
         {
          path: 'checkout/:orderId',
          component: () => import('../views/UserCheckout.vue'),
        }
      ]
    },
    {
      path: '/home',
      name:'home',
      component: () => import('../views/ho-me.vue')
     
    },
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
        },
        {
          path: 'orders',
          component: () => import('../views/OrdersView.vue'),
        },
        {
          path: 'coupons',
          component: () => import('../views/CouPons.vue'),
        },
        {
          path: 'article',
          component: () => import('../views/ArtiCle.vue'),
        }
      ]
    },
  ]
})

export default router
