import { OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ITab } from "src/core/tabs-base/tabs-base.component";
import { CacheService } from "../cache.service";
import { ActivatedRoute } from "@angular/router";
import { ShelterService } from "../shelter/shelter.service";


export abstract class TabItemBase implements OnInit, OnChanges {
    @Input() content: ITab;
    initialized = false;
    constructor(protected route: ActivatedRoute, protected cache: CacheService, protected shelterService: ShelterService) {

    }

    getDataFromCache(id: string) {
        const data = this.cache.getDataSection(this.content.section);
        if (!data) {
            this.shelterService.getShelterSection(id, this.content.section).subscribe(section => {
                this.cache.updateData(this.content.section, section);
            });
        }
    }

    initData() {
        this.initialized = true;
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

    ngOnChanges(changes: SimpleChanges) {
        if (!this.initialized && this.content && this.content.section) {
            this.initData();
        }
    }

    ngOnInit() {
        if (this.content && this.content.section) {
            this.initData();
        }
    }
}
