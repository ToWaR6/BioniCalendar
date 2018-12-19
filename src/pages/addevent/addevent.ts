import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the AddeventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addevent',
  templateUrl: 'addevent.html',
})
export class AddeventPage {

  title: String = "";
  description: String = "";
  date: String = "";
  type: String = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddeventPage');
  }

  addEvent() {
    this.database.addEvent(this.title, this.description, this.date, this.type, false)
      .then(() => {
        this.presentToast("Évènement ajouté");
        this.clearForm();
      });
  }

  clearForm() {
    this.title = "";
    this.description = "";
    this.date = null;
    this.type = "";
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

}
