<template>
  <b-table hover :items="brew" :fields="fields" primary-key="name" :tbody-transition-props="{ name: 'flip-list' }" sort-by="name">
    <template #cell(actions)="row">
      <b-button size="sm" variant="outline-primary" :href="row.item.link" class="mr-1">View Homebrew</b-button>
      <b-button size="sm" variant="outline-primary" v-if="row.item.notes || row.item.changes" @click="row.toggleDetails"> {{ row.detailsShowing ? 'Hide' : 'Show' }} Details </b-button>
    </template>

    <template #row-details="row">
        <b-card>
          <span v-if="row.item.changes">Required Changes: {{ row.item.changes }} </span>
          <span v-if="row.item.notes">Additional Notes: {{ row.item.notes }} </span>
        </b-card>
    </template>
  </b-table>
</template>

<script>
export default {
  props: {
    brew: {
      type: Array,
      required: true
    }
  },
  data: function() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'type',
          label: 'Type',
          sortable: true,
          formatter: (value, key, item) => {
            if (value == "subclass") return "Subclass (" + item.subtype + ")"
            if (value == "subrace") return "Subrace (" + item.subtype + ")"
            return value[0].toUpperCase() + value.substring(1, value.length)
          }
        },
        {
          key: 'balance',
          label: 'Balance',
          sortable: true,
          formatter: value => {
            if (value == 0) return "Perfectly Balanced"
            let result = [undefined, "Slightly", "Somewhat", "", "Gamebreakingly", "Campaign-breakingly"][Math.abs(value)]

            return result + " " + (value < 0 ? "Underpowered" : "Overpowered")
          }
        },
        {
          key: 'tags',
          label: 'Tags',
          sortable: false,
          formatter: value => value ? [...value].sort().map(it => it[0].toUpperCase() + it.substring(1, it.length)).join(", ") : ""
        },
        {
          key: 'gsheet',
          label: 'GSheet-Compatible',
          sortable: true,
          formatter: value => value ? "Yes" : "No"
        },
        {
          key: 'actions',
          sortable: false
        }
      ]
    }
  }
}
</script>

<style scoped>
table >>> .flip-list-move {
  transition: transform 1s;
}
</style>
