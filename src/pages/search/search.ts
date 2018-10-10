import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';


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


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.items = [
      {
        'title': 'Commencer le sport',
        'note': 'on y crois',
        'type': 'sport',
        'date': '01/01'
	  	},
	  	{
        'title': 'Vraiment commencer le sport',
        'note': 'on y crois moins',
        'type': 'sport',
        'date': '01/02'
	  	},
	  	{
        'title': 'Nan sérieux... bouge ton cul',
        'note': 'on y crois plus',
        'type': 'sport',
        'date': '01/03'
	  	},
	  	{
        'title': 'RDV pour coloscopie',
        'note': 'c\'est pas pour ta sante mais pour le plaisir, on le sait --\'',
        'type': 'sante',
        'date': '05/06'
	 	 	}
		]

  }

  openNavDetailsPage(item) {
    this.navCtrl.push(EventDetailsPage, { item: item });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
