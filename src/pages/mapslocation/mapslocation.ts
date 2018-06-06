import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
declare var google: any;
/**
 * Generated class for the MapslocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-mapslocation',
  templateUrl: 'mapslocation.html',
})
export class MapslocationPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  items: any;
  constructor(public navCtrl: NavController,
    public platform: Platform,
    private geolocation: Geolocation,
    private device: Device) {
     debugger;
    platform.ready().then(() => {
      debugger;
      this.initMap();
    });
  }
  initMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let mylocation  = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      debugger;
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 18,
        center: mylocation
      });
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      this.updateGeolocation(this.device.uuid, data.coords.latitude,data.coords.longitude);
      let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
      let image = 'assets/imgs/pin.png';
      this.addMarker("XDuce",updatelocation,image);
      let latLng2 = new google.maps.LatLng(23.033048,72.562212);
      this.addMarker("Municipal Market",latLng2,image);
      this.setMapOnAll(this.map);
    });
  }
  addMarker(name,location, image) {
    let marker = new google.maps.Marker({
      title:name,
      position: location,
      map: this.map,
      icon: image
    });
    this.markers.push(marker);
    this.addInfoWindowToMarker(marker)
  }
  addInfoWindowToMarker(marker) {
    var infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1></div>';
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  clearMarkers() {
    this.setMapOnAll(null);
  }
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }
  updateGeolocation(uuid, lat, lng) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapslocationPage');
  }

}
