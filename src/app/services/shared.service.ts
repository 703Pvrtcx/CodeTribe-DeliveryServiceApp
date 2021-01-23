import {Injectable} from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable()
export class SharedService {

  loader : any;
  constructor(public loadingCtrl: LoadingController,
              public toastCtrl: ToastController
        ) {

  this.loader =  this.loadingCtrl.create({
        message : "Please wait...",
        duration: 3000
      });
     
  }

  async showLoading() : Promise<void> {
    (await this.loader).present();
   this.loader.present();
  }

  hideLoading() : void {
    this.loader.dismiss();
  }

  async showToast(msg : string) : Promise<void> {
    let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000
      });
    (await toast).present();
  }
  
}