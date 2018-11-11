import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/cache.service';
import { TabItemBase } from '../tab.base';

@Component({
  selector: 'app-tab-openings',
  templateUrl: './tab-openings.component.html',
  styleUrls: ['./tab-openings.component.scss']
})
export class TabOpeningsComponent extends TabItemBase {

  constructor(protected route: ActivatedRoute, protected cache: CacheService) {
    super(route, cache);
  }
}

