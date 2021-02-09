<template>
  <PageViewer type="character" :path="$route.params.id"></PageViewer>
</template>

<script>
import PageViewer from './PageViewer.vue'

export default {
  components: {
    PageViewer
  }
}
</script>
