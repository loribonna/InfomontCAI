import { NgModule } from '@angular/core';
import { TabGeoComponent } from './tab-geo/tab-geo.component';
import { TabServicesComponent } from './tab-services/tab-services.component';
import { TabContactsComponent } from './tab-contacts/tab-contacts.component';
import { TabOpeningsComponent } from './tab-openings/tab-openings.component';
import { TabPropertyComponent } from './tab-property/tab-property.component';

@NgModule({
  declarations: [
    TabGeoComponent,
    TabServicesComponent,
    TabContactsComponent,
    TabOpeningsComponent,
    TabPropertyComponent
  ],
  imports: [],
  providers: [],
})
export class SectionTabsModule { }
