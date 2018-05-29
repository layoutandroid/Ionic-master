import { ViewController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';


@Component({
  selector: 'page-model',
  templateUrl: 'model.html'
})
export class ModelPage {
public title;
public note;
  constructor(public viewCtrl : ViewController,public navParams: NavParams ) {
  }

  ionViewDidLoad(): void {
    console.log(this.navParams.get('message'));
    this.title=this.navParams.get('message').title;
    this.note=this.navParams.get('message').note;
  }
  public closeModal(){
    this.viewCtrl.dismiss({
      title: this.title,
      note: this.note
    });
}

updatesubmit(): void {
  this.viewCtrl.dismiss({
    title: this.title,
    note: this.note
  });
}

}
