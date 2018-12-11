import {
    Component,
    OnInit,
    OnDestroy,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver
} from "@angular/core";
import { ITab } from "src/core/tabs-base/tabs-base.component";
import { TabServicesComponent } from "./section-tabs/tab-services/tab-services.component";
import { TabGeoComponent } from "./section-tabs/tab-geo/tab-geo.component";
import { ActivatedRoute, Router } from "@angular/router";
import { CacheService } from "../cache.service";
import { TabContactsComponent } from "./section-tabs/tab-contacts/tab-contacts.component";
import { TabOpeningsComponent } from "./section-tabs/tab-openings/tab-openings.component";
import { TabPropertyComponent } from "./section-tabs/tab-property/tab-property.component";
import { merge, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { TabItemBase } from "./section-tabs/tab.base";

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
    styleUrls: ["./shelter.component.scss"],
    entryComponents: [
        TabGeoComponent,
        TabServicesComponent,
        TabContactsComponent,
        TabOpeningsComponent,
        TabPropertyComponent
    ]
})
export class ShelterComponent implements OnInit, OnDestroy {
    TABS: ITab[] = TABS;
    activeTab: ITab = TABS.find(t => t.section === "geoData");
    _section = "geoData";
    _data: any;
    cacheSub: Subscription;

    @ViewChild("dynItemView", { read: ViewContainerRef })
    itemViewContainer: ViewContainerRef;

    constructor(
        private route: ActivatedRoute,
        private cache: CacheService,
        private router: Router,
        private compFactory: ComponentFactoryResolver
    ) {}

    getLink(link: string) {
        return [{ outlets: { tab: [link] } }];
    }

    initData(shelId) {
        this.cache.setId(shelId);
        this.cacheSub = merge(
            this.cache.loadShelterHeader(shelId),
            this.cache.loadShelterSection(this._section, shelId).pipe(
                map(data => {
                    const obj = {};
                    obj[this._section] = data;
                    return obj;
                })
            )
        ).subscribe(data => {
            this._data = Object.assign({}, this._data, data);
        });
    }

    initFromProperty(prop, value) {
        const cacheSub = this.cache
            .getShelterByProperty(prop, value)
            .subscribe((shel: any) => {
                this.cache.setId(shel._id);
                const shelSub = this.cache
                    .loadShelterSection(this._section, shel._id)
                    .pipe(
                        map(data => {
                            const obj = {};
                            obj[this._section] = data;
                            return obj;
                        })
                    )
                    .subscribe(data => {
                        this._data = Object.assign({}, this._data, data);
                        if (shelSub) {
                            shelSub.unsubscribe();
                        }
                    });
                this._data = Object.assign({}, this._data, shel);
                if (cacheSub) {
                    cacheSub.unsubscribe();
                }
            });
    }

    to404() {
        location.href = '/not-found';
    }

    ngOnInit() {
        if ((<any>window).shelId) {
            this.initData((<any>window).shelId);
        } else if ((<any>window).idCai) {
            this.initFromProperty("idCai", (<any>window).idCai);
        } else if ((<any>window).shelName) {
            this.initFromProperty("name", (<any>window).shelName);
        } else {
            const sub = this.route.params.subscribe(params => {
                if (params["id"]) {
                    this.initData(params["id"]);
                } else {
                    this.to404();
                }
                if (sub) {
                    sub.unsubscribe();
                }
            });
        }


        this.loadComponent();
    }

    loadComponent(tab = this.activeTab) {
        const factory = this.compFactory.resolveComponentFactory(tab.component);
        this.itemViewContainer.clear();

        const component = this.itemViewContainer.createComponent(factory);
        (<TabItemBase>component.instance).section = tab.section;
    }

    updateSection(tab: ITab) {
        this.activeTab = tab;
        this.loadComponent(tab);
    }

    getHeaderProperty(property: string) {
        return this._data && this._data[property] ? this._data[property] : "";
    }

    showData() {
        return JSON.stringify(this._data);
    }

    getLocationProperty(property: string, ...def) {
        if (this._data && this._data.geoData && this._data.geoData.location) {
            if (this._data.geoData.location[property]) {
                return this._data.geoData.location[property];
            } else {
                return (
                    def.reduce((acc, val) => {
                        if (!acc) {
                            if (this._data.geoData.location[val]) {
                                acc = this._data.geoData.location[val];
                            }
                        }
                        return acc;
                    }, null) || ""
                );
            }
        }
        return "";
    }

    ngOnDestroy() {
        if (this.cacheSub) {
            this.cacheSub.unsubscribe();
        }
    }
}
