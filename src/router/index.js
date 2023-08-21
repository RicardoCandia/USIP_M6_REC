import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/empleado',
    name: 'empleado',
    component: () => import(/* webpackChunkName: "customer" */ '../views/EmpleadoView.vue')
  },
  {
    path: '/empleado/:id',
    name: 'empleadoedit',
    component: () => import(/* webpackChunkName: "customeredit" */ '../views/EmpleadoEditView.vue')
  },
  {
    path: '/areas',
    name: 'areas',
    component: () => import(/* webpackChunkName: "customer" */ '../views/AreaView.vue')
  },
  {
    path: '/areas/:id',
    name: 'areasedit',
    component: () => import(/* webpackChunkName: "customeredit" */ '../views/AreaEditView.vue')
  },
  {
    path: '/tipos',
    name: 'tipos',
    component: () => import(/* webpackChunkName: "customer" */ '../views/TipoView.vue')
  },
  {
    path: '/tipos/:id',
    name: 'tiposedit',
    component: () => import(/* webpackChunkName: "customeredit" */ '../views/TipoEditView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
