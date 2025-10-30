import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { NotificationCircle } from '../../directives/notification-circle';
import { AbbrNumberHtmlPipe } from '../../pipes/abbr-number-html-pipe';

@Component({
  selector: 'app-candidates-count-card',
  imports: [MatCardModule, NotificationCircle, AbbrNumberHtmlPipe],
  template: `
    <mat-card appearance="outlined" [class.active]="$active()">
      <mat-card-content [appNotificationCircle]="$notifications()">
        <mat-card-subtitle>{{ $period() }}</mat-card-subtitle>
        <mat-card-title [innerHTML]="$count() | abbrNumberHtml"></mat-card-title>
        <p>{{ $compareText() }}</p>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './candidates-count-card.component.scss',
})
export class CandidatesCountCard {
  $period = input.required<string>({ alias: 'period' });
  $count = input.required<number>({ alias: 'count' });
  $notifications = input.required<number>({ alias: 'notificationCount' });
  $compareText = input.required<string>({ alias: 'compareText' });
  $active = input.required<boolean>({ alias: 'active' });
}
