import { OnInit } from "@angular/core";
import { CacheService } from "../../cache.service";
import { ActivatedRoute } from "@angular/router";

export abstract class TabItemBase implements OnInit {
    _data: any;
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
        }, this._data);
    }

    initData() {
        const cacheSub = this.cache
            .loadShelterSection(this._section)
            .subscribe(data => {
                this._data = data;
                if (cacheSub) {
                    cacheSub.unsubscribe();
                }
            });
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

    showData() {
        return JSON.stringify(this._data);
    }

    getPropertyUnformatted(prop) {
        if (this._baseProperty) {
            return this._resolveProperty(this._section + "." + this._baseProperty + "." + prop);
        } else {
            return this._resolveProperty(this._section + "." + prop);
        }
    }

    getProperty(prop) {
        return this.getPropertyUnformatted(prop) || '---';
    }

    getBaseProperty() {
        return this._resolveProperty(this._section);
    }
}
