import { Component, ViewEncapsulation } from "@angular/core";
import { TabItemBase } from "../tab.base";
import { ActivatedRoute } from "@angular/router";
import { CacheService } from "src/app/cache.service";

@Component({
    selector: "app-tab-geo",
    host: {
        "[class.geo-container]": "true"
    },
    templateUrl: "./tab-geo.component.html",
    styleUrls: ["./tab-geo.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class TabGeoComponent extends TabItemBase {
    constructor(
        protected route: ActivatedRoute,
        protected cache: CacheService
    ) {
        super(route, cache);
        this._baseProperty = "location";
    }
}
