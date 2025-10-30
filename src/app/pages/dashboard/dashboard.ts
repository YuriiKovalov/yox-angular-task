import { Component, inject, signal } from '@angular/core';

import { DashboardFacade } from './facade/dashboard.facade';
import { CandidatesCountCard } from '../../shared/components/candidates-count-card/candidates-count-card.component';
import { SectionHeaderNav } from '../../shared/components/section-header-nav/section-header-nav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RequestionsOverview } from './components/requestions-overview/requestions-overview.component';
import { MapGl } from '../../shared/features/map-gl/map-gl';
import { User } from '../../core/models/dashboard.models';
import { MapGlFacade } from '../../shared/features/map-gl/facade/map-gl.facade';
import { WorkplacesPanel } from './components/workplaces-panel/workplaces-panel';

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
        max-width: 922px;
        padding: 0 20px 100px;
      }

      section + section {
        margin-top: 90px;
      }

      .candidates-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 28px;
      }

      .map-container {
        height: 450px;
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
      }

      h1 {
        margin-bottom: 0;
      }

      p {
        margin: 0 0 40px 36px;
      }

      .user-name {
        color: black;
      }
    `,
  ],
})
export class Dashboard {
  private facade = inject(DashboardFacade);
  private mapFacade = inject(MapGlFacade);

  $candidates = this.facade.$candidates;
  $workplaces = this.facade.$workplaces;
  // ToDo: add to state or keep in LS
  $user = signal<User>({ name: 'Martin' });

  mapLoaded() {
    const pins = this.$workplaces()?.workplaces.map((workplace) => workplace.coordinates!);
    if (pins && pins.length) {
      this.mapFacade.addPins(pins);
    }

    this.mapFacade.addControl(WorkplacesPanel, 'top-left');
  }
}
