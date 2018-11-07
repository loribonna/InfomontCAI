import { Component, OnInit } from '@angular/core';
import { ITab } from 'src/core/tabs-base/tabs-base.component';
import { TabServicesComponent } from './section-tabs/tab-services/tab-services.component';
import { TabGeoComponent } from './section-tabs/tab-geo/tab-geo.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from '../cache.service';

export const TABS: ITab[] = [
  { name: 'Dati Geografici', link: 'geographics', component: TabGeoComponent, section: "geoData", default: true },
  { name: 'Servizi', link: 'services', section: "services", component: TabServicesComponent }
];


export function getDefaultRouteString(tabs: ITab[] = TABS): string {
  const defTab = tabs.find(tab => tab.default);
  return defTab != null ? `/(tab:${defTab.link})` : '/not-found';
}

export function getDefaultRoute(tabs: ITab[] = TABS): any {
  const defRoute = tabs.find(tab => tab.default);

  const route = {
    outlets: {
      tab: defRoute.link
    }
  };
  return route;
}

@Component({
  selector: 'app-shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.scss']
})
export class ShelterComponent implements OnInit {
  shelID: String;

  constructor(private route: ActivatedRoute, private cache: CacheService, private router: Router) { }

  TABS: ITab[] = TABS;

  getLink(link: string) {
    return [{ outlets: ({ 'tab': [link] }) }];
  }

  ngOnInit() {
    const sub = this.route.params.subscribe(params => {
      this.shelID = params["id"];
      this.cache.setId(<string>this.shelID);
      if (sub) {
        sub.unsubscribe();
      }
    });

    if (!this.checkChildrenRouteOutlet()) {
      this.router.navigate([getDefaultRoute()], { relativeTo: this.route });
    }
  }

  checkChildrenRouteOutlet(): boolean {
    return this.route.children &&
      this.route.children.length === 1 &&
      this.route.firstChild &&
      this.route.firstChild.outlet === 'tab';
  }


  updateSection(section: string) {}

}
