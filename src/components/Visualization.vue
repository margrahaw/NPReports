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
        axios.get('https://developer.nps.gov/api/v1/parks?&api_key=noz5ln8JUoAH3kv8uCu3qAYy7ZVpLsKx96u6G5Qr')
          .then(response => {
            let results = response.data.data
            let parkresult = results.map(state => state.states).sort();
            var counts = {};
            parkresult.forEach(function(x) {
              counts[x] = (counts[x] || 0) + 1;
            });
            this.states = Object.keys(counts);
            this.stateParkCount = Object.values(counts);
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
