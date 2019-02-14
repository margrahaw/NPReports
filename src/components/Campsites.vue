<template>
  <div class="campsites">
    <div class="d-flex justify-between align-center mb-3">
      <v-btn @click="all">Show All</v-btn>
      <v-btn @click="none">Collapse All</v-btn>
    </div>

    <v-expansion-panel
      v-model="panel"
      expand
    >
      <v-expansion-panel-content
        v-for="(item,i) in getStates"
        :key="i"
      >
        <div slot="header"><span class="font-weight-bold">{{item.name}}</span> | {{item.state}}
          <span v-show="!item.state" class="font-italic">location not available</span>
        </div>
        <v-card>
          <v-card-text>
            <p>Description</p>
            {{ item.description}}
            </v-card-text>
          <v-divider />
          <v-card-text>
            <p>Regulations</p>
            {{ item.regulationsOverview}}
            <span v-show="!item.regulationsOverview" class="font-italic">no information available</span>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'campsites',
  props: [ 'parkCodes' ],
  data () {
    return {
      campgrounds: [],
      panel: [],
    }
  },

  mounted() {
    this.getCampgroundInfo();
  },

  methods: {
    getCampgroundInfo() {
      axios.get('https://developer.nps.gov/api/v1/campgrounds?&api_key=noz5ln8JUoAH3kv8uCu3qAYy7ZVpLsKx96u6G5Qr')
        .then(response => {
          let results = response.data.data.filter((n) => n.name.length > 2)
          let filteredResults = results.filter(function(e) { 
            return this.indexOf(e) < 0;
          }, this.parkCodes );
          let filterParkNames = filteredResults.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.campgrounds = filteredResults;
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
    },
    // Create an array the length of our items
    // with all values as true
    all () {
      this.panel = this.campgrounds
    },
    // Reset the panel
    none () {
      this.panel = []
    },
  },

  computed: {
    getStates() {
      var fds = this.campgrounds.map(park => {
        let stateCode = this.parkCodes.find(x => x.parkCode == park.parkCode);
        if (stateCode)
          park.state = stateCode.fullName + ', ' + stateCode.states;
        return park;
      });
      console.log("first park", this.campgrounds[0]);
      return this.campgrounds;
    },
    
  }
}
</script>

