import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { DatabaseProvider } from './../../providers/database/database';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

	birthday: boolean = false;
	sport: boolean = false;
  meeting: boolean = false;
  health: boolean = false;
  others: boolean = false;
  none: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appPreferences: AppPreferences, public database: DatabaseProvider, public localNotifications: LocalNotifications, public toastCtrl: ToastController) {
    this.setTypeFromPreference();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  setTypeFromPreference() {
    this.appPreferences.fetch("preference", "notification").then((data) => {
      if (data.includes("Anniversaire")) {
        this.birthday = true;
      }
      if (data.includes("Sport")) {
        this.sport = true;
      }
      if (data.includes("Rendez-vous")) {
        this.meeting = true;
      }
      if (data.includes("Santé")) {
        this.health = true;
      }
      if (data.includes("Autres")) {
        this.others = true;
      }
      if (data.includes("Aucun")) {
        this.none = true;
      }
    })
  }

  saveNotif() {
    let array = [];
    if (this.birthday) {
      array.push("Anniversaire");
    }
    if (this.sport) {
      array.push("Sport");
    }
    if (this.meeting) {
      array.push("Rendez-vous");
    }
    if (this.health) {
      array.push("Santé");
    }
    if (this.others) {
      array.push("Autres");
    }
    if (this.none) {
      array.push("Aucun");
    }

    this.appPreferences.store("preference", "notification", array);

    this.localNotifications.cancelAll();
    this.localNotifications.clearAll();

    this.database.getAllEvent().then((data: any) => {
      data.forEach(event => {
        if (array.indexOf(event.type) != -1) {
          let date = new Date(event.date+" "+event.heure);
          this.localNotifications.schedule({
            title: event.title,
            text: event.description,
            trigger: {at: date},
            led: '3d0029'
          });
        }
      });
      this.presentToast("Préférences sauvegardés");
    }, (error) => {
      console.log(error);
    })
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
