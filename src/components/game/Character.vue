<template>
  <PageViewer type="character" :path="$route.params.id">
    <template v-slot:header="{ page }">
      <b-button v-if="page.sheet" variant="primary" :to="page.sheet">Go to Sheet</b-button>
    </template>
  </PageViewer>
</template>

<script>
import PageViewer from './helpers/PageViewer.vue'

export default {
  components: {
    PageViewer
  }
}
</script>
