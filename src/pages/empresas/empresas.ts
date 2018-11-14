import { NavController, Platform, ViewController } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';
// import { GoogleMaps } from '../../providers/google-maps/google-maps';


import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { map } from 'rxjs/operator/map';
declare var google;


var EventUrl = "https://amheroku.herokuapp.com/zones";
interface zones {
  description: string,
  latitude: string,
  longitude: string,
}

var locations = [];

@Component({
  selector: 'page-empresas',
  templateUrl: 'empresas.html'
})


export class EmpresasPage {

  

  @ViewChild('map') mapElement: ElementRef;
  private map: any;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;
  googleMaps: any;

  constructor(private http: HttpClient, public navCtrl: NavController, public zone: NgZone, public maps: GoogleMaps, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ViewController) {
    this.searchDisabled = true;
    this.saveDisabled = true;

   
    
  }


  

  ionViewDidLoad(): void {

    // let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

    //   this.autocompleteService = new google.maps.places.AutocompleteService();
    //   this.placesService = new google.maps.places.PlacesService(this.maps.map);
    //   this.searchDisabled = false;

    // });

    // this.loadMap();

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

          // this.maps.map.setCenter({ lat: location.lat, lng: location.lng });

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
    locations = a.filter(a => a.description == "EMPRESA")});


    let latLng = new google.maps.LatLng(48.8513735, 2.3861292);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);    



    var  i;
    console.log(locations);
    for (i = 0; i < locations.length; i++) {
          console.log(locations[i]);

    }


    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Place({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
}




  getPosition(): void{
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
    .catch(error =>{
      console.log(error);
    });
  }

}





