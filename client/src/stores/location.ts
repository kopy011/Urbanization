import type { Location } from '@/types/location';
import { defineStore, storeToRefs } from 'pinia'

export const locationStore = defineStore('location', {
    state: () => ({
        locations: [] as Location[],
        edited: {} as Location
    }),

    actions: {
        async getLocations() {
            const locations: Location[] = []
            await fetch('http://localhost:8080/api/location', { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json' 
                }
            }).then(response => {
                if (response.ok) {
                  response.json().then(json => {
                    json.forEach((location: Location) => {
                        delete (location as any).__v;
                        locations.push(location);
                    });
                  });
                }
            });
            
            this.$state.locations = locations;
        },

        setEdited(location: Location){
            this.$state.edited = location;
        },

        resetForm() {
            this.$state.edited = {}
        },

        async saveLocation() {

            if(!this.$state.edited){
                return;
            }

            await fetch('http://localhost:8080/api/location/save', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(this.$state.edited)
            }).then(response => {
                if (response.ok) {
                    window.alert('saved successfully')
                }
            });
        }
    }
});