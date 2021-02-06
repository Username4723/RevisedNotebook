<template>
  <b-container class="p-5" fluid>
    <b-row>
      <b-col>
        <b-card border-variant="dark">
          <b-navbar :toggleable="false" type="dark" variant="info">
            <b-navbar-brand to="/">Red's D&amp;D Notebook</b-navbar-brand>
            <b-collapse id="nav-text-collapse" is-nav>
              <b-navbar-nav>
                <b-nav-item-dropdown text="Campaigns">
                </b-nav-item-dropdown>

                <b-nav-item-dropdown text="Worlds">
                  <b-dropdown-item v-for="(name, id) in worlds" v-bind:key="id" :to="{ name: 'world', params: { id: id   }}" >{{ name }}</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown text="Characters">
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </b-card>
      </b-col>
    </b-row>

    <router-view class="mt-3"></router-view>
  </b-container>
</template>

<script>

import worldData from '../../data/worlds.json'
export default {
  name: 'MainPage',
  computed: {
    worlds: function() {
      let data = {}
      for (let key in worldData) data[key] = worldData[key].title
      return data
    }
  }
}
</script>
