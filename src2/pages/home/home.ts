import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;

  constructor(
    public navCtrl: NavController,
    private googleMaps: GoogleMaps,
    public geolocation: Geolocation
    ) {

  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){ 
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 4.7351515, // default location
          lng: -74.0514453 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.getPosition();
    })
    .catch(error =>{
      console.log(error);
    });
  }

  getPosition(): void{
    // this.geolocation.getCurrentPosition().then(pos => {
    //   console.log('lat: '+pos.coords.latitude+', lon: '+pos.coords.longitude);
    // });

    this.map.getMyLocation()
    .then(response =>{
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'Yo',
        icon: 'blue',
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error =>{
      console.log(error);
    });
  }
}
