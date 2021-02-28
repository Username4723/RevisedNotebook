<template>
  <b-row>
    <!-- sidebar -->
    <b-col cols="auto">
      <b-card border-variant="dark" class="text-left">
        <b-container>
          <b-navbar-brand>Navigation</b-navbar-brand>
          <RecursiveNavbar :type="type" :pages="data"></RecursiveNavbar>
        </b-container>
      </b-card>
    </b-col>

    <!-- main page -->
    <b-col>
      <transition mode="out-in" name="fade">
        <b-card :key="$route.params.id" border-variant="dark" class="text-left">
          <div v-if="rootPage == undefined">
            <!-- Invalid pages -->
            <b-card-header>
              <b-card-title> 404: Page not found. </b-card-title>
              <b-card-sub-title> See the sidebar for valid locations. </b-card-sub-title>
            </b-card-header>
          </div>
          <div v-else-if="page == undefined">
            <b-card-header>
              <b-card-title> 404: Subpage not found. </b-card-title>
              <b-card-sub-title> See the sidebar for valid subpages. </b-card-sub-title>
            </b-card-header>
            <b-card-footer>
              <b-button variant="primary" :to="{ name: type, params: { id: path.split('.')[0] }}">Return to root page?</b-button>
            </b-card-footer>
          </div>

          <!-- page -->
          <div v-else>
            <!-- header -->
            <b-card-header>
              <b-container fluid>
                <b-row>
                  <b-col>
                    <b-card-title> {{ rootPage.title }} </b-card-title>
                    <b-card-sub-title v-if="rootPage.title != page.title" sub-title-text-variant=""> {{ page.title }} </b-card-sub-title>
                  </b-col>
                  <b-col class="text-right">
                    <slot name="header" v-bind:rootPage="rootPage" v-bind:page="page"></slot>
                  </b-col>
                </b-row>
              </b-container>
            </b-card-header>

            <!-- content -->
            <b-card-body>
              <b-container fluid>
                <!-- row 1 - text and image -->
                <b-row v-if="page.text || page.images">
                  <b-col v-if="page.text">
                    <div v-if="page.text != 'external'">
                      <p v-for="(line, index) in page.text" v-bind:key="index"> {{ line }} </p>
                    </div>
                    <div v-else v-html="require(`@/data/${type}/${path.replace(/\./g, '/')}/text.md`)"></div>
                  </b-col>

                  <!-- images -->
                  <b-col v-if="page.images" sm="6">
                    <b-carousel :controls="page.images.length > 1" :indicators="page.images.length > 1" :interval="4000" background="#ababab">
                      <div v-for="(image, index) in page.images" :key="index">
                        <b-carousel-slide v-if="!image.disabled" :img-src="require('@/data/' + type + '/' + path.replace(/\./g, '/') + '/' + image.link)">
                          <b-card border-variant="dark" id="caption-card">
                            <b-card-title> {{ image.caption }} </b-card-title>
                            <b-card-body v-if="image.subcaption"> {{ image.subcaption }} </b-card-body>
                          </b-card>
                        </b-carousel-slide>
                      </div>
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
      </transition>
    </b-col>
  </b-row>
</template>

<script>
import RecursiveNavbar from './RecursiveNavbar.vue'

export default {
  components: {
    RecursiveNavbar
  },
  props: {
    type: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  computed: {
    data: function() {
      return require('@/data/' + this.type + ".json");
    },
    rootPage: function() {
      return this.data[this.path.split(".")[0]];
    },
    page: function() {
      let space = this.path.split(".");

      let page = this.data[space.shift()];
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

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
