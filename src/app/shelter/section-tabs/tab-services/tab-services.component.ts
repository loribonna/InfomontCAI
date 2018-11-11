import { Component } from '@angular/core';
import { TabItemBase } from '../tab.base';
import { CacheService } from 'src/app/cache.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab-services',
  templateUrl: './tab-services.component.html',
  styleUrls: ['./tab-services.component.scss']
})
export class TabServicesComponent extends TabItemBase {
  constructor(protected route: ActivatedRoute, protected cache: CacheService) {
    super(route, cache);
  }

}
