import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import {  NgZone } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech';
@Component({
  selector: 'page-speechtotext',
  templateUrl: 'speechtotext.html',
})
export class SpeechtotextPage {
  isListening: boolean = false;
  matches: Array<String>;
  isgetting : boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public speech: SpeechRecognition,private zone: NgZone,private tts: TextToSpeech) {
  }

  async hasPermission():Promise<boolean> {
    try {
      const permission = await this.speech.hasPermission();
      console.log(permission);
      return permission;
    } catch(e) {
      console.log(e);
    }
  }

  async getPermission():Promise<void> {
    try {
      this.speech.requestPermission()
      .then(
        () =>this.isgetting=true,
        () => console.log('Denied')
      )
    } catch(e) {
      console.log(e);
    }
  }

  listen(): void {
    this.getPermission()
    console.log('listen action triggered');
    // if (this.isListening) {
    //   this.speech.stopListening();
    //   this.toggleListenMode();
    //   return
    // }
    // this.toggleListenMode();
    // let _this = this;

    // this.speech.startListening()
    //   .subscribe(matches => {
    //     _this.zone.run(() => {
    //       _this.matches = matches;
    //     })
    //   }, error => console.error(error));

  }

  startlistning()
  {
    this.speech.startListening()
    .subscribe(matches => {
      this.zone.run(() => {
        this.matches = matches;
      })
    }, error => console.error(error));
  }

  hearlisten(): void {
    this.tts.speak('Hello kiran')
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }
  toggleListenMode():void {
    this.isListening = this.isListening ? false : true;
    console.log('listening mode is now : ' + this.isListening);
  }
}
