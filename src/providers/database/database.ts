import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private database: SQLiteObject;

  constructor(public http: HttpClient, private sqlite: SQLite) {
    this.connectToDb();
  }

  private connectToDb():void {
    let config: any = {
      name: 'data.db',
      location: 'default'
    };
    this.sqlite.create(config)
        .then((db: SQLiteObject) => {
          this.database = db;
          let sql = "CREATE TABLE IF NOT EXISTS `event` (`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `title` TEXT, `description` TEXT, `dateEvent` TEXT, `type` TEXT, `picture` TEXT, `finish` BOOLEAN);";
          this.database.executeSql(sql,{} as any)
              .then(() => console.log("CREATION"))
              .catch(e => console.log("ERROR EXECUTE"));
        })
        .catch(()=>console.log("ERROR CREATE"));
  }

  addEvent(title: String, description: String, date: String, type: String, picture: String, finish: boolean) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO `event` (title, description, dateEvent, type, picture, finish) VALUES (?,?,?,?,?,?)";
      this.database.executeSql(sql, [title, description, date, type, picture, finish?1:0])
        .then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        })
    })
  }

  getAllEvent() {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM event ORDER BY dateEvent";
      this.database.executeSql(sql,{} as any)
        .then((data) => {
          let items = [];
          if (data.rows.length > 0) {
            for (let i=0; i<data.rows.length; i++) {
              items.push({
                id:data.rows.item(i).id,
                title:data.rows.item(i).title,
                description:data.rows.item(i).description,
                date:data.rows.item(i).dateEvent,
                type:data.rows.item(i).type,
                picture:data.rows.item(i).picture,
                finish:data.rows.item(i).finish
              });
            }
          }
          resolve(items);
        }, (error) => {
          reject(error);
        })
    })
  }

  getEventByType(type: String) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM event WHERE type=? ORDER BY dateEvent";
      this.database.executeSql(sql, [type])
        .then((data) => {
          let items = [];
          if (data.rows.length > 0) {
            for (let i=0; i<data.rows.length; i++) {
              items.push({
                id:data.rows.item(i).id,
                title:data.rows.item(i).title,
                description:data.rows.item(i).description,
                date:data.rows.item(i).dateEvent,
                type:data.rows.item(i).type,
                picture:data.rows.item(i).picture,
                finish:data.rows.item(i).finish
              });
            }
          }
          resolve(items);
        }, (error) => {
          reject(error);
        })
    })
  }

  getEventByDate(date: String) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM event WHERE dateEvent>=? ORDER BY dateEvent";
      this.database.executeSql(sql, [date])
        .then((data) => {
          let items = [];
          if (data.rows.length > 0) {
            for (let i=0; i<data.rows.length; i++) {
              items.push({
                id:data.rows.item(i).id,
                title:data.rows.item(i).title,
                description:data.rows.item(i).description,
                date:data.rows.item(i).dateEvent,
                type:data.rows.item(i).type,
                picture:data.rows.item(i).picture,
                finish:data.rows.item(i).finish
              });
            }
          }
          resolve(items);
        }, (error) => {
          reject(error);
        })
    })
  }

  getEventByDateType(date: String, type: String) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM event WHERE dateEvent>=? AND type=? ORDER BY dateEvent";
      this.database.executeSql(sql, [date, type])
        .then((data) => {
          let items = [];
          if (data.rows.length > 0) {
            for (let i=0; i<data.rows.length; i++) {
              items.push({
                id:data.rows.item(i).id,
                title:data.rows.item(i).title,
                description:data.rows.item(i).description,
                date:data.rows.item(i).dateEvent,
                type:data.rows.item(i).type,
                picture:data.rows.item(i).picture,
                finish:data.rows.item(i).finish
              });
            }
          }
          resolve(items);
        }, (error) => {
          reject(error);
        })
    })
  }

  deleteEvent(id: String) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM event WHERE id=?";
      this.database.executeSql(sql, [id])
        .then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        })
    })
  }
}
