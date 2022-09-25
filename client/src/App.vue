<template>
  <v-app>
    <v-main>
      <v-app-bar color="info">
        <v-btn>
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>
        <v-btn>
          <v-icon>
            mdi-format-list-bulleted
          </v-icon>
        </v-btn>
        <v-btn>
          <v-icon>
            mdi-map-outline
          </v-icon>
        </v-btn>
      </v-app-bar>
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
})
</script>
