<template>
  <b-container fluid>
    <!-- homebrew -->
    <b-row>
      <b-col>
        <b-card>
          <b-card-header>
            <b-card-title>Homebrew</b-card-title>
          </b-card-header>
          <b-card-body>
            <b-list-group>
              <b-list-group-item v-for="(item, index) in homebrew" :key="index" :variant="homebrewSchema(item) ? 'success' : 'danger'">
                {{ item.name ? item.name : "No Name: " + JSON.stringify(item) }}
                <div v-if="!homebrewSchema(item)">
                  {{ homebrewSchema.errors }}
                </div>
              </b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <!-- pages -->
    <b-row>
      <b-col v-for="(pages, index) in data" :key="index">
        <b-card>
          <b-card-header>
            <b-card-title>Pages: {{ index }}</b-card-title>
          </b-card-header>
          <b-card-body>
            <b-list-group>
              <b-list-group-item v-for="(page, pageIndex) in pages" :key="pageIndex" :variant="pageSchema(page) ? 'success' : 'danger'">
                {{ page.title }}
                <div v-if="!pageSchema(page)">
                  {{ pageSchema.errors }}
                </div>
              </b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Ajv from "ajv"
import addFormats from "ajv-formats"
const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

export default {
  computed: {
    data: function() {
      return {
        campaign: require('@/data/campaign.json'),
        character: require('@/data/character.json'),
        world: require('@/data/world.json'),
      }
    },
    homebrew: function() {
      return require('@/data/homebrew_links.json')
    },
    pageSchema: function() {
      return ajv.compile(require('@/schemas/page.schema.json'))
    },
    homebrewSchema: function() {
      return ajv.compile(require('@/schemas/homebrew.schema.json'))
    }
  }
}

</script>
