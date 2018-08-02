import { BledetailPage } from './../pages/bledetail/bledetail';
import { BlehomePage } from './../pages/blehome/blehome';
import { GoogleauthPage } from './../pages/googleauth/googleauth';
import { HttpClient } from '@angular/common/http';
import { TabPage } from './../pages/tabpage/tabpage';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BLE } from '@ionic-native/ble';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { ContactPage } from './../pages/contact/contact';
import { AboutPage } from './../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/Register/register';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ModelPage } from '../pages/Model/model';
import { HomePagetest } from '../pages/hometest/hometest';
import { GooglePlus } from '@ionic-native/google-plus';
import { MapslocationPage } from '../pages/mapslocation/mapslocation';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { Facebook } from '@ionic-native/facebook';
import { FacebookloginPage } from '../pages/facebooklogin/facebooklogin';
import { SpinnerloaderPage } from '../pages/spinnerloader/spinnerloader';
import { BarqrcodePage } from '../pages/barqrcode/barqrcode';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SpeechtotextPage } from '../pages/speechtotext/speechtotext';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { CameraPage } from '../pages/camera/camera';
import { Camera } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { KeysPipe } from '../pipes/keys.pipe';
import { ListPage } from '../pages/list/list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,TabsPage,AboutPage,ContactPage,TabPage,LoginPage,RegisterPage,ModelPage,HomePagetest,GoogleauthPage,MapslocationPage,FacebookloginPage,
    BlehomePage,BledetailPage,SpinnerloaderPage,BarqrcodePage,SpeechtotextPage,CameraPage,KeysPipe,

  ],
  imports: [
    BrowserModule,
    HttpModule,HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,TabsPage,AboutPage,ContactPage,TabPage,LoginPage,RegisterPage,ModelPage,HomePagetest,GoogleauthPage,MapslocationPage,FacebookloginPage,
    BlehomePage,BledetailPage,SpinnerloaderPage,BarqrcodePage,SpeechtotextPage,
    CameraPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,TabsPage,AboutPage,ContactPage,TabPage,LoginPage,RegisterPage,ModelPage,GooglePlus,MapslocationPage,FacebookloginPage,
    BlehomePage,BledetailPage,BarqrcodePage,DataServiceProvider,BarcodeScanner,SpeechRecognition,TextToSpeech,
    {provide: ErrorHandler, useClass: IonicErrorHandler},Geolocation,
    Device, Facebook,BLE,Camera,PhotoLibrary,CameraPage,
  ],
})
export class AppModule {}

