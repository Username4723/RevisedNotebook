import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import HomePage from "../components/HomePage.vue"

import NotFound from "../components/NotFound.vue"
import WorkInProgress from "../components/WorkInProgress.vue"

import World from "../components/game/World.vue"

const routes = [
  { path: '', component: HomePage },
  { path: '/wip', component: WorkInProgress }, // Avoid unused error

  {
    path: '/world/:id',
    name: 'world',
    component: World
  },

  { path: '*', component: NotFound }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
