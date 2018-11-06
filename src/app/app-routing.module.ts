import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { ITab } from 'src/core/tabs-base/tabs-base.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShelterComponent, TABS } from './shelter/shelter.component';

export const TabsRoutes: Routes = TABS.map(tab => {
  const route: Route = {
    path: tab.link,
    outlet: 'tab',
    component: tab.component,
    data: { section: tab.section }
  };

  return route;
});

const routes: Routes = [
  { path: ':id', component: ShelterComponent, children: TabsRoutes },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
