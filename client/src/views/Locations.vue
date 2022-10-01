<template>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-table fixed-header>
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
        <v-spacer/>
        <v-col cols="3">
          <v-form v-model="valid">
            <v-container>
              <v-text-field label="Name" prepend-inner-icon="mdi-tag-outline" :rules="textRules"/>
              <v-text-field label="Lat" prepend-inner-icon ="mdi-counter" type="number" :rules="numberRules"/>
              <v-text-field label="Lon" prepend-inner-icon ="mdi-counter" type="number" :rules="numberRules"/>
              <v-text-field label="Diagonal" prepend-inner-icon ="mdi-arrow-left-right-bold-outline" type="number" :rules="numberRules"/>
              <v-row class="mt-5">
                <v-btn color="info">Import</v-btn>
                <v-spacer />
                <v-btn color="error">Reset</v-btn>
                <v-btn color="success" class="ml-3">Save</v-btn>
              </v-row>
            </v-container>
          </v-form>
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
          valid: false as boolean,
          textRules: [
            (v: string) => !!v || 'Field is requiered!'
          ],
          numberRules: [
            (v: number) => !!v || 'Field is requiered!',
            (v: number) => v >= 0 || 'Only positive numbers are accepted!'
          ]
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
  