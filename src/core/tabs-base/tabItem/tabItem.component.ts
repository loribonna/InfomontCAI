import { Component, OnInit, Input } from '@angular/core';
import { ITab } from '../tabs-base.component';

@Component({
  selector: 'app-tab-item, a[app-tab-item]',
  templateUrl: './tabItem.component.html',
  styleUrls: ['./tabItem.component.scss'],
  host: {
    'role': 'tabItem'
  }
})
export class TabItemComponent implements OnInit {
  @Input() content: ITab;

  constructor() { }

  ngOnInit() {
  }

}
