import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { LocalNotifications } from '@ionic-native/local-notifications';

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

  title: string = "";
  description: string = "";
  date: string = "";
  heure: string = "";
  type: string = "";
  picture: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider, public toastCtrl: ToastController, public camera: Camera, public actionSheetCtrl: ActionSheetController, public appPreferences: AppPreferences, public localNotifications: LocalNotifications) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddeventPage');
  }

  addEvent() {
    this.database.addEvent(this.title, this.description, this.date, this.heure, this.type, this.picture, false)
      .then(() => {
        this.presentToast("Évènement ajouté");
        this.clearForm();
      });
    this.appPreferences.fetch("preference", "notification")
      .then((data) => {
        if (data.includes(this.type)) {
          let date = new Date(this.date+" "+this.heure);
          this.localNotifications.schedule({
            title: this.title,
            text: this.description,
            trigger: {at: date},
            led: '3d0029'
          });
        }
      }
    );
  }

  presentActionSheet() {
    let actionSheetCtrl = this.actionSheetCtrl.create({
      title: 'Ajouter une photo',
      buttons: [
        {
          text: 'Prendre une photo',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Importer une photo',
          handler: () => {
            this.uploadPhoto();
          }
        }
      ]
    });
    actionSheetCtrl.present();
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  uploadPhoto() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  clearForm() {
    this.title = "";
    this.description = "";
    this.date = "";
    this.heure = "";
    this.type = "";
    this.picture = null;
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
