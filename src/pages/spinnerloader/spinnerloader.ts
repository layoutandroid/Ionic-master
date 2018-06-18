import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
@Component({
  selector: 'page-spinnerloader',
  templateUrl: 'spinnerloader.html',
})
export class SpinnerloaderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    debugger
    console.log('SpinnerloaderPage');
    // let loading;
    // loading = this.loadingCtrl.create({ content: "Logging in ,please wait..." });
    // loading.present();
  }
}
