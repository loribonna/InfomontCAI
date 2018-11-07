import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShelterComponent } from './shelter.component';
import { CoreModule } from 'src/core/core.module';
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
  providers: []
})
export class ShelterModule {}
