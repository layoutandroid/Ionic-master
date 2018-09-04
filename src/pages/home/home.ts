import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { User } from '../../model/user.model';
import { MyApp } from '../../app/app.component';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  uber: Observable<User[]>;

  constructor(platform: Platform,private nav: NavController, statusBar: StatusBar, splashScreen: SplashScreen,public firebaseProvider: FirebaseProvider) {
    platform.ready().then(() => {
       statusBar.styleDefault();
      splashScreen.hide();
    });
    this.openPage();
  }

  openPage() {


  }

}
