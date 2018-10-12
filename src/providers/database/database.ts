import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Config } from 'ionic-angular';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private static cptEvent = 0;
  private database: SQLiteObject;

  constructor(public http: HttpClient, private sqlite: SQLite) {
    this.connectToDb();
  }

  private connectToDb():void {
    let config: any = {
      name: 'data.db',
      location: 'default',
      iosDatabaseLocation: 'Library'

    };
    this.sqlite.create(config)
        .then((db: SQLiteObject) => {
          this.database = db;
          let sql = "CREATE TABLE IF NOT EXISTS 'event' (id NUMBER, title VARCHAR(255), description VARCHAR(255), date DATE, type ENUM('sport', 'health', 'meeting', 'birthday', 'other', 'nothing'), finish BOOL);";
          this.database.executeSql(sql)
              .then(() => console.log('Database connected : '+sql))
              .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
  }

  addEvent(title: String, description: String, date: Date, type: String, finish: boolean) {
    let sql = "INSERT INTO 'event' (id, title, description, date, type, finish) VALUES ('"+DatabaseProvider.cptEvent+++"', '"+title+"', '"+description+"', '"+date+"', '"+type+"', '"+finish+"');";
    this.database.executeSql(sql)
        .then(() => console.log('Event Added : '+sql))
        .catch(e => console.log(e));
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
