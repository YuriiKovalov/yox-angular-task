import { Component, inject } from '@angular/core';

import { DashboardFacade } from './facade/dashboard.facade';
import { CandidatesCountCard } from '../../shared/components/candidates-count-card/candidates-count-card.component';
import { SectionHeaderNav } from '../../shared/components/section-header-nav/section-header-nav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RequestionsOverview } from './components/requestions-overview/requestions-overview.component';
import { MapGl } from '../../shared/features/map-gl/map-gl';

@Component({
  selector: 'app-dashboard',
  imports: [
    CandidatesCountCard,
    SectionHeaderNav,
    MatButtonToggleModule,
    RequestionsOverview,
    MapGl,
  ],
  templateUrl: './dashboard.html',
  styles: [
    `
      .dashboard-page {
        max-width: 902px;
      }

      .candidates-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }

      .map-container {
        height: 400px;
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
      }
    `,
  ],
})
export class Dashboard {
  private facade = inject(DashboardFacade);

  $candidates = this.facade.$candidates;
  $user = this.facade.$user;
}
