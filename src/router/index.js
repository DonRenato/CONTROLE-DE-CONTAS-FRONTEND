import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bills',
    name: 'Bills',
    
    component: () => import(/* webpackChunkName: "bills" */ '../views/Bill.vue')
  },
  {
    path: '/users',
    name: 'Users',
    
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue')
  },
  {
    path: '/reports',
    name: 'Reports',
    
    component: () => import(/* webpackChunkName: "reports" */ '../views/Reports.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
