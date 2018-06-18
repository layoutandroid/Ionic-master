import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { DataServiceProvider } from '../../providers/data-service/data-service';

@Component({
  selector: 'page-barqrcode',
  templateUrl: 'barqrcode.html',
})
export class BarqrcodePage {
  products: any[] = [];
  selectedProduct: any;
  productFound:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner,
    public dataService: DataServiceProvider) {
      this.dataService.getProducts()
      .subscribe((response)=> {
          this.products = response
          console.log(this.products);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BarqrcodePage');
  }

  scan() {
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
      if(this.selectedProduct !== undefined) {
        this.productFound = true;
        console.log(this.selectedProduct);
      } else {
        this.selectedProduct = {};
        this.productFound = false;

      }
    }, (err) => {

    });
  }

}
