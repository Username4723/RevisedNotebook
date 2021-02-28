<template>
  <b-container>
    <div v-for="(page, key) in pages" :key="key">
      <b-row class="mb-1">
        <div>
          <!-- Button -->
          <b-button size="sm"
            :variant="hasContent(page) ? (isCurrent(key) ? 'success' : 'primary') : 'info'"
            :to="hasContent(page) ? { name: type, params: { id: getSubkey(key) }} : undefined" v-b-toggle="key">
            {{ page.title }}
          </b-button>
        </div>
      </b-row>
      <b-row class="mb-1">
        <b-collapse :accordion="'a-' + route" :id="key">
          <b-card v-if="page.subpages">
            <RecursiveNavbar :pages="page.subpages" :type="type" :route="getSubkey(key)"></RecursiveNavbar>
          </b-card>
        </b-collapse>
      </b-row>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "RecursiveNavbar",
  props: {
    pages: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    route: {
      type: String,
      default: ''
    }
  },
  methods: {
    hasContent: function(page) {
      return page.text || page.images || page.table
    },
    isCurrent: function(key) {
      return this.$route.params.id == this.route + '.' + key  || this.$route.params.id == key
    },
    getSubkey: function(key) {
      return this.route == '' ? key : this.route + '.' + key
    }
  }
}
</script>
