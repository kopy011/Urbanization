import type { Location } from '@/types/location';
import { defineStore } from 'pinia';

export const locationStore = defineStore({
    id: 'location',
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

        setEdited(location: Location) {
            this.$state.edited = location;
        },

        resetForm() {
            this.$state.edited = {lat: 0, lon: 0, diagonal: 0}
        },

        async saveLocation() {

            if (!this.$state.edited) {
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

            this.resetForm();
        },

        async importLocations(file: File) {

            if (file.type !== 'text/csv') {
                window.alert('Only .csv files are accepted!');
                return;
            }

            let data = (await file.text()).split('\n');
            const locations: Location[] = [];

            data = data.splice(1, data.length-1);

            data.forEach((line: string) => {
                line.replace("\r", "");

                const lineData = line.split(";");

                locations.push({
                    idx: lineData[0],
                    lat: parseFloat(lineData[1]),
                    lon: parseFloat(lineData[2]),
                    name: lineData[3],
                    diagonal: parseInt(lineData[4])
                })
            });

            await fetch('http://localhost:8080/api/location/import', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(locations)
            }).then(response => {
                if (response.ok) {
                    window.alert('imported successfully')
                }
            });
        }
    }
});