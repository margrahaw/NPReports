<template>
  <div class="parkInfo">
    <v-dialog
      width="600"
      height="600"
      v-model="dialog"
    >
      <v-btn
        class="tolowercase"
        flat
        small
        slot="activator"
      >
      {{ park.fullName }}
      </v-btn>
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{ park.fullName}}
          <v-spacer></v-spacer>
          <v-btn small @click="parkCampsites">Camping</v-btn>
        </v-card-title>

        <v-card-text>
          <div class="mb-4">
            <p class="headline">Description</p>
            {{ park.description }}
          </div>
          <div class="mb-4">
            <p class="headline">Weather</p>
            {{ park.weatherInfo }}
          </div>
          <div class="mb-4">
            <p class="headline">Offical Website</p>
            <a :href="park.url">{{ park.url }}</a>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['park'],
  data () {
    return {
      dialog: false
    }
  },

  methods: {
    parkCampsites() {
      this.$router.push('camping')
    }
  }
}
</script>

<style scoped>
.tolowercase {
  text-transform: capitalize;
}
</style>



