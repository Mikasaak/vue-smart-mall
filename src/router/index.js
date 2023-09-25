import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
import Login from '@/views/login'
import Pay from '@/views/pay'
import MyOrder from '@/views/myorder'
import ProDetail from '@/views/prodetail'
import Search from '@/views/search'
import SearchList from '@/views/search/list'

import Cart from '@/views/layout/cart.vue'
import Category from '@/views/layout/category.vue'
import Home from '@/views/layout/home.vue'
import User from '@/views/layout/user.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/cart',
        component: Cart
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/category',
        component: Category
      },
      {
        path: '/user',
        component: User
      }

    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/mayorder',
    component: MyOrder
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/searchlist',
    component: SearchList
  },
  {
    path: '/prodetail',
    component: ProDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
