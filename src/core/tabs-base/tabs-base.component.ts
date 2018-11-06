import { Component, OnInit } from '@angular/core';

export interface ITab {
  name: string;
  icon?: string;
  link: string;
  component: any;
  default?: boolean;
  section: string;
}

@Component({
  selector: 'app-tabs-base',
  host: {
    'role': 'tabs-base',
    '[class.tabs-base]': 'true'
  },
  templateUrl: './tabs-base.component.html',
  styleUrls: ['./tabs-base.component.scss']
})
export class TabsBaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
