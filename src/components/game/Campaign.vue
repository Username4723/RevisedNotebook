<template>
  <PageViewer type="campaign" :path="$route.params.id">
    <template v-slot:header="{ rootPage }">
      <b-button v-if="rootPage.world" variant="primary" :to="{name: 'world', params: { id: rootPage.world }}">Go to Campaign World</b-button>
    </template>
  </PageViewer>
</template>

<script>
import PageViewer from './PageViewer.vue'

export default {
  components: {
    PageViewer
  }
}
</script>
