import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CacheService } from "src/app/cache.service";
import { TabItemBase } from "../tab.base";

@Component({
    selector: "app-tab-openings",
    host: {
        "[class.opening-container]": "true"
    },
    templateUrl: "./tab-openings.component.html",
    styleUrls: ["./tab-openings.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class TabOpeningsComponent extends TabItemBase {
    constructor(
        protected route: ActivatedRoute,
        protected cache: CacheService
    ) {
        super(route, cache);

        this._baseProperty = "openingTime";
    }

    getOpeningProp(opening, prop) {
        return opening && opening[prop] ? opening[prop] : null;
    }

    checkOpeningDate(opening, prop) {
        return opening && opening[prop];
    }
}
