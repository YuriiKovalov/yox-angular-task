import { Component, inject } from '@angular/core';

import { DashboardFacade } from './facade/dashboard.facade';
import { CandidatesCountCard } from '../../shared/components/candidates-count-card/candidates-count-card.component';
import { SectionHeaderNav } from '../../shared/components/section-header-nav/section-header-nav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RequestionsOverview } from './components/requestions-overview/requestions-overview.component';
import { MapGl } from '../../shared/features/map-gl/map-gl';
import { LocalStorageService } from '../../core/services/local-storage.service';
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
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private facade = inject(DashboardFacade);
  private mapFacade = inject(MapGlFacade);
  private ls = inject(LocalStorageService);

  $candidates = this.facade.$candidates;
  $workplaces = this.facade.$workplaces;

  user = this.ls.getUser();

  mapLoaded() {
    const pins = this.$workplaces()?.workplaces.map((workplace) => workplace.coordinates!);
    if (pins && pins.length) {
      this.mapFacade.addPins(pins);
    }

    this.mapFacade.addControl(WorkplacesPanel, 'top-left');
  }
}
