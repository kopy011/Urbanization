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

.mapboxgl-marker {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid gray;
  background-color: lightblue;
}
</style>
  
<script lang="ts">
import { locationStore } from '@/stores/location';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { defineComponent } from 'vue';
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import type { Location } from '@/types/location';

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
      center: [this.locations[0].lon, this.locations[0].lat],
      zoom: 15,
    });

    map.on('load', () => {
      this.drawMarkers(map, this.locations);
      this.drawRects(map, this.locations);
    })
  },

  computed: {
    ...mapState(locationStore, ['locations']),
    ...mapWritableState(locationStore, ['edited'])
  },

  methods: {
    ...mapActions(locationStore, ['saveLocation', 'setEdited']),

    drawMarkers(map: any, locations: Location[]) {
      locations.forEach((location) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([location.lon, location.lat])
          .addTo(map);
      });
    },

    drawRects(map: any, locations: Location[]) {
      this.locations.forEach((location) => {
        const x = location.diagonal / 2 / 111111;
        map.addSource(`rect_${location._id}`, {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              // These coordinates outline Maine.
              'coordinates': [
                [
                  [location.lon - x, location.lat + x],
                  [location.lon + x, location.lat + x],
                  [location.lon + x, location.lat - x],
                  [location.lon - x, location.lat - x],
                ]
              ]
            }
          }
        });

        // Add a new layer to visualize the polygon.
        map.addLayer({
          'id': `rect_${location._id}`,
          'type': 'fill',
          'source': `rect_${location._id}`, // reference the data source
          'layout': {},
          'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
          }
        });

        map.on('click', `rect_${location._id}`, (e: any) => {
          this.setDesc(location._id);
        });
      })
    },

    async setDesc(id?: string) {
      const locationToEdit: Location = this.locations.find((location) => location._id == id) ?? {} as Location;
      this.setEdited(JSON.parse(JSON.stringify(locationToEdit)));
      const desc = prompt('Enter description');
      console.log(desc);
      this.edited.description = desc ?? "sample";
      await this.saveLocation();
    }
  }
});
</script>
  