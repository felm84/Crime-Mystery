import { Injectable } from '@angular/core';
import { PopoverController, AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class AlertProvider {

  constructor(
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController
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
