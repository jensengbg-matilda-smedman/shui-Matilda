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
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/flow',
    name: 'Flow',
    component: () => import('../views/Flow.vue')
  },
  {
    path: '/register',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
