import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private http: HttpClient) { }

  private token = '4AT3MUODBLC22SSTRVZH';
  private organizerId = '6986947653';

  // All Events Pass and Future
  request$: any = this.http.get(`https://www.eventbriteapi.com/v3/organizers/${this.organizerId}/events/?token=${this.token}&expand=venue`);

}
