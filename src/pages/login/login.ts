import {HttpParams} from '@angular/common/http/src/params';
import { Component, ViewChild } from '@angular/core';
//import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Http, Headers } from '@angular/http';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('email') email: any;
  private username: string;
  private password: string;
  private error: string;
  apiUrl = 'http://72.249.170.12/BluetoothApi/api/Login/Login';
  constructor(public http: Http) {
  }
  //https://www.djamware.com/post/59924f9080aca768e4d2b12e/ionic-3-consuming-rest-api-using-new-angular-43-httpclient


  ionViewDidLoad(): void {
    setTimeout(() => {
      this.email.setFocus();
    }, 500);
  }

  login(): void {
    const obj = {
<<<<<<< HEAD
      EmailId: "a@b.c"
      }
      var headers = new Headers();
      headers.set('Content-type', 'application/json')
      headers.append('Accept', 'application/json ');
        console.log('doing'+ JSON.stringify(obj));

         const uri = 'http://72.249.170.12/BluetoothApi/api/Login/ForgotPassword';
         this.http.post(uri, JSON.stringify(obj),{headers})
=======
      UserName: "snehal",
      Password: "123456"
    }
    var headers = {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods" : "POST, GET, OPTIONS, PUT",
      "Content-Type": "application/json",
      "Accept": "application/json"
  }
        console.log('doing'+ JSON.stringify(obj));
        debugger;
         const uri = 'http://72.249.170.12/BluetoothApi/api/Login/Login';
         this.http.post(uri,JSON.stringify(obj),{headers})
>>>>>>> 4f7fde031737870922bcfb58a18ec5ee42b86631
        .subscribe(res => {
          console.log("done");
        }, (err) => {
          console.log(err);
        });
  }
}
