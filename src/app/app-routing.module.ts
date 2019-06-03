import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    data: { title: 'Dashboard | Eventbrite Flyer' }
  },
  {
    path: 'event/:eventId',
    loadChildren: './event/event.module#EventModule',
    data: { title: 'Event | Eventbrite Flyer' }
  }

  // TODO: Error Page (low priority)

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
