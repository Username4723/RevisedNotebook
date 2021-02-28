<template>
  <b-container class="p-5" fluid>
    <b-row>
      <b-col>
        <b-card border-variant="dark">
          <b-navbar :toggleable="false" type="dark" variant="info">
            <b-navbar-brand to="/">
              <b-img src="@/icon.svg" fluid></b-img>
              Red's D&amp;D Notebook
            </b-navbar-brand>
            <b-collapse id="nav-text-collapse" is-nav>
              <b-navbar-nav>
                <b-nav-item :to="{ name: 'references' }">Utilities &amp; Tools</b-nav-item>
                <b-nav-item :to="{ name: 'homebrew' }">All Homebrew</b-nav-item>
                <b-nav-item-dropdown text="Campaigns">
                  <b-dropdown-item v-for="(name, id) in campaigns" v-bind:key="id" :to="{ name: 'campaign', params: { id: id   }}" >{{ name }}</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown text="Worlds">
                  <b-dropdown-item v-for="(name, id) in worlds" v-bind:key="id" :to="{ name: 'world', params: { id: id   }}" >{{ name }}</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown text="Characters">
                  <b-dropdown-item v-for="(name, id) in characters" v-bind:key="id" :to="{ name: 'character', params: { id: id   }}" >{{ name }}</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </b-card>
      </b-col>
    </b-row>

    <transition name="fade" mode="out-in">
      <router-view class="mt-3"></router-view>
    </transition>
  </b-container>
</template>

<script>

import worldData from '@/data/world.json'
import campaignData from '@/data/campaign.json'
import characterData from '@/data/character.json'

export default {
  name: 'MainPage',
  computed: {
    worlds: function() {
      let data = {}
      for (let key in worldData) data[key] = worldData[key].title
      return data
    },
    campaigns: function() {
      let data = {}
      for (let key in campaignData) data[key] = campaignData[key].title
      return data
    },
    characters: function() {
      let data = {}
      for (let key in characterData) data[key] = characterData[key].title
      return data
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
