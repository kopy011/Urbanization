<template>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-table fixed-header density="comfortable">
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Diagonal
                </th>
                <th>
                  Lat
                </th>
                <th>
                  Lon
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="location in locations" :key="location.name">
                <td> {{ location.name }}</td>
                <td> {{ location.diagonal }}</td>
                <td> {{ location.lat }}</td>
                <td> {{ location.lon }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
</template>
  
  <script lang="ts">
  import { mapActions, mapState, mapStores } from 'pinia';
  import { defineComponent } from 'vue';
  import { locationStore } from '@/stores/location';
  
  export default defineComponent({
    name: 'Locations',

    data() {
        return{
        }
    },

    async mounted(){
      await this.getLocations();
    },

    computed: {
      ...mapStores(locationStore),
      ...mapState(locationStore, ['locations'])
    },

    methods: {
      ...mapActions(locationStore, ['getLocations'])
    }

  });
  </script>
  