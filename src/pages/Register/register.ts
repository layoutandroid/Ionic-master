import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { User } from '../../model/user.model';
// import {HttpParams} from '@angular/common/http/src/params';
// import { Component, ViewChild } from '@angular/core';
// import { Http, Headers,  } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Component } from '@angular/core';
// kimport {HttpParams} from '@angular/common/http/src/params';
//import { AlertController } from '../../../node_modules/ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { NavController,NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
@Injectable()
export class RegisterPage {

  public Name: string="";
  public password: string="";
  public Username: string="";
  public Email: string="" ;
  public u_email: string="";
  public flag : boolean=false;
  public pre_user:  firebase.User
  public uber : Observable<User[]>;
  public m_user : User[];

  signupError: string;
 // private error: string;
 private user : Observable<any[]>;
  apiUrl = 'http://72.249.170.12/BluetoothApi/api/Login/Login';
  constructor(public navParams: NavParams,private navCtrl: NavController,public http: Http, public firebaseProvider: FirebaseProvider) {

           if(navParams.get("email") && navParams.get("email")!=="null")  {
            debugger;
            this.u_email = this.firebaseProvider.Superuser.email.toLowerCase();
            this.Email = this.u_email;
            this.password="null";
            if(this.u_email && this.u_email.length!==0){
              this.flag= true;
            }

          }







  }

  //https://www.djamware.com/post/59924f9080aca768e4d2b12e/ionic-3-consuming-rest-api-using-new-angular-43-httpclient

  // ionViewDidLoad(): void {
  //   setTimeout(() => {
  //     this.email.setFocus();
  //   }, 500);
  // }

  // register(): any {
  //   const obj = {
  //     UserName:this.Username ,
  //     Password:this.password,
  //     Name:this.Name,
  //     Email:this.Email
  //   }
  //   var headers = new Headers();
  //   headers.set('Content-type','application/json');
  //     console.log('doing'+ JSON.stringify(obj));
  //     debugger;
  //      const uri = 'http://72.249.170.12/BluetoothApi/api/Login/Login';
  //      this.http.post(uri,JSON.stringify(obj),{headers})
  //     .subscribe(res => {
  //       console.log("done");
  //       alert('done');
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }

  // addUSer(){
  //   var obj : User;
  //    obj = new User();
  //    if(this.flag)
  //   {
  //     obj.Email= this.u_email;
  //     obj.LoginType= "gmail";
  //     obj.Password= "null";
  //   }
  //    else
  //   {
  //     obj.Email= this.u_email;
  //     obj.LoginType= "email";
  //     obj.Password= this.password;

  //   }
  //    obj.Name= this.Name;
  //    obj.Username= this.Username;

  //   this.firebaseProvider.addUser(obj);
  // }

//{}
    // newSongRef.set({
    //   id: newSongRef.key,
    //   title: data.title
    // });
    // let prompt = this.alertCtrl.create({
    //   title: 'Submit the details',
    //   message: "Are you confirmed to submit ? ",
    //   inputs: [
    //     {
    //       name: 'title',
    //       placeholder: 'Title'
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       handler: data => {
    //         console.log('Cancel clicked');

    //       }
    //     },
    //     {
    //       text: 'Save',

    //       handler: data => {
    //         const obj = {
    //           UserName:this.Username ,
    //           Password:this.password,
    //           Name:this.Name,
    //           Email:this.Email
    //         }
    //         const newSongRef = this.user.push(obj);
    //          console.log(""+newSongRef.key+","+data.title);
    //         // newSongRef.set({
    //         //   id: newSongRef.key,
    //         //   title: data.title
    //         // });

    //       }
    //     }
    //   ]
    // });
    // prompt.present();
  //}


  signup() {
    debugger;
    if(this.flag)
    {
      this.saveData();
    }
    else{
      let credentials = {
        Email: this.Email.toLowerCase(),
        password: this.password
      };
      this.firebaseProvider.signUp(credentials).then(
        (user) => {

          this.firebaseProvider.sendEmailVerificationLink(user.user).then(
            (ref)=>{

              this.saveData();
            },
            (error)=>{
               alert(error.message);
            }
          );
        },
        error => {
          alert(error.message);this.signupError = error.message
        }
      );
    }


}

saveData(){
           var obj : User;
           obj = new User();
           if(this.flag)
            {
              obj.Email= this.u_email.toLowerCase();
              obj.LoginType= "gmail";
              obj.Password= "null";
            }
             else
            {
              obj.Email= this.Email.toLowerCase();
              obj.LoginType= "email";
              obj.Password= this.password;

            }
            obj.Name= this.Name;
            obj.Username= this.Username;

            this.firebaseProvider.addUser(obj).then(
              () => {
                if(!this.flag)
                {
                  alert("Please varifiy your email address.Check your mailbox for that.");
                  this.navCtrl.setRoot(LoginPage);
                }
                else{
                  this.navCtrl.setRoot(HomePage);
                }
              },
              error => {
                alert(error.message);
              }
            );
             //console.log("DataSaved:"+newSongRef.key+"--"+obj);
            // newSongRef.set({
            //   id: newSongRef.key,
            //   title: data.title
            // });

}


valid() {
if(this.Email.length!==0)
  return false;
  if(this.Name.length!==0)
    return false;
    if(this.Username.length!==0)
      return false;
        else
        return true;

}



}
