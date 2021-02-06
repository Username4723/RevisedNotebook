<template>
  <b-row>
    <!-- sidebar -->
    <b-col cols="auto">
      <b-card border-variant="dark" class="text-left">
        <b-container>
          <b-navbar-brand>Campaign Worlds</b-navbar-brand>
          <RecursiveNavbar :pages="allData"></RecursiveNavbar>
        </b-container>
      </b-card>
    </b-col>

    <!-- main page -->
    <b-col>
      <b-card border-variant="dark" class="text-left">
        <div v-if="world == undefined">
          <b-card-header>
            <b-card-title> 404: Campaign World not found. </b-card-title>
            <b-card-sub-title> See the sidebar for valid worlds. </b-card-sub-title>
          </b-card-header>
        </div>
        <div v-else-if="page == undefined">
          <b-card-header>
            <b-card-title> 404: World subpage not found. </b-card-title>
            <b-card-sub-title> See the sidebar for valid subpages. </b-card-sub-title>
          </b-card-header>
          <b-card-footer>
            <b-button variant="primary" :to="{ name: 'world', params: { id: this.$route.params.id.split('.')[0] }}">Return to root campaign page?</b-button>
          </b-card-footer>
        </div>
        <div v-else>
          <b-card-header>
            <b-card-title> {{ world.title }} </b-card-title>
            <b-card-sub-title v-if="world.title != page.title" sub-title-text-variant=""> {{ page.title }} </b-card-sub-title>
          </b-card-header>
          <b-card-body>
            <b-container fluid>
              <!-- row 1 - text and image -->
              <b-row v-if="page.text || page.images">
                <b-col v-if="page.text">
                  <p v-for="(line, index) in page.text" v-bind:key="index"> {{ line }} </p>
                </b-col>

                <!-- images -->
                <b-col v-if="page.images" sm="6">
                  <b-carousel :controls="page.images.length > 1" :indicators="page.images.length > 1" :interval="4000" background="#ababab">
                    <b-carousel-slide v-for="(image, index) in page.images" :key="index" :img-src="'/assets/worlds/' + $route.params.id.replace('.', '/') + '/' + image.link">
                      <b-card border-variant="dark" id="caption-card">
                        <b-card-title> {{ image.caption }} </b-card-title>
                        <b-caption-body v-if="image.text"> {{ image.text }} </b-caption-body>
                      </b-card>
                    </b-carousel-slide>
                  </b-carousel>
                </b-col>
              </b-row>

              <!-- row 2 - table -->
              <b-row v-if="page.table">
                <b-table :items="page.table.items"></b-table>
              </b-row>
            </b-container>
          </b-card-body>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import RecursiveNavbar from './RecursiveNavbar.vue'

import data from '../../../data/worlds.json'
export default {
  components: {
    RecursiveNavbar
  },
  computed: {
    allData: function() {
      return data;
    },
    world: function() {
      return data[this.$route.params.id.split(".")[0]];
    },
    page: function() {
      let space = this.$route.params.id.split(".");

      let page = data[space.shift()];
      while (space.length > 0) {
      if (!page) return undefined;
        page = page.subpages[space.shift()];
      }

      return page;
    }
  }
}

</script>

<style scoped>
#caption-card {
  background-color: rgb(0, 0, 0, 0.6);
}
</style>
