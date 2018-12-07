import { Component } from '@angular/core';
import { TabItemBase } from '../tab.base';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/cache.service';

@Component({
  selector: 'app-tab-geo',
  templateUrl: './tab-geo.component.html',
  styleUrls: ['./tab-geo.component.scss']
})
export class TabGeoComponent extends TabItemBase {

  constructor(protected route: ActivatedRoute, protected cache: CacheService) {
    super(route, cache);
    this._baseProperty = "location";
  }
}
