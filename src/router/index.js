import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
import Login from '@/views/login'
import Pay from '@/views/pay'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/pay',
    component: Pay
  }

]

const router = new VueRouter({
  routes
})

export default router
