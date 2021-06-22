import { createRouter, createWebHashHistory } from 'vue-router'
import Acceuil from '../views/Acceuil.vue'
import Meteo from '../views/Meteo.vue'

const routes = [
  {
    path: '/',
    name: 'Acceuil',
    component: Acceuil
  },
  {
    path: '/meteo/:city',
    name: 'Meteo',
    component: Meteo
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
