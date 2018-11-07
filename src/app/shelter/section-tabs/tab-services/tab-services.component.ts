import { Component, OnInit } from '@angular/core';
import { TabItemBase } from '../tab.base';
import { CacheService } from 'src/app/cache.service';
import { ActivatedRoute } from '@angular/router';
import { ShelterService } from 'src/app/shelter/shelter.service';

@Component({
  selector: 'app-tab-services',
  templateUrl: './tab-services.component.html',
  styleUrls: ['./tab-services.component.scss'],
  providers: [ShelterService]
})
export class TabServicesComponent extends TabItemBase {
  constructor(protected route: ActivatedRoute, protected cache: CacheService, protected shelterService: ShelterService) {
    super(route, cache, shelterService);
  }

}
