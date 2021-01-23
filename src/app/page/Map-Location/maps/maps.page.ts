import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
declare var mapboxgl;
declare var L;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  constructor(private router: Router,
    private modalCtrl: ModalController, ) {}

  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiNzAzcHZydGN4IiwiYSI6ImNraG1qZ3EwOTBnN2kycHFxMzZmbjVpMngifQ.JjLGH4023AtntYZoKcQSVw';
    var map = new mapboxgl.Map({
          container: 'map',
           style: 'mapbox://styles/mapbox/streets-v11',
           center: [-25.483435,27.836194], // starting position [lng, lat]
      });
      map.addControl(new  mapboxgl.NavigationControl());
      map.addControl(new mapboxgl.FullscreenControl());
      
      // Add geolocate control to the map.
      map.addControl( new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true 
        })
        );
  }
  
  goLeaflet(){
    this.router.navigateByUrl('leaflet');
  }
} 
