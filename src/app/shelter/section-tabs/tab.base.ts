import { OnInit, OnDestroy } from "@angular/core";
import { CacheService } from "../../cache.service";
import { ActivatedRoute } from "@angular/router";

export abstract class TabItemBase implements OnInit, OnDestroy {
    data: any = {};
    _section: string;
    _baseProperty: string;

    constructor(
        protected route: ActivatedRoute,
        protected cache: CacheService
    ) {}

    private _resolveProperty(prop: string) {
        return prop.split(".").reduce((acc, val) => {
            if (acc && acc[val]) {
                return acc[val];
            } else {
                return null;
            }
        }, this.data);
    }

    addSectionToData(section: string) {
        const cacheSub = this.cache
            .loadShelterSection(section)
            .subscribe(data => {
                this.data[section] = data[section];
                if (cacheSub) {
                    cacheSub.unsubscribe();
                }
            });
    }

    initData() {
        if (this._section) {
            const cacheSub = this.cache
                .loadShelterSection(this._section)
                .subscribe(data => {
                    this.data = data;
                    this.afterInit();
                    if (cacheSub) {
                        cacheSub.unsubscribe();
                    }
                });
        }
    }

    ngOnInit() {
        const sub = this.route.data.subscribe((d: any) => {
            this._section = d.section;
            this.initData();
            if (sub) {
                sub.unsubscribe();
            }
        });
    }

    ngOnDestroy() {}

    getPropertyUnformatted(prop) {
        if (this._baseProperty) {
            return this._resolveProperty(
                this._section + "." + this._baseProperty + "." + prop
            );
        } else {
            return this._resolveProperty(this._section + "." + prop);
        }
    }

    getProperty(prop) {
        return this.getPropertyUnformatted(prop) || "---";
    }

    getBaseProperty() {
        return this._resolveProperty(this._section);
    }

    afterInit() {}
}
