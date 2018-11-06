import { Component, OnInit, Input, Directive, Injectable, AfterContentInit, AfterViewInit } from '@angular/core';
import { ITab } from '../tabs-base.component';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

let _nextItemID = 0;

@Injectable()
export class TabItemService {
  private selectionSource = new Subject<number>();
  selection$ = this.selectionSource.asObservable();

  selectTab(itemID: number) {
    this.selectionSource.next(itemID);
  }
}

@Directive({
  selector: 'app-tab-item[active]',
  host: {
    '[class.active]': 'active'
  }
})
export class TabItemDirective {
  @Input() active: boolean;
}

@Component({
  selector: 'app-tab-item',
  templateUrl: './tabItem.component.html',
  styleUrls: ['./tabItem.component.scss'],
  host: {
    'role': 'tabItem',
    '(click)': 'selected($event)',
    '[class.active]': 'active'
  }
})
export class TabItemComponent implements OnInit {
  @Input() content: ITab;
  _itemID: number;
  active = false;

  constructor(private tabsService: TabItemService, private route: ActivatedRoute) {
    this._itemID = _nextItemID++;
  }

  ngOnInit() {
    const selectedTab = this.route.firstChild.routeConfig.path;
    if (this.content.link === selectedTab) {
      this.active = true;
    }
  }

  selected(event: any) {
    this.tabsService.selectTab(this._itemID);
  }

}
