<template>
  <div class="home">
    <v-container>
      <h2>Data Table with search</h2>
      <p>Complete list of US National Parks by full name and state(s) in which it is located.</p>
      <template>
        <v-card>
          <v-card-title>
            National Parks
            
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="filteredParks"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <tr @click="showParkInfo(props.item.fullName)">
                <td>
                  <ParkInfo :park="props.item"/>
                </td>
                <td>{{ props.item.states }}</td>
              </tr>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
      </template>
      {{ filteredStates }}
      {{ stateChartData.data.labels }}
      {{ info[1]}}
      <canvas id="state-chart"></canvas>
      <canvas id="planet-chart"></canvas>
    </v-container>
  </div>  
</template>

<script>
import Chart from 'chart.js'
import PlanetChartData from '../chart-data.js'
import axios from 'axios'
import ParkInfo from '../components/ParkInfo.vue'

export default {
  name: 'home',
  components: {
    ParkInfo
  },
  data () {
    return {
      planetChartData: PlanetChartData,
      stateChartData: {
        type: 'bar',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Parks per State',
              type: 'bar',
              data: [25, 90],
              backgroundColor: [
                'rgba(54,73,93,.5)',
                'rgba(54,73,93,.5)',
                'rgba(54,73,93,.5)',
              ],
              borderColor: [
                '#36495d',
                '#36495d',
                '#36495d',
              ],
              borderWidth: 3,
            }
          ],
        },
        options: {
          responsive: true,
          scales: {
            yAxis: [{
              ticks: {
                beginAtZero: true,
                padding: 25,
              }
            }]
          }
        }
      },
      search: '',
      headers: [
        {
          text: 'Park Name',
          align: 'left',
          value: 'name',
          width: '50%',
        },
         {
          text: 'State',
          align: 'left',
          sortable: false,
          value: 'name',
          width: '50%'
        },
      ],
      info: [],
      stateInfo: [],
      loading: true,
      errored: false,
    }
  },

  filters: {

    // currencydecimal (value) {
    //   return value.toFixed(2)
    // }
  },

  mounted() {
    this.getParkInfo();
    this.createChart('planet-chart', this.planetChartData);
    this.createChart('state-chart', this.stateChartData);
  },

  methods: {
    getParkInfo() {
      axios
      .get('https://developer.nps.gov/api/v1/parks?&api_key=noz5ln8JUoAH3kv8uCu3qAYy7ZVpLsKx96u6G5Qr')
      .then(response => {
          const states = [...new Set(response.data.data.map(state => state.states))];
          // const countedStates = states.reduce(function(allStates, state){
          //   if (state in allStates) {
          //     allStates[state]++;
          //   }
          //   else {
          //     allStates[state] = 1;
          //   }
          //   return allStates;
          // });
          this.info = response.data.data;
          this.stateChartData.data.labels = states.sort()
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    },

    createChart(chartId, chartData) {
      console.log("chart data", chartData);
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },
  },

  computed: {
    filteredParks() {
      if (!this.info) return [];
      return this.info.filter(park => park.designation == "National Park")
    },
    filteredStates() {
      if (!this.info) return [];
      var states =  this.info.map(state => state.states).sort();
      var stateCount = Object.create(null);
      states.forEach(state => {
        stateCount[state] = stateCount[state] ? stateCount[state] + 1 : 1;
      });
      return stateCount
    },
  },

}
</script>

<style>


</style>
