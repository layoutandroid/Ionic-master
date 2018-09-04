import { BledetailPage } from '../pages/bledetail/bledetail';
import { BlehomePage } from '../pages/blehome/blehome';
import { GoogleauthPage } from '../pages/googleauth/googleauth';
// import { HttpClient } from '@angular/common/http';
import { TabPage } from '../pages/tabpage/tabpage';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BLE } from '@ionic-native/ble';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/Register/register';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ModelPage } from '../pages/Model/model';
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
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { ForgotPage } from '../pages/forgot/forgot';


//import { AlertController } from 'ionic-angular';
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyB4571MNAFMHuBSw1uzfq7SHZHEH_aoKZs",
  authDomain: "ionicmaster-7c02a.firebaseapp.com",
  databaseURL: "https://ionicmaster-7c02a.firebaseio.com",
  projectId: "ionicmaster-7c02a",
  storageBucket: "ionicmaster-7c02a.appspot.com",
  messagingSenderId: "109603024523"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,TabsPage,AboutPage,ContactPage,TabPage,LoginPage,RegisterPage,ModelPage,GoogleauthPage,MapslocationPage,FacebookloginPage,
    BlehomePage,BledetailPage,SpinnerloaderPage,BarqrcodePage,SpeechtotextPage,CameraPage,KeysPipe,ForgotPage,

  ],
  imports: [
    BrowserModule,
    HttpModule,HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,TabsPage,AboutPage,ContactPage,TabPage,LoginPage,RegisterPage,ModelPage,GoogleauthPage,MapslocationPage,FacebookloginPage,
    BlehomePage,BledetailPage,SpinnerloaderPage,BarqrcodePage,SpeechtotextPage,
    CameraPage,ForgotPage
  ],
  providers: [
    StatusBar,
    SplashScreen,TabsPage,AboutPage,ContactPage,TabPage,LoginPage,RegisterPage,ModelPage,GooglePlus,MapslocationPage,FacebookloginPage,
    BlehomePage,BledetailPage,BarqrcodePage,DataServiceProvider,BarcodeScanner,SpeechRecognition,TextToSpeech,
    {provide: ErrorHandler, useClass: IonicErrorHandler},Geolocation,
    Device, Facebook,BLE,Camera,PhotoLibrary,CameraPage,ForgotPage,
    FirebaseProvider,
    AngularFireAuth

  ],
})
export class AppModule {}

