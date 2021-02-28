<template>
  <b-card>
    <b-card-header>
      <b-card-title>All Homebrew</b-card-title>
    </b-card-header>
    <b-card-body class="text-left">
      <HomebrewViewer :brew="validHomebrew"/>
    </b-card-body>
  </b-card>
</template>

<script>
import HomebrewViewer from '@/components/game/helpers/HomebrewViewer.vue'

import Ajv from "ajv"
import addFormats from "ajv-formats"
const ajv = new Ajv()
addFormats(ajv)

export default {
  components: {
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
  }
}
</script>
