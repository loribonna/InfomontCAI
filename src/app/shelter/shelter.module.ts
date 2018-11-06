import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShelterComponent } from './shelter.component';
import { CoreModule } from 'src/core/core.module';
import { TabsService } from 'src/core/tabs-base/tabs.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ShelterComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    RouterModule
  ],
  providers: [ TabsService ]
})
export class ShelterModule { }
