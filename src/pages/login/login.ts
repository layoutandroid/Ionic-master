import {HttpParams} from '@angular/common/http/src/params';
import { Component, ViewChild } from '@angular/core';
import { Http, Headers,  } from '@angular/http';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('email') email: any;
  public username: string;
  public password: string;
  public error: string;
  apiUrl = 'http://72.249.170.12/BluetoothApi/api/Login/Login';
  passwordType: string = 'password';
  paIcon: string = 'eye-off';

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
      "UserName":"admin",
      "Password":"admin"
     }
  var headers = new Headers();
      headers.set('Content-type','application/json');
        console.log('doing'+ JSON.stringify(obj));
        debugger;
         const uri = 'http://72.249.170.12/HRDCServiceOnline/user.svc/UserLogin';
         this.http.post(uri,JSON.stringify(obj),{headers})
        .subscribe(res => {
          console.log("done");
          alert('done');
        }, (err) => {
          console.log(err);
        });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.paIcon = this.paIcon === 'eye-off' ? 'eye' : 'eye-off';
}
}
