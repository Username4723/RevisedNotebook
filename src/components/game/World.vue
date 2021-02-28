<template>
  <PageViewer type="world" :path="$route.params.id"></PageViewer>
</template>

<script>
import PageViewer from './helpers/PageViewer.vue'

export default {
  components: {
    PageViewer
  }
}
</script>
