import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ListPage;

  constructor() {

  }
}