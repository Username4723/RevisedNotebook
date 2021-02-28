<template>
  <b-table sticky-header hover :items="brew" :fields="fields" primary-key="link">
    <template #cell(actions)="row">
      <b-button size="sm" variant="outline-primary" :to="row.item.link" class="mr-1">View Homebrew</b-button>
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
          sortable: false,
          formatter: value => {
            if (value == 0) return "Perfectly Balanced"
            let result = [undefined, "Slightly", "Somewhat", "", "Gamebreakingly", "Campaign-breakingly"][Math.abs(value)]

            return result + " " + (value < 0 ? "Underpowered" : "Overpowered")
          }
        },
        {
          key: 'actions'
        }
      ]
    }
  }
}
</script>
