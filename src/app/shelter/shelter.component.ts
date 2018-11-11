import { Component, OnInit } from "@angular/core";
import { ITab } from "src/core/tabs-base/tabs-base.component";
import { TabServicesComponent } from "./section-tabs/tab-services/tab-services.component";
import { TabGeoComponent } from "./section-tabs/tab-geo/tab-geo.component";
import { ActivatedRoute, Router } from "@angular/router";
import { CacheService } from "../cache.service";
import { TabContactsComponent } from "./section-tabs/tab-contacts/tab-contacts.component";
import { TabOpeningsComponent } from "./section-tabs/tab-openings/tab-openings.component";
import { TabPropertyComponent } from "./section-tabs/tab-property/tab-property.component";

export const TABS: ITab[] = [
  {
    name: "Posizione",
    link: "geographics",
    component: TabGeoComponent,
    section: "geoData",
    default: true
  },
  {
    name: "Servizi",
    link: "services",
    section: "services",
    component: TabServicesComponent
  },
  {
    name: "Apertura",
    link: "openings",
    component: TabOpeningsComponent,
    section: "openingTime"
  },
  {
    name: "Contatti",
    link: "contacts",
    section: "contacts",
    component: TabContactsComponent
  },
  {
    name: "Proprietà e struttura",
    link: "property",
    component: TabPropertyComponent,
    section: "management"
  }
];

export function getDefaultRouteString(tabs: ITab[] = TABS): string {
  const defTab = tabs.find(tab => tab.default);
  return defTab != null ? `/(tab:${defTab.link})` : "/not-found";
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
  selector: "app-shelter",
  templateUrl: "./shelter.component.html",
  styleUrls: ["./shelter.component.scss"]
})
export class ShelterComponent implements OnInit {
  TABS: ITab[] = TABS;
  _section = "geoData";
  _data: object;

  constructor(
    private route: ActivatedRoute,
    private cache: CacheService,
    private router: Router
  ) {}

  getLink(link: string) {
    return [{ outlets: { tab: [link] } }];
  }

  ngOnInit() {
    const sub = this.route.params.subscribe(params => {
      const shelId = params["id"];
      this.cache.setId(shelId);
      const cacheSub = this.cache
        .loadShelterSection(this._section, shelId)
        .subscribe(data => {
          this._data = data;

          if (cacheSub) {
            cacheSub.unsubscribe();
          }
        });

      if (sub) {
        sub.unsubscribe();
      }
    });
    if (!this.checkChildrenRouteOutlet()) {
      this.router.navigate([getDefaultRoute()], { relativeTo: this.route });
    }
  }

  checkChildrenRouteOutlet(): boolean {
    return (
      this.route.children &&
      this.route.children.length === 1 &&
      this.route.firstChild &&
      this.route.firstChild.outlet === "tab"
    );
  }

  showData() {
    return JSON.stringify(this._data);
  }

  updateSection(section: string) {}
}
