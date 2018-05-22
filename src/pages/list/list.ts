import { Component } from '@angular/core';
import { NavController, NavParams, List } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  films: Observable<any>;
  selectedItem: any;
  Tags:any;
  icons: string[];
  items: Array<{title: string, note: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient: HttpClient) {
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
    })

  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
