import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) {}

  // TODO: update this
  // https://www.eventbrite.com/platform/api#/introduction/quick-start
  token = '4AT3MUODBLC22SSTRVZH';
  organizerId = '6986947653';

  // All Events Pass and Future
  request$: any = this.http.get(`https://www.eventbriteapi.com/v3/organizers/${this.organizerId}/events/?token=${this.token}&expand=venue`);

  // Event Specific Request
  detailedRequest$: any = this.http.get(`https://www.eventbriteapi.com/v3/events/57438729787/?expand=venue&token=${this.token}`);


}
