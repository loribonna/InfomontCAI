import { Component } from '@angular/core';
import { TabItemBase } from '../tab.base';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/cache.service';

@Component({
  selector: 'app-tab-contacts',
  templateUrl: './tab-contacts.component.html',
  styleUrls: ['./tab-contacts.component.scss']
})
export class TabContactsComponent extends TabItemBase {

  constructor(protected route: ActivatedRoute, protected cache: CacheService) {
    super(route, cache);
  }
}
