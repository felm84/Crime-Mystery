import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class AlertProvider {

  /**
   * AlertProvider constructor
   * @param loadingCtrl type from LoadingController
   * @param alertCtrl type from AlertController
   * All parameter injected into the CurrentLocationPage class, so they can be
   * used in the methods and properties.
   */
  constructor(
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { console.log('AlertProvider*******'); }


  /**
   * presentAlert() method
   * @param title type from string - alert title
   * @param message type from string - alert message
   * Pops up an alert with title and message
   */
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
