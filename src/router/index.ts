import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Translate from '../views/Translate.vue'
import LegacyFabricVersions from '../views/LegacyFabricVersions.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/translate',
    name: 'Translate',
    component: Translate
  },
  {
    path: '/legacy-versions',
    name: 'Legacy Fabric Versions',
    component: LegacyFabricVersions
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
