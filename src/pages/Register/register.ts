// import {HttpParams} from '@angular/common/http/src/params';
// import { Component, ViewChild } from '@angular/core';
// import { Http, Headers,  } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Component, ViewChild } from '@angular/core';
import {HttpParams} from '@angular/common/http/src/params';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
@Injectable()
export class RegisterPage {

  private Name: string;
  private password: string;
  private Username: string;
  private Email: string;
  private error: string;
  apiUrl = 'http://72.249.170.12/BluetoothApi/api/Login/Login';
  constructor(public http: Http) {
  }
  //https://www.djamware.com/post/59924f9080aca768e4d2b12e/ionic-3-consuming-rest-api-using-new-angular-43-httpclient


  // ionViewDidLoad(): void {
  //   setTimeout(() => {
  //     this.email.setFocus();
  //   }, 500);
  // }

  register(): any {
    const obj = {
      UserName:this.Username ,
      Password:this.password,
      Name:this.Name,
      Email:this.Email
    }
    var headers = new Headers();
    headers.set('Content-type','application/json');
      console.log('doing'+ JSON.stringify(obj));
      debugger;
       const uri = 'http://72.249.170.12/BluetoothApi/api/Login/Login';
       this.http.post(uri,JSON.stringify(obj),{headers})
      .subscribe(res => {
        console.log("done");
        alert('done');
      }, (err) => {
        console.log(err);
      });
  }
}
