import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class AlertProvider {

  constructor(
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { console.log('AlertProvider*******'); }


  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present();
  }

}
