import { Component, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CacheService } from "src/app/cache.service";
import { TabItemBase } from "../tab.base";

@Component({
    selector: "app-tab-property",
    host: {
        "[class.prop-container]": "true"
    },
    templateUrl: "./tab-property.component.html",
    styleUrls: ["./tab-property.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class TabPropertyComponent extends TabItemBase {
    constructor(
        protected route: ActivatedRoute,
        protected cache: CacheService
    ) {
        super(route, cache);
    }

    getOwner() {
        const management = this.getBaseProperty();
        if (
            management &&
            management.subject &&
            Array.isArray(management.subject)
        ) {
            return (<any[]>management.subject).find(
                subj => subj.type === "Proprietario"
            );
        }
        return null;
    }

    /* override */
    afterInit() {
        this.addSectionToData("catastal");
    }

    getCatastalProp(prop) {
        return this.data && this.data.catastal && this.data.catastal[prop]
            ? this.data.catastal[prop]
            : "---";
    }
}
