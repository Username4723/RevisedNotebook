<template>
  <b-container fluid>
    <!-- settings -->
    <b-row>
      <b-col>
        <b-card>
          <b-card-header>
            <b-card-title>Validation</b-card-title>
          </b-card-header>
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
            <b-card-subtitle> {{ homebrew.length - failingHomebrew.length }} / {{ homebrew.length }} </b-card-subtitle>
            <br/>
            <b-button v-b-modal.raw-data variant="info">View Raw</b-button>
            <b-modal id="raw-data" title="Raw Data">
              <b-form-textarea :value="homebrew"/>
            </b-modal>
          </b-card-header>
          <b-card-body>

            <!-- editor -->
            <b-container fluid>
              <b-row>

                <!-- selector -->
                <b-col cols="3">
                  <b-list-group>
                    <b-list-group-item class="text-left" v-for="(item, index) in this.failingHomebrew" :key="index" :variant="homebrewSchema(item) ? 'success' : 'danger'">
                      <b-button variant="outline-primary" @click="selected = item.editIndex">Edit</b-button>
                      {{ item.name ? item.name : "No Name." }}
                    </b-list-group-item>
                  </b-list-group>
                </b-col>

                <!-- editor -->
                <b-col>
                  <b-embed v-if="homebrew[selected].link.includes('dandwiki')" type="iframe" :src="homebrew[selected].link"></b-embed>
                  <br>

                  <b-form>
                    <b-form-group label="Link" label-cols="2" label-for="link">
                      <b-form-input id="link" lazy v-model="homebrew[selected].link" type="url" placeholder="Link to Homebrew" required/>
                      <b-button :href="homebrew[selected].link" target="_blank" rel="noreferrer noopener" variant="info">Open</b-button>
                    </b-form-group>

                    <b-form-group label="Name" label-cols="2" label-for="name">
                      <b-form-input id="name" lazy v-model="homebrew[selected].name" type="text" placeholder="Untitled" required/>
                    </b-form-group>

                    <b-form-group label="Type" label-cols="2" label-for="type">
                      <b-form-select id="type" lazy v-model="homebrew[selected].type" :options="[{ text: 'Choose...', value: undefined }, 'class', 'race', 'subclass', 'subrace', 'feat', 'background' ]" required/>
                    </b-form-group>

                    <b-form-group label="Subtype" label-cols="2" label-for="subtype" v-if="homebrew[selected].type == 'subrace' || homebrew[selected].type == 'subclass'">
                      <b-form-select id="subtype" lazy v-model="homebrew[selected].subtype" type="text" required/>
                    </b-form-group>

                    <b-form-group label="Tags" label-cols="2" label-for="tags">
                      <b-form-checkbox-group id="tags" v-model="homebrew[selected].tags" lazy class="text-left">
                        <b-form-checkbox value="magic">Magic</b-form-checkbox>
                        <b-form-checkbox value="digital">Digital</b-form-checkbox>
                        <b-form-checkbox value="souls">Souls (Concept)</b-form-checkbox>
                        <b-form-checkbox value="revival">Revival</b-form-checkbox>
                        <b-form-checkbox value="nonmechanical">Nonmechanical</b-form-checkbox>
                        <b-form-checkbox value="joke">Joke</b-form-checkbox>
                        <b-form-checkbox value="external">External</b-form-checkbox>
                        <b-form-checkbox value="divine">Divine</b-form-checkbox>
                        <b-form-checkbox value="broken-link">Broken Link</b-form-checkbox>
                        <b-form-checkbox value="replica">Replica</b-form-checkbox>
                        <b-form-checkbox value="pathfinder">Pathfinder</b-form-checkbox>
                        <b-form-checkbox value="incomplete">Incomplete</b-form-checkbox>
                        <b-form-checkbox value="steampunk">Steampunk</b-form-checkbox>
                        <b-form-checkbox value="complicated">Complicated</b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-form-group>

                    <b-form-group :label="'Balance: ' + homebrew[selected].balance" label-cols="2" label-for="balance">
                      <b-form-input id="balance" v-model="homebrew[selected].balance" number lazy type="range" min="-5" max="5" required/>
                      <b-button variant='outline-danger' @click="homebrew[selected].balance = undefined">Reset</b-button>
                    </b-form-group>

                    <b-form-group label="Notes" label-cols="2" label-for="notes">
                      <b-form-input id="notes" v-model="homebrew[selected].notes" lazy type="text" placeholder="Notes go here"/>
                    </b-form-group>

                    <b-form-group label="Changes" label-cols="2" label-for="changes">
                      <b-form-input id="changes" v-model="homebrew[selected].changes" lazy type="text" placeholder="Changes go here"/>
                    </b-form-group>

                  </b-form>
                </b-col>

              </b-row>
            </b-container>

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
      homebrew: require('@/data/homebrew_links.json'),
      selected: 0
    }
  },
  computed: {
    failingHomebrew: function() {
      return this.homebrew.map((it, index) => { it = Object.assign({}, it); it.editIndex = index; return it; }).filter(it => !this.homebrewSchema(it))
    },
    homebrewSchema: function() {
      return ajv.compile(require('@/schemas/homebrew.schema.json'))
    }
  }
}

</script>
