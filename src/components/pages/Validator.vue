<template>
  <b-container fluid>
    <!-- settings -->
    <b-row>
      <b-col>
        <b-card>
          <b-card-header>
            <b-card-title>Validation</b-card-title>
          </b-card-header>
          <b-card-body>
            <b-button :pressed.sync="hidePassing" :variant="hidePassing ? 'danger' : 'success' "> {{ hidePassing ? "Show Passing" : "Hide Passing" }} </b-button>
            Failing Total: {{ failingPages + failingHomebrew }}
            Failing Pages: {{ failingPages }}
            Failing Homebrew: {{ failingHomebrew }}
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <br/>

    <!-- homebrew -->
    <b-row>
      <b-col>
        <b-card>
          <b-card-header>
            <b-card-title>Homebrew</b-card-title>
          </b-card-header>
          <b-card-body>
            <b-list-group>
              <b-list-group-item v-for="(item, index) in (hidePassing ? failingData.homebrew : this.homebrew)" :key="index" :variant="homebrewSchema(item) ? 'success' : 'danger'">
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
    <br/>

    <!-- pages -->
    <b-row>
      <b-col v-for="(group, index) in (hidePassing ? failingData.pages : pages)" :key="index">
        <b-card>
          <b-card-header>
            <b-card-title>Pages: {{ index }}</b-card-title>
          </b-card-header>
          <b-card-body>
            <b-list-group>
              <b-list-group-item v-for="(page, pageIndex) in group" :key="pageIndex" :variant="pageSchema(page) ? 'success' : 'danger'">
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
  data: function() {
    return {
      pages: {
        campaign: require('@/data/campaign.json'),
        character: require('@/data/character.json'),
        world: require('@/data/world.json'),
      },
      homebrew: require('@/data/homebrew_links.json'),
      hidePassing: true
    }
  },
  computed: {
    failingData: function() {
      const data = {
        pages: {},
        homebrew: {}
      }

      for (let key in this.pages) {
        data.pages[key] = {};
        for (let entry in this.pages[key]) {
          if (!this.pageSchema(this.pages[key][entry])) data.pages[key][entry] = this.pages[key][entry]
        }
      }

      for (let key in this.homebrew) {
        if (!this.homebrewSchema(this.homebrew[key])) data.homebrew[key] = this.homebrew[key]
      }

      return data;
    },
    failingPages: function() {
      return Object.values(this.failingData.pages).map(it => Object.values(it).length).reduce((value, acc) => acc + value, 0)
    },
    failingHomebrew: function() {
      return Object.values(this.failingData.homebrew).length
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
