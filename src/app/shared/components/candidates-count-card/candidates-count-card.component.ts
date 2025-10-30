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
  styles: [
    `
      mat-card {
        background-color: #ffffff;
        outline: 8px solid #0000000d;
        border: 0;
        box-shadow: 0 4px 4px 0 #00000033;

        &.active {
          background-color: #0f72f6;
          color: #ffffff;
          outline-color: #1b70e133;

          mat-card-subtitle {
            color: #ffffff;
          }

          mat-card-title {
            color: #ffffff;
          }

          p {
            color: #ffffff80;
          }
        }
      }

      mat-card-content {
        width: 154px;
        height: 144px;
        display: flex;
        flex-direction: column;
        padding: 17px 12px 17px 23px;
      }

      mat-card-subtitle {
        font-weight: 700;
        font-size: 16px;
      }

      mat-card-title {
        font-weight: 700;
        font-size: 42px;
        height: 63px;
        display: inline-flex;
        align-items: end;
      }

      p {
        font-family: 'Roboto Condensed', sans-serif;
        font-style: italic;
        margin: 10px 0 0;
        font-size: 11px;
        color: #00000080;
      }
    `,
  ],
})
export class CandidatesCountCard {
  $period = input.required<string>({ alias: 'period' });
  $count = input.required<number>({ alias: 'count' });
  $notifications = input.required<number>({ alias: 'notificationCount' });
  $compareText = input.required<string>({ alias: 'compareText' });
  $active = input.required<boolean>({ alias: 'active' });
}
