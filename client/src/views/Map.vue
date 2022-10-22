<template>
  <div id="map"></div>
</template>

<style lang="css">
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
  
<script lang="ts">
import { locationStore } from '@/stores/location';
import { mapActions } from 'pinia';
import { defineComponent } from 'vue';
import mapboxgl from 'mapbox-gl'

export default defineComponent({
  name: 'Map',

  data() {
    return {
      api_key: "api_key" as string
    }

  },

  async mounted() {
    mapboxgl.accessToken = this.api_key;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [17.908090, 47.088336],
      zoom: 15,
    });

  }
});
</script>
  