import { ModelPage } from './../Model/model';
import { Component} from '@angular/core';
import { NavController, NavParams, List, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public searchTerm;
  searchControl: FormControl;
  films: Observable<any>;
  selectedItem: any;
  Tags:any;
  icons: string[];
  items: Array<{title: string, note: string}>;
  itemtemp: Array<{title: string, note: string}>;
  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient: HttpClient,public modalCtrl : ModalController) {
    // If we navigated to this page, we will have an item available as a nav param
    // this.selectedItem = navParams.get('item');

    // // Let's populate this page with some filler content for funzies
    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];

    // this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
    this.searchControl = new FormControl();
    this.films = this.httpClient.get('https://swapi.co/api/films');
    this.films
    .subscribe(data => {
      debugger;
      console.log('my data: ', data);
    //   this.Tags=JSON.stringify(data);
    //  // console.log('my data: ', this.Tags);
    //  var datanew =JSON.parse(this.Tags);
    this.items = [];
    for (let item of data.results)
    {
      console.log("title",item.title);
      this.items.push({
            title: 'Item ' + item.title,
            note: 'This is item #' + item.episode_id
          });
    }
    this.itemtemp =this.items
    })
  }
  ionViewDidLoad() {
    this.searchControl.valueChanges.debounceTime(100).subscribe(search => {
    this.items=this.itemtemp;
        this.setFilteredItems();
    });
}
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(ListPage, {
    //   item: item
    // });
    const index: number = this.items.indexOf(item);
    alert(index);
    this.items.splice(index,1);
  }
  itemTappededit(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(ListPage, {
    //   item: item
    // });
    const index: number = this.items.indexOf(item);
    alert(index);
    this.items.splice(index,1,{
      title: 'Item Dummy',
      note: 'This is item # dummy'
    });
  }

  public openModal(event, item){
  this.index = this.items.indexOf(item);
    var data = { message : item };
    var modalPage = this.modalCtrl.create(ModelPage,data);
    modalPage.onDidDismiss(data => {
      console.log(data);
      this.items.splice(this.index,1,{
        title: data.title,
        note: data.note
      });
 });
    modalPage.present();
}
setFilteredItems() {
this.items= this.items.filter((item) => {
    return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
});
}

doInfinite(infiniteScroll) {
  this.films = this.httpClient.get('https://swapi.co/api/films');
    this.films
    .subscribe(data => {
      debugger;
      console.log('my data: ', data);
    //   this.Tags=JSON.stringify(data);
    //  // console.log('my data: ', this.Tags);
    //  var datanew =JSON.parse(this.Tags);
    this.items = [];
    for (let item of data.results)
    {
      console.log("title",item.title);
      this.items.push({
            title: 'Item ' + item.title,
            note: 'This is item #' + item.episode_id
          });
    }
    this.itemtemp =this.items
    },() => console.log('Next Page Loading completed'))
infiniteScroll.complete();
}
}
