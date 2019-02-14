<template>
  <div class="campsites">
    {{ getStates }}
    <div class="d-flex justify-between align-center mb-3">
      <v-btn @click="all">Show All</v-btn>
      <v-btn @click="none">Collapse All</v-btn>
    </div>

    <v-expansion-panel
      v-model="panel"
      expand
    >
      <v-expansion-panel-content
        v-for="(item,i) in campgrounds"
        :key="i"
      >
        <div slot="header">{{item.name}} | 
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
    }
    
  },

  created() {
    // axios.get('https://developer.nps.gov/api/v1/campgrounds?&api_key=noz5ln8JUoAH3kv8uCu3qAYy7ZVpLsKx96u6G5Qr')
    //   .then(response => {
    //     let results = response.data.data.filter((n) => n.name.length > 2)
    //     let filteredResults = results.filter(function(e) { 
    //       return this.indexOf(e) < 0;
    //     }, this.parkCodes );
    //     console.log('yo');
    //     //var fds = parkCodes.map(x => Object.assign(x, filteredResults.find(y => y.parkCode == x.parkCode)));
    //     //console.log('fds', fds[0]);
    //     let filterParkNames = filteredResults.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    //     this.campgrounds = filteredResults;
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     this.errored = true
    //   })
    //   .finally(() => this.loading = false)
  },

  computed: {
    getStates() {
      var fds = this.campgrounds.map(park => {
        let pc = park.parkCode;
        let stateCode = this.parkCodes.find(x => x.parkCode == pc);
        park.state = stateCode;
        return park;
      });
      console.log('fds', this.campgrounds[0]);
    },
    
  }
}
</script>

