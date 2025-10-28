import { Component, inject } from '@angular/core';

import { DashboardFacade } from './facade/dashboard.facade';
import { CandidatesCountCard } from '../../shared/components/candidates-count-card/candidates-count-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [CandidatesCountCard],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private facade = inject(DashboardFacade);

  $candidates = this.facade.$candidates;
}
