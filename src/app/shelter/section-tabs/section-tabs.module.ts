import { NgModule } from "@angular/core";
import { TabGeoComponent } from "./tab-geo/tab-geo.component";
import { TabServicesComponent } from "./tab-services/tab-services.component";
import { TabPropertyComponent } from "./tab-property/tab-property.component";
import { TabOpeningContactsComponent } from "./tab-opening-contacts/tab-opening-contacts.component";
import { IconModule } from "../../../core/icon/icon.module";
import { CommonModule } from "@angular/common";
import { PipesModule } from "../../../core/pipes.module";
import { DividerModule } from "../../../core/divider/divider.module";
@NgModule({
    declarations: [
        TabGeoComponent,
        TabServicesComponent,
        TabOpeningContactsComponent,
        TabPropertyComponent
    ],
    imports: [IconModule, CommonModule, PipesModule, DividerModule],
    providers: [],
    exports: []
})
export class SectionTabsModule {}
