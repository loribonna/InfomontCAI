import { NgModule } from "@angular/core";
import { TabGeoComponent } from "./tab-geo/tab-geo.component";
import { TabServicesComponent } from "./tab-services/tab-services.component";
import { TabContactsComponent } from "./tab-contacts/tab-contacts.component";
import { TabOpeningsComponent } from "./tab-openings/tab-openings.component";
import { TabPropertyComponent } from "./tab-property/tab-property.component";
import { IconModule } from "../../../core/icon/icon.module";
import { CommonModule } from "@angular/common";
import { PipesModule } from "../../../core/pipes.module";
import { DividerModule } from "../../../core/divider/divider.module";
@NgModule({
    declarations: [
        TabGeoComponent,
        TabServicesComponent,
        TabContactsComponent,
        TabOpeningsComponent,
        TabPropertyComponent
    ],
    imports: [IconModule, CommonModule, PipesModule, DividerModule],
    providers: [],
    exports: []
})
export class SectionTabsModule {}
