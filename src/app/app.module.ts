import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SectionTabsModule } from './section-tabs/section-tabs.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShelterModule } from './shelter/shelter.module';
import { CacheService } from './cache.service';
import { HttpClientModule } from '@angular/common/http'
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    ShelterModule,
    BrowserModule,
    AppRoutingModule,
    SectionTabsModule,
    HttpClientModule
  ],
  providers: [CacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
