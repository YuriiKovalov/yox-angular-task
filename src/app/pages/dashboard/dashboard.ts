import { Component, inject } from '@angular/core';

import { DashboardFacade } from './facade/dashboard.facade';
import { CandidatesCountCard } from '../../shared/components/candidates-count-card/candidates-count-card.component';
import { SectionHeaderNav } from '../../shared/components/section-header-nav/section-header-nav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RequestionsOverview } from './components/requestions-overview/requestions-overview.component';

@Component({
  selector: 'app-dashboard',
  imports: [CandidatesCountCard, SectionHeaderNav, MatButtonToggleModule, RequestionsOverview],
  templateUrl: './dashboard.html',
  styles: [
    `
      .candidates-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }
    `,
  ],
})
export class Dashboard {
  private facade = inject(DashboardFacade);

  $candidates = this.facade.$candidates;
  $user = this.facade.$user;
}
