import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { ITab } from 'src/core/tabs-base/tabs-base.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShelterComponent } from './shelter/shelter.component';

const routes: Routes = [
  { path: ':id', component: ShelterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
