import { BlehomePage } from './../pages/blehome/blehome';
import { MapslocationPage } from './../pages/mapslocation/mapslocation';
import { GoogleauthPage } from './../pages/googleauth/googleauth';
import { TabPage } from './../pages/tabpage/tabpage';
import { Component,ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/Register/register';
import { FacebookloginPage } from '../pages/facebooklogin/facebooklogin';
import { SpinnerloaderPage } from '../pages/spinnerloader/spinnerloader';
import { BarqrcodePage } from '../pages/barqrcode/barqrcode';
import { SpeechtotextPage } from '../pages/speechtotext/speechtotext';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
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
      ];
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

