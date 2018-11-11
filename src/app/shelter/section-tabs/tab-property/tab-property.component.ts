import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/cache.service';
import { TabItemBase } from '../tab.base';

@Component({
  selector: 'app-tab-property',
  templateUrl: './tab-property.component.html',
  styleUrls: ['./tab-property.component.scss']
})
export class TabPropertyComponent extends TabItemBase {

  constructor(protected route: ActivatedRoute, protected cache: CacheService) {
    super(route, cache);
  }
}

