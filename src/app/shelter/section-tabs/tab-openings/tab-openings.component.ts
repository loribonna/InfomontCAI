import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/cache.service';
import { ShelterService } from '../../shelter.service';
import { TabItemBase } from '../tab.base';

@Component({
  selector: 'app-tab-openings',
  templateUrl: './tab-openings.component.html',
  styleUrls: ['./tab-openings.component.scss'],
  providers: [ShelterService]
})
export class TabOpeningsComponent extends TabItemBase {

  constructor(protected route: ActivatedRoute, protected cache: CacheService, protected shelterService: ShelterService) {
    super(route, cache, shelterService);
  }
}

