import { Component } from '@angular/core';

import { NotificationsPage } from '../notifications/notifications';
import { AddeventPage } from '../addevent/addevent';
import { SearchPage } from '../search/search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SearchPage;
  tab2Root = AddeventPage;
  tab3Root = NotificationsPage;

  constructor() {

  }
}
