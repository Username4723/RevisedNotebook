<template>
  <div>
    <div v-for="(page, key) in pages" :key="key">
      <b-row class="mb-1">
        <div>
          <!-- Button -->
          <b-button v-if="page.subpages" size="sm" variant="primary" v-b-toggle="key">
            <BIconArrowBarDown></BIconArrowBarDown>
          </b-button>
          <b-button size="sm" v-else>
            <BIconDashCircle></BIconDashCircle>
          </b-button>

          <b-link v-if="page.text || page.images || page.table" :to="{ name: type, params: { id: route == '' ? key : route + '.' + key }}"> {{ page.title }} </b-link>
          <span v-else> {{ page.title }} </span>
        </div>
      </b-row>
      <b-row v-if="page.subpages" class="mb-1">
        <b-collapse :accordion="'a-' + route" :id="key">
          <b-card>
            <RecursiveNavbar :pages="page.subpages" :type="type" :route="route == '' ? key : route + '.' + key"></RecursiveNavbar>
          </b-card>
        </b-collapse>
      </b-row>
    </div>
  </div>
</template>

<script>
import { BIconArrowBarDown, BIconDashCircle } from 'bootstrap-vue'

export default {
  name: "RecursiveNavbar",
  components: {
    BIconArrowBarDown,
    BIconDashCircle
  },
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
  }
}
</script>
