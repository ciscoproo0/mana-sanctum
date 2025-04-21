import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Products from '@/views/Products.vue'
import Users from '@/views/Users.vue'
import Orders from '@/views/Orders.vue'
import Payments from '@/views/Payments.vue'
// import Login from '../views/Login.vue'
// import Register from '../views/Register.vue'
// import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/payments',
    name: 'Payments',
    component: Payments
  }

]

const router = createRouter({
  history: createWebHistory(), // <<< Sem parâmetros aqui!
  routes,
})

export default router
