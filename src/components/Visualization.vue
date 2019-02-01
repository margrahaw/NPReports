<template>
  <chart :chart-data="datacollection"></chart>
</template>

<script>
  import Chart from "./../Chart.js";
  import axios from 'axios';
  export default {
    components: {
      Chart
    },
    data() {
      return {
        datacollection: null,
        stateParkCount: null,
        states: null
      };
    },
    mounted() {
      this.fillData();
    },
    methods: {
      fillData() {
        axios.get('https://developer.nps.gov/api/v1/parks?limit=496&&api_key=noz5ln8JUoAH3kv8uCu3qAYy7ZVpLsKx96u6G5Qr')
          .then(response => {
            let results = response.data.data
            let filteredResults = results.filter(np => np.designation == 'National Park' || np.designation == 'National Park & Preserve' || np.designation == 'National and State Park')
            let parkresult = filteredResults.map(state => state.states).sort();
            let sorted_states = parkresult.map(state => state.split(',')).reduce((a, b) => a.concat(b));
            
            var count = {};
            sorted_states.forEach(function(x) {
              count[x] = (count[x] || 0) + 1;
            });
            this.states = Object.keys(count);
            this.stateParkCount = Object.values(count);
            this.datacollection = {
              labels: this.states,
              datasets: [
                {
                  label: "Parks Per State",
                  backgroundColor: "#A5CC82",
                  data: this.stateParkCount,
                },
              ]
            }
        })
        .catch(error => {
          console.log(error)
        })
      },
    }
  };
</script>

<style>
</style>
