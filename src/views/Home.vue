<template>
  <div class="home">
    <v-container>
      <h1>National Parks Statistics</h1>
      <template>
        <h2>Number of National Parks Per State</h2>
        <visualization />
        
        <h2 class="my-5">List of all National Parks</h2>
        <v-card>
          <v-card-title>
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
    </v-container>
  </div>  
</template>

<script>
import Chart from 'chart.js'
import axios from 'axios'
import ParkInfo from '../components/ParkInfo.vue'
import Visualization from '../components/Visualization.vue'

export default {
  name: 'home',
  components: {
    ParkInfo,
    Visualization
  },
  data () {
    return {
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
          width: '50%',
        },
      ],
      info: [],
      stateInfo: [],
      loading: true,
      errored: false,
    }
  },

  mounted() {
    this.getParkInfo();
  },

  methods: {
    getParkInfo() {
        axios.get('https://developer.nps.gov/api/v1/parks?&api_key=noz5ln8JUoAH3kv8uCu3qAYy7ZVpLsKx96u6G5Qr')
          .then(response => {
            this.info = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
      },
  },

  computed: {
    filteredParks(){
      if (!this.info) return [];
      return this.info.filter(park => park.designation == 'National Park')
    }
  },

}
</script>

<style>


</style>
