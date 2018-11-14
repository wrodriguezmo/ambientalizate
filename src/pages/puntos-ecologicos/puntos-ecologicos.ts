import { NavController, Platform, ViewController } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker,
    Polygon,
    ILatLng
} from '@ionic-native/google-maps';
import { HttpClient } from '@angular/common/http';


var EventUrl = "https://amheroku.herokuapp.com/zones";
interface zones {
    description: string,
    latitude: string,
    longitude: string,
}

var locations = [];

@Component({
    selector: 'page-puntos-ecologicos',
    templateUrl: 'puntos-ecologicos.html'
})

export class PuntosEcologicosPage {

    map: GoogleMap;
    coordsActual: Coordinates;

    latitude: number;
    longitude: number;
    autocompleteService: any;
    placesService: any;
    query: string = '';
    places: any = [];
    searchDisabled: boolean;
    saveDisabled: boolean;
    location: any;

    constructor(private http: HttpClient,
        public navCtrl: NavController,
        public zone: NgZone,
        public maps: GoogleMaps,
        public platform: Platform,
        public geolocation: Geolocation,
        public viewCtrl: ViewController) {
        this.searchDisabled = true;
        this.saveDisabled = true;
    }

    ionViewDidLoad(): void {
        this.loadMap();
    }

    selectPlace(place) {

        this.places = [];

        let location = {
            lat: null,
            lng: null,
            name: place.name
        };

        this.placesService.getDetails({ placeId: place.place_id }, (details) => {

            this.zone.run(() => {

                location.name = details.name;
                location.lat = details.geometry.location.lat();
                location.lng = details.geometry.location.lng();
                this.saveDisabled = false;

                this.location = location;

            });

        });

    }

    searchPlace() {

        this.saveDisabled = true;

        if (this.query.length > 0 && !this.searchDisabled) {

            let config = {
                types: ['geocode'],
                input: this.query
            }

            this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

                if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {

                    this.places = [];

                    predictions.forEach((prediction) => {
                        this.places.push(prediction);
                    });
                }

            });

        } else {
            this.places = [];
        }

    }

    save() {
        this.viewCtrl.dismiss(this.location);
    }

    close() {
        this.viewCtrl.dismiss();
    }

    loadMap() {
        this.http.get<zones[]>(EventUrl).subscribe(a => {
            locations = a.filter(ab => ab.description == "PUNTO");

            this.geolocation.getCurrentPosition()
                .then((resp) => {
                    console.log(resp);
                    this.coordsActual = resp.coords;
                    return this.createMap(resp.coords);
                }).then((newMap) => {
                    this.map = newMap;

                    // }).then((markerCreate: Marker) => {
                    //     marker = markerCreate;
                    //     marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                    //         alert('clicked');
                    //     });
                    this.geolocation.watchPosition().subscribe((data) => {
                        console.log(data.coords);
                        marker.setPosition({ lat: data.coords.latitude, lng: data.coords.longitude });
                    });
                });
            locations.forEach(location => {

                // return this.map.addMarker({
                //     title: 'Ionic',
                //     icon: 'blue',
                //     animation: 'DROP',
                //     position: {
                //         lat: this.coordsActual.latitude,
                //         lng: this.coordsActual.longitude
                //     }
                // })
            })

        });


      
        var marker, i;
    }

    createMap(coords) {
        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: coords.latitude,
                    lng: coords.longitude
                },
                zoom: 18,
                tilt: 30
            }
        };
        return GoogleMaps.create('map_canvas', mapOptions);
    }

    getPosition(): void {
        this.map.getMyLocation()
            .then(response => {
                this.map.moveCamera({
                    target: response.latLng
                });
                this.map.addMarker({
                    title: 'My Position',
                    icon: 'blue',
                    animation: 'DROP',
                    position: response.latLng
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

}