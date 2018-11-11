import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ShelterModule } from "./shelter/shelter.module";
import { CacheService } from "./cache.service";
import { HttpClientModule } from "@angular/common/http";
import { ShelterService } from "./shelter/shelter.service";

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    ShelterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ShelterService, CacheService],
  bootstrap: [AppComponent]
})
export class AppModule {}
