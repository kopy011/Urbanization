<template>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-table :height="500" fixed-header>
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
          <v-form v-model="valid" ref="form">
            <v-container>
              <v-text-field label="Id" prepend-inner-icon="mdi-identifier" :rules="[required]" v-model="edited.idx"/>
              <v-text-field label="Name" prepend-inner-icon="mdi-tag-outline" :rules="[required]" v-model="edited.name"/>
              <v-text-field label="Lat" prepend-inner-icon ="mdi-counter" type="number" :rules="[required]" v-model="edited.lat"/>
              <v-text-field label="Lon" prepend-inner-icon ="mdi-counter" type="number" :rules="[required]" v-model="edited.lon"/>
              <v-text-field label="Diagonal" prepend-inner-icon ="mdi-arrow-left-right-bold-outline" type="number" :rules="[required, positiveNumber]" v-model="edited.diagonal"/>
              <v-row class="mt-5">
                <v-btn color="info" @click="uploadMode=true">Import</v-btn>
                <v-spacer />
                <v-btn color="error" @click="resetForm()">Reset</v-btn>
                <v-btn color="success" class="ml-3" @click="save()">Save</v-btn>
              </v-row>
              <v-row class="mt-5" v-if="uploadMode">
                <v-col>
                  <v-row class="mt-5">
                    <v-file-input v-model="file" accept="text/csv" label="Select a .csv file you waunt to import!"/>
                  </v-row>
                  <v-row>
                    <v-btn color="error" @click="cancelUploadMode">Mégse</v-btn>
                    <v-spacer/>
                    <v-btn color="success" @click="upload">Feltöltés</v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
</template>
  
  <script lang="ts">
  import { mapActions, mapState, mapStores, mapWritableState } from 'pinia';
  import { defineComponent } from 'vue';
  import { locationStore } from '@/stores/location';
  
  export default defineComponent({
    name: 'Locations',

    data() {
        return {
          valid: false as boolean,
          uploadMode: false as boolean,
          file: [] as File[],
          required: (v: any) => !!v || 'Field is requiered!',
          positiveNumber: (v: number) => v >= 0 || 'Number must be greater than 0!'
        }
    },

    computed: {
      ...mapState(locationStore, ['locations']),
      ...mapWritableState(locationStore, ['edited'])
    },

    methods: {
      ...mapActions(locationStore, ['getLocations', 'resetForm', 'saveLocation', 'importLocations']),
      async save(){
        (this.$refs.form as any).validate();

        if(this.valid){
          await this.saveLocation();
          window.location.reload();
        }
      },
      cancelUploadMode(){
        this.uploadMode = false;
        this.file = [];
      },
      async upload(){
        await this.importLocations(this.file[0]);
        this.file = [];
      }
    }

  });
  </script>
  