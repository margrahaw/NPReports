<template>
  <div class="parkCampsites">
    {{ campgrounds[0].name }}
    <v-divider />
    {{ campgrounds[0].description }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'parkCampsite',
  data () {
    return {
      campgrounds: []
    }
  },

  created() {
    axios
    .get('https://developer.nps.gov/api/v1/campgrounds?&api_key=noz5ln8JUoAH3kv8uCu3qAYy7ZVpLsKx96u6G5Qr')
      .then(response => {
          this.campgrounds = response.data.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
}
</script>

