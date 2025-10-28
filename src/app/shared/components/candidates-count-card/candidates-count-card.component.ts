import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { NotificationCircle } from '../../directives/notification-circle';

@Component({
  selector: 'app-candidates-count-card',
  imports: [MatCardModule, NotificationCircle],
  templateUrl: './candidates-count-card.component.html',
  styleUrl: './candidates-count-card.component.scss',
})
export class CandidatesCountCard {
  $period = input.required<string>({ alias: 'period' });
  $count = input.required<number>({ alias: 'count' });
  $notifications = input.required<number>({ alias: 'notificationCount' });
  $compareText = input.required<string>({ alias: 'compareText' });
}
