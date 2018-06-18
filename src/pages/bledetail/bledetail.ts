import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';





@Component({
  selector: 'page-bledetail',
  templateUrl: 'bledetail.html',
})
export class BledetailPage {
  peripheral: any = {};
  statusMessage: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private ble: BLE,
              private toastCtrl: ToastController,
              private ngZone: NgZone) {
    let device = navParams.get('device');
    this.setStatus('Connecting to ' + device.name || device.id);

    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.onDeviceDisconnected(peripheral)
    );
  }



  onConnected(peripheral) {
    this.ngZone.run(() => {

      this.peripheral = peripheral;
      this.ble.startNotification(this.peripheral.id, '0003cdd0-0000-1000-8000-00805f9b0131', '0003cdd1-0000-1000-8000-00805f9b0131').subscribe(function (notificationData){
        let result=new Uint8Array(notificationData).buffer;
        let resulthex : any = Array.prototype.map.call(new Uint8Array(result), x => ('00' + x.toString(16)).slice(-2)).join('');
        console.log("Notification:"+  resulthex);
      alert(resulthex)

      }, function(error){
        console.log("Error Notification" + JSON.stringify(error));
      });
      let toast = this.toastCtrl.create({
        message: peripheral.services ,
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      console.log('Services ' + JSON.stringify(peripheral.services))
    });

    // let characteristic=peripheral.services.characteristic[5]
    // this.ble.startNotification(this.peripheral.id,'cdd0','cdd1')
      // Update the UI with the current state

  }
  onDeviceDisconnected(peripheral) {
    let toast = this.toastCtrl.create({
      message: 'The peripheral unexpectedly disconnected',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  // Disconnect peripheral when leaving the page
  ionViewWillLeave() {
    console.log('ionViewWillLeave disconnecting Bluetooth');
    this.ble.disconnect(this.peripheral.id).then(
      () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
      () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
    )
  }
  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }
//  buf2hex(buffer) { // buffer is an ArrayBuffer
//     return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
//   }
  sendcommand() {
    let value = "6802026843024516";
    let buffer=this.stringToBytes(value) ;
    console.log('command ' + value + "buffer "+ buffer);
    let toast1 = this.toastCtrl.create({
      message: "write command"+value ,
      duration: 1000,
      position: 'middle'
    });
    toast1.present();
    // this.ble.read(this.peripheral.id, '0003cdd0-0000-1000-8000-00805f9b0131', '0003cdd1-0000-1000-8000-00805f9b0131').then(function (data){
    //   //console.log("READ:" + String.fromCharCode.apply(null, new Uint8Array(data)));
    //   console.log ("Read" + JSON.stringify(data));
    // }, function(error) {
    //   console.log("Error Read" + JSON.stringify(error));
    // });
    // this.ble.read(this.peripheral.id, '0003cdd0-0000-1000-8000-00805f9b0131', '0003cdd1-0000-1000-8000-00805f9b0131').then(function (data){
    //   //console.log("READ:" + String.fromCharCode.apply(null, new Uint8Array(data)));
    //   console.log ("Read" + JSON.stringify(data));
    // }, function(error) {
    //   console.log("Error Read" + JSON.stringify(error));
    // });
// for(let i=0;i<buffer.byteLength;i++)
// {
//   console.log( "buffer "+ buffer.slice[i]);
// }
    this.ble.writeWithoutResponse(this.peripheral.id, "0003cdd0-0000-1000-8000-00805f9b0131", "0003cdd2-0000-1000-8000-00805f9b0131",buffer).then(
      (function (data){
        //console.log("READ:" + String.fromCharCode.apply(null, new Uint8Array(data)));
        console.log ("write" + JSON.stringify(data));
      }),
      function(error) {
        console.log("Error  " + JSON.stringify(error));
      }
    );


  }
//    stringToBytes(string) {
//     var array = new Uint8Array(string.length);
//     for (var i = 0, l = string.length; i < l; i++) {
//         array[i] = string.charCodeAt(i);
//         console.log( "buffer "+ array[i] );
//      }
//      return array.buffer;
//  }
 stringToBytes(string) {
  var array = new Int8Array(string.length/2);

  for (var i = 0; i < string.length; i++) {
    if(i%2==0)
    {
      let subsrting = string.substr(i, 2);
      console.log( "substring "+ subsrting);
      array[i/2] = parseInt(subsrting, 16);
      console.log( "buffer "+ array[i]);
    }

  }
  // array[0]=104;
  // array[1]=2;
  // array[2]=2;
  // array[3]=104;
  // array[4]=67;
  // array[5]=2;
  // array[6]=69;
  // array[7]=22;
  console.log( "buffer "+ array);
 // console.log( "buffer "+ new Uint8Array(array));
   return array.buffer;
}

 bytesToString(buffer) {
  return String.fromCharCode.apply(null, new Uint8Array(buffer));
}
}
