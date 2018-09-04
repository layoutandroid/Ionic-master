import { ModelPage } from '../Model/model';
import { Component} from '@angular/core';
import { NavController, NavParams, List, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';
import {HttpParams} from '@angular/common/http/src/params';

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
  pageno:number=0;
  lastcallpageno:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient: HttpClient,public modalCtrl : ModalController,public http: Http) {
    this.items = [];
    const obj = {UserId: 1, ParentId: 1, Page: 0, PageSize: 10}
    this.searchControl = new FormControl();
    this.apipaggingcall(this.pageno);
   // this.films = this.httpClient.get('https://swapi.co/api/films');
  //  var headers = new Headers();
  //     headers.set('Content-type','application/json');
  //       console.log('doing'+ JSON.stringify(obj));
  //       debugger;
  //        const uri = 'http://72.249.170.12/InsuranceCalicaApi/api/Quotation/GetQuotationListByTLTC';
  //        this.http.post(uri,JSON.stringify(obj),{headers})
  //  // this.films
  //   .subscribe(data => {
  //     debugger;
  //     var json=data;
  //     console.log('my data: ', json);
  //     alert(data.json()['ResponseData'][0].QuotationId);
  //   //   this.Tags=JSON.stringify(data);
  //   //  // console.log('my data: ', this.Tags);
  //   //  var datanew =JSON.parse(this.Tags);
  //   this.items = [];
  //   for (let item of data.json()['ResponseData'])
  //   {
  //     console.log("title",item.QuotationCode);
  //     this.items.push({
  //           title: 'Item ' + item.QuotationCode,
  //           note: 'This is item #' + item.QuotationId
  //         });
  //   }
  //   this.itemtemp =this.items
  //   })
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
  if(this.lastcallpageno!=this.pageno)
  {
    this.apipaggingcall(this.pageno);
    infiniteScroll.complete();
  }else{

    infiniteScroll.complete();
    this.ionViewDidLoad();
  }


}

apipaggingcall(pageno)
{
  this.lastcallpageno=pageno;
  const obj = {UserId: 1, ParentId: 1, Page: pageno, PageSize: 10}
  this.searchControl = new FormControl();
 // this.films = this.httpClient.get('https://swapi.co/api/films');
 var headers = new Headers();
    headers.set('Content-type','application/json');
      console.log('doing'+ JSON.stringify(obj));
      debugger;
       const uri = 'http://72.249.170.12/InsuranceCalicaApi/api/Quotation/GetQuotationListByTLTC';
       this.http.post(uri,JSON.stringify(obj),{headers})
 // this.films
  .subscribe(data => {
    debugger;
    var json=data;
    console.log('my data: ', json);
  //   this.Tags=JSON.stringify(data);
  //  // console.log('my data: ', this.Tags);
  //  var datanew =JSON.parse(this.Tags);
  if( data.json()['ResponseData'].length>0)
  {
    for (let item of data.json()['ResponseData'])
    {
      console.log("title",item.QuotationCode);
      this.items.push({
            title: 'Item ' + item.QuotationCode,
            note: 'This is item #' + item.QuotationId
          });
    }
   this.itemtemp =this.items
    this.pageno++;
    alert('call');
  }
  })
}
}
