<template>
  <v-app>
    <v-app-bar color="info">
        <v-btn @click="openView('home')">
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>
        <v-btn @click="openView('locations')">
          <v-icon>
            mdi-format-list-bulleted
          </v-icon>
        </v-btn>
        <v-btn @click="openView('map')">
          <v-icon>
            mdi-map-outline
          </v-icon>
        </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data () {
    return {
      //
    }
  },

  methods: {
    openView(view: string){
      this.$router.push({name: view})
    }
  }
})
</script>
