import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Config } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private database: SQLiteObject;

  constructor(public http: HttpClient, private sqlite: SQLite, private toastCtrl: ToastController) {
    this.connectToDb();
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  private connectToDb():void {
    this.presentToast("connection");
    let config: any = {
      name: 'data21.db',
      location: 'default'
    };
    this.sqlite.create(config)
        .then((db: SQLiteObject) => {
          this.database = db;
          this.presentToast((this.database != null? "db: c'est plein":"db :c'est vide"));
          let sql = "CREATE TABLE IF NOT EXISTS `event` (`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `title` TEXT, `description` TEXT, `dateEvent` DATE, `type` TEXT, `finish` BOOLEAN);";
          this.database.executeSql(sql,{} as any)
              .then(() => this.presentToast("CREATION"))
              .catch(e => this.presentToast("ERROR CREATION"));
        })
        .catch(()=>this.presentToast("Ta mère"));
  }

  addEvent(title: String, description: String, date: Date, type: String, finish: boolean) {
    // let sql = "INSERT INTO `event` (title, description, dateEvent, type, finish) VALUES (\'"+title+"\', \'"+description+"\', \'"+date+"\', \'"+type+"\', \'"+finish+"\')";
    let datestr = date.toString();
    //to_do problème ajout date
    this.presentToast(datestr);
    let sql = "INSERT INTO `event` (title, description,date,finish) VALUES (\'"+title+"\', \'"+description+"\',\'"+datestr+"\',\'"+(finish?1:0)+"\')";
    this.database.executeSql(sql,{} as any)
        .then(() => {
          this.presentToast("Insertion");
        })
        .catch(e => {
          // this.presentToast("Exception")
        });
    
  }

  getAllEvent() {
    let sql = "SELECT * FROM event";
    this.database.executeSql(sql)
        .then(() => console.log('Get All Event : '+sql))
        .catch(e => console.log(e));
  }

  setFinishEvent(id: number, finish: boolean) {
    let sql = "UPDATE event SET finish="+finish+" WHERE id="+id+";";
    this.database.executeSql(sql)
        .then(() => console.log('Set Finish Event : '+sql))
        .catch(e => console.log(e));
  }

}
