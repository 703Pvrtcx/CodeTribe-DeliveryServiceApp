import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var L;

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.page.html',
  styleUrls: ['./leaflet.page.scss'],
})
export class LeafletPage implements OnInit {

 showmap: boolean;
  constructor(private router: Router) { 
//     var mymap = L.map('mapid').setView([-25.483435,27.836194], 13);
//     L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoiNzAzcHZydGN4IiwiYSI6ImNraG1qZ3EwOTBnN2kycHFxMzZmbjVpMngifQ.JjLGH4023AtntYZoKcQSVw'
   
// }).addTo(mymap);

//     var marker = L.marker([-25.483435,27.836194]).addTo(mymap);
//     var circle = L.circle([-25.489512,27.85397], {
//       color: 'red',
//       fillColor: '#f03',
//       fillOpacity: 0.5,
//       radius: 500
// }).addTo(mymap);

//       marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
//       circle.bindPopup("I am a circle.");

//       var popup = L.popup();

//       function onMapClick(e) {
//           popup
//               .setLatLng(e.latlng)
//               .setContent("You clicked the map at " + e.latlng.toString())
//               .openOn(mymap);

//       }
//       mymap.on('click', onMapClick);
  }
  ngOnInit() {

    L.mapbox.accessToken = 'pk.eyJ1IjoiNzAzcHZydGN4IiwiYSI6ImNraG1qZ3EwOTBnN2kycHFxMzZmbjVpMngifQ.JjLGH4023AtntYZoKcQSVw';
    var map = L.mapbox.map('map')
  .setView([0, 0], 4)
  .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
  L.control.locate().addTo(map);

  }
}
