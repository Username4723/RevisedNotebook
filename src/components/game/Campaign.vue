<template>
  <PageViewer type="campaign" :path="$route.params.id">
    <template v-slot:header="{ rootPage }">
      <b-button v-if="rootPage.world" variant="primary" :to="{name: 'world', params: { id: rootPage.world }}">Go to Campaign World</b-button>
    </template>
    <template v-slot:footer="{ page, rootPage }">
      <div v-if="page == rootPage && rootPage.homebrewFilter">
        <h5>Filtered Homebrew</h5>
        <HomebrewViewer :brew="acceptedHomebrew(rootPage)"></HomebrewViewer>
      </div>
    </template>
  </PageViewer>
</template>

<script>
import PageViewer from './helpers/PageViewer.vue'
import HomebrewViewer from './helpers/HomebrewViewer.vue'

import Ajv from "ajv"
import addFormats from "ajv-formats"
const ajv = new Ajv()
addFormats(ajv)

export default {
  components: {
    PageViewer,
    HomebrewViewer
  },
  computed: {
    homebrew: function() {
      return require('@/data/homebrew_links.json')
    },
    homebrewSchema: function() {
      return ajv.compile(require('@/schemas/homebrew.schema.json'))
    },
    validHomebrew: function() {
      return this.homebrew.filter(this.homebrewSchema)
    }
  },
  methods: {
    acceptedHomebrew: function(rootPage) {
      return this.validHomebrew.filter(ajv.compile(rootPage.homebrewFilter))
    }
  }
}
</script>
