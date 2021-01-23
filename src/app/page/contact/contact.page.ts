import { Feature, MapboxService } from './../../services/mapbox.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import MapboxDirections from '@mapbox/mapbox-gl-directions';
import MapboxGeocoder from '@mapbox/mapbox-gl-supported';
import { MapboxDraw } from '@mapbox/mapbox-gl-supported';
import { AngularFirestore ,AngularFirestoreCollection} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import  firebase from 'firebase';
import { UserAddressService } from 'src/app/services/user-address.service';
declare  var MapboxDirections : MapboxDirections;
declare var MapboxGeocoder : MapboxGeocoder;
declare var MapboxDraw: MapboxDraw;
declare var mapboxgl;
declare var L;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {


  checkAddress ="";

  delivery = false;
  collect = true;
  coordinates : any;
  list : any;
  selectedAddress : string= "";
  lat;
  lng;


  addresses = [];
  clicked: boolean;
  
  user = {} as UserInfo;
  public now: any = (new Date()).toISOString();
  constructor(private modalCtrl: ModalController,
    private asf: AngularFirestore,
    private mapDoa: MapboxService,public router: Router, private address: UserAddressService,
    ) { 
      this.selectedAddress = '';  
    }
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
    this.clicked = false;
    this.selectedAddress = '';
  }
  close() {
    this.selectedAddress = '';
    this.modalCtrl.dismiss();
    this.close();
  }
  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapDoa.search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.coordinates = features.map(feat => feat.geometry)
          this.addresses = features.map(feat => feat.place_name)
          this.list = features;
          console.log(this.list)
        });
    } else {
      this.addresses = [];
    }
  }
  addressCheck(event){
    this.checkAddress = event.target.value;
    console.log("info",this.checkAddress);
}
onSelect(address, i) {
  this.selectedAddress = address;
  // selectedcoodinates =
  console.log("lng:" + JSON.stringify(this.list[i].geometry.coordinates[0]))
  console.log("lat:" + JSON.stringify(this.list[i].geometry.coordinates[1]))
  this.lng = JSON.stringify(this.list[i].geometry.coordinates[0])
  this.lat = JSON.stringify(this.list[i].geometry.coordinates[1])
  // this.user.coords = [this.lng,this.lat];
  this.coordinates =[this.lng,this.lat];
  console.log("index =" + i)
  console.log(this.selectedAddress)
  // this.user.address = this.selectedAddress;
  this.addresses = [];

  this.clicked = true;
}
saveAddress(){
  this.addloc(this.selectedAddress);
  this.clicked = false;
  this.addresses = [];
  this.router.navigateByUrl("sidemenu/tabs/profile-tab");
}
addloc(addressSel){
  this.user.userID = firebase.auth().currentUser.uid.toString();
  this.user.key = this.asf.createId();
  this.user.createdDate = this.now;
  this.asf.collection("UserAddress").doc(this.user.key).set({
    userID: this.user.userID,
    createdDate: this.user.createdDate,
    name:  addressSel,
    address: this.coordinates
  })
    
}



}
