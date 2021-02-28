import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import HomePage from "@/components/pages/HomePage.vue"
import Validator from "@/components/pages/Validator.vue"
import NotFound from "@/components/pages/NotFound.vue"
import WorkInProgress from "@/components/pages/WorkInProgress.vue"

import References from "@/components/game/References.vue"
import Homebrew from "@/components/game/Homebrew.vue"

import World from "@/components/game/World.vue"
import Campaign from "@/components/game/Campaign.vue"
import Character from "@/components/game/Character.vue"

const routes = [
  { path: '', component: HomePage },
  { path: '/wip', component: WorkInProgress }, // Avoid unused error

  {
    path: '/debug',
    name: 'debug',
    component: Validator
  },

  {
    path: '/references',
    name: 'references',
    component: References
  },
  {
    path: '/homebrew',
    name: 'homebrew',
    component: Homebrew
  },

  {
    path: '/world/:id',
    name: 'world',
    component: World
  },
  {
    path: '/campaign/:id',
    name: 'campaign',
    component: Campaign
  },
  {
    path: '/character/:id',
    name: 'character',
    component: Character
  },

  { path: '*', component: NotFound }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
