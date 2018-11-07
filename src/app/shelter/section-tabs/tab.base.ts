import { OnInit } from "@angular/core";
import { CacheService } from "../../cache.service";
import { ActivatedRoute } from "@angular/router";
import { ShelterService } from "../shelter.service";


export abstract class TabItemBase implements OnInit {
    _data: any;
    _section: string;
    constructor(
        protected route: ActivatedRoute,
        protected cache: CacheService,
        protected shelterService: ShelterService) {
    }

    getDataFromCache(id: string) {
        const data = this.cache.getDataSection(this._section);
        if (!data) {
            this.shelterService.getShelterSection(id, this._section).subscribe(shelData => {
                this._data = shelData;
                this.cache.updateData(this._section, shelData);
            });
        } else {
            this._data = data;
        }
    }

    initData() {
        const id = this.cache.getId();
        if (!id) {
            const sub = this.route.params.subscribe(params => {
                this.cache.setId(<string>params["id"]);
                this.getDataFromCache(<string>params["id"]);
                if (sub) {
                    sub.unsubscribe();
                }
            });
        } else {
            this.getDataFromCache(id);
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

    showData() {
        return JSON.stringify(this._data);
    }
}
