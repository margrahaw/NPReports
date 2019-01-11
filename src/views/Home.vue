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
      
      {{ info[1]}}
      <!-- <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>

      <section v-else>
        <div v-if="loading">Loading...</div>
        <div
          v-else
          v-for="currency in info"
          class="currency"
          v-bind:key="currency.name"
        >
          {{ currency.description }}:
          <span class="lighten">
            <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
          </span>
        </div>
      </section> -->
      <!-- <canvas id="planet-chart"></canvas> -->
    </v-container>
  </div>  
</template>

<script>
// import Chart from 'chart.js'
// import planetChartData from './chart-data.js'
import axios from 'axios'
import ParkInfo from '../components/ParkInfo.vue'

export default {
  name: 'home',
  components: {
    ParkInfo
  },
  data () {
    return {
    //  planetChartData: planetChartData,
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
      loading: true,
      errored: false,
    }
  },

  filters: {

    currencydecimal (value) {
      return value.toFixed(2)
    }
  },

  computed: {
    filteredParks() {
      if (!this.info) return [];

      return this.info.filter(park => park.designation == "National Park")
    }
  },

  methods: {
    showParkInfo(fullName) {

    }
    // createChart(chartId, chartData) {
    //   const ctx = document.getElementById(chartId);
    //   const myChart = new Chart(ctx, {
    //     type: chartData.type,
    //     data: chartData.data,
    //     options: chartData.options,
    //   });
    // }
  },

  created() {
    // this.createChart('planet-chart', this.planetChartData);
    axios
      .get('https://developer.nps.gov/api/v1/parks?&api_key=noz5ln8JUoAH3kv8uCu3qAYy7ZVpLsKx96u6G5Qr')
      .then(response => {
          this.info = response.data.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
}
</script>

<style>


</style>
