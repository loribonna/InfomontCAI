import { Component, OnInit } from '@angular/core';
import { TabItemBase } from '../tab.base';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/cache.service';
import { ShelterService } from 'src/app/shelter/shelter.service';

@Component({
  selector: 'app-tab-geo',
  templateUrl: './tab-geo.component.html',
  styleUrls: ['./tab-geo.component.scss'],
  providers: [ShelterService]
})
export class TabGeoComponent extends TabItemBase {

  constructor(protected route: ActivatedRoute, protected cache: CacheService, protected shelterService: ShelterService) {
    super(route, cache, shelterService);
  }
}
