import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/cache.service';
import { ShelterService } from '../../shelter.service';
import { TabItemBase } from '../tab.base';

@Component({
  selector: 'app-tab-property',
  templateUrl: './tab-property.component.html',
  styleUrls: ['./tab-property.component.scss'],
  providers: [ShelterService]
})
export class TabPropertyComponent extends TabItemBase {

  constructor(protected route: ActivatedRoute, protected cache: CacheService, protected shelterService: ShelterService) {
    super(route, cache, shelterService);
  }
}

