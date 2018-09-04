import { User } from './../model/user.model';
import { HomePage } from './../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { BlehomePage } from '../pages/blehome/blehome';
import { MapslocationPage } from '../pages/mapslocation/mapslocation';
import { GoogleauthPage } from '../pages/googleauth/googleauth';
import { TabPage } from '../pages/tabpage/tabpage';
import { Component,ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListPage } from '../pages/list/list';
// import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from '../pages/Register/register';
import { FacebookloginPage } from '../pages/facebooklogin/facebooklogin';
import { SpinnerloaderPage } from '../pages/spinnerloader/spinnerloader';
import { BarqrcodePage } from '../pages/barqrcode/barqrcode';
import { SpeechtotextPage } from '../pages/speechtotext/speechtotext';
import { CameraPage } from '../pages/camera/camera';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  SuperUser: firebase.User;
  pages: Array<{title: string, component: any}>;
  uber: Observable<User[]>;



   constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public firebaseProvider: FirebaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
       // used for an example of ngFor and navigation
       this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Tab', component: TabPage },
        { title: 'Login', component: LoginPage },
        { title: 'Register', component: RegisterPage },
        { title: 'List', component: ListPage},
        { title: 'Google Sign in', component: GoogleauthPage},
        { title: 'MapLocation', component: MapslocationPage},
        { title: 'facebooklogin', component: FacebookloginPage},
        { title: 'Ble', component: BlehomePage},
        { title: 'SpinnerLoader', component: SpinnerloaderPage},
        { title: 'BarQrcode', component: BarqrcodePage},
        { title: 'Speechtotext', component: SpeechtotextPage},
        { title: 'Camera & Filter', component: CameraPage},
      ];
      this.viewDidLoad();
  }

  viewDidLoad(){
     debugger;
    this.firebaseProvider.afAuth.authState.subscribe(
      (user) => {
          if (user && user.emailVerified) {
            this.SuperUser=user;
            this.firebaseProvider.setUsername();
            this.nav.setRoot(HomePage);
          }
          else{

            this.nav.setRoot(LoginPage);
          }
        },
        (error) => {
          this.nav.setRoot(LoginPage);
         }
      );

  }


  openPage(page) {

       this.nav.setRoot(page.component);

  }
  // openPage() {
  //   debugger;
  //   this.firebaseProvider.afAuth.authState.subscribe( user => {
  //     if (user && user.emailVerified) {
  //        this.firebaseProvider.setFreshUser(user);
  //        this.rootPage=HomePage
  //        this.SuperUser=user;
  //       (this.uber = this.firebaseProvider.findEmail(this.SuperUser.email.toLowerCase()))
  //       .subscribe ((res: User[]) => {
  //         console.log(res);
  //         this.username = res[0].Username;
  //       });
  //       // this.nav.setRoot(this.rootPage);
  //     } else {
  //       this.rootPage=LoginPage;
  //       this.nav.setRoot(this.rootPage);
  //     }
  //   },
  //  () => {
  //   this.rootPage=LoginPage;
  //   this.nav.setRoot(this.rootPage);
  //   console.log("logout error");
  //  }
  //  );

  // }

  logout(){
    debugger;
    this.firebaseProvider.signOut().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log("logout");

      this.firebaseProvider.username = "";
      this.nav.setRoot(LoginPage);
      },
    (error)=>{
      console.log("logout error");
    });
    }




}

