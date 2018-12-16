import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';


@Component({
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {
  item;

  constructor(params: NavParams) {
    this.item = params.data.item;
  }
}

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
	items = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider) {
  }

  openNavDetailsPage(item) {
    this.navCtrl.push(EventDetailsPage, { item: item });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  searchEvent() {
    this.database.getAllEvent().then((data: any) => {
      console.log(data);
      this.items = data;
    }, (error) => {
      console.log(error);
    })
  }

}
