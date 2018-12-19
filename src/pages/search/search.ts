import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';


@Component({
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {
  item;

  constructor(public navCtrl: NavController, public params: NavParams, public database: DatabaseProvider) {
    this.item = params.data.item;
    this.item.date = new Date(this.item.date);
  }

  deleteEvent(id: string) {
    this.database.deleteEvent(id).then((data: any) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    })
    this.navCtrl.push(SearchPage, {
      delete: true
    });
  }

}

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  items = [];
  date: string = "";
  type: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider) {
  }

  openNavDetailsPage(item) {
    this.navCtrl.push(EventDetailsPage, { item: item });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    if (this.navParams.get("delete") == true) {
      this.items = [];
      this.clearForm();
    }
  }

  clearForm() {
    this.date = "";
    this.type = "";
  }

  searchEvent() {
    this.items = []
    if (this.date == "" && this.type == "") {
      this.database.getAllEvent().then((data: any) => {
        console.log(data);
        this.items = data;
      }, (error) => {
        console.log(error);
      })
    } else if (this.date == "") {
      this.database.getEventByType(this.type).then((data: any) => {
        console.log(data);
        this.items = data;
      }, (error) => {
        console.log(error);
      })
    } else if (this.type == "") {
      this.database.getEventByDate(this.date).then((data: any) => {
        console.log(data);
        this.items = data;
      }, (error) => {
        console.log(error);
      })
    } else {
        this.database.getEventByDateType(this.date, this.type).then((data: any) => {
          console.log(data);
          this.items = data;
        }, (error) => {
          console.log(error);
        })
    }
    
    this.clearForm();
  }
}
