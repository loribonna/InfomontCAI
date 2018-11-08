import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ShelterComponent } from "./shelter.component";
import { RouterModule } from "@angular/router";
import { SectionTabsModule } from "./section-tabs/section-tabs.module";
import { ImagesModule } from "./images/images.module";
import { CoreModule } from "src/core/core.module";
@NgModule({
  declarations: [ShelterComponent],
  imports: [
    BrowserModule,
    RouterModule,
    CoreModule,
    ImagesModule,
    SectionTabsModule
  ],
  exports: [],
  providers: []
})
export class ShelterModule {}
