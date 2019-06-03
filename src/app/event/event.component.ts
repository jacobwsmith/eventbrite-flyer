import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'node-html-parser';
import { TrustedHtmlString } from '@angular/core/src/sanitization/bypass';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {
  detailedRequest: any;
  desc: TrustedHtmlString;
  private token = '4AT3MUODBLC22SSTRVZH';
  private organizerId = '6986947653';
  private unsubscribe$ = new Subject();
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .pipe(
        switchMap(params =>
          forkJoin(
            this.getEvent(params.eventId),
            this.getDescription(params.eventId)
          )
        )
      )
      .subscribe(([event, desc]: [any, any]) => {
        this.detailedRequest = event;
        const root = parse(desc.description);
        this.desc = root.childNodes.reduce((acc, current): any => {
          if (acc === '') {
            return `<p>${current.text}</p>`;
          }
          return `${acc} <p>${current.text}</p>`;
        }, '');
      });
  }

  private getEvent(eventId) {
    // tslint:disable-next-line: max-line-length
    return this.http.get(
      `https://www.eventbriteapi.com/v3/events/${eventId}/?expand=organizer,venue,ticket_availability,summary&token=${
        this.token
      }`
    );
  }
  private getDescription(eventId) {
    // tslint:disable-next-line: max-line-length
    return this.http.get(
      `https://www.eventbriteapi.com/v3/events/${eventId}/description/?token=${
        this.token
      }`
    );
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
