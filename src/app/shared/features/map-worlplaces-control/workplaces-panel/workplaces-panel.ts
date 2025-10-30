import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

import { DashboardFacade } from '../../../../pages/dashboard/facade/dashboard.facade';

@Component({
  selector: 'app-workplaces-panel',
  imports: [MatCardModule, MatProgressBarModule, MatIconModule],
  template: `
    <mat-card class="workplace-card">
      <mat-card-content>
        <div class="header">
          <mat-icon>business</mat-icon>
          <span>Current Active Workplaces</span>
        </div>

        <div class="stats">
          <mat-icon color="primary">radio_button_checked</mat-icon>
          <span class="count">{{ $current() }} / {{ $total() }}</span>
        </div>

        <mat-progress-bar mode="determinate" [value]="($current() / $total()) * 100">
        </mat-progress-bar>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .workplace-card {
        width: 260px;
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        color: #555;
        margin-bottom: 6px;
      }
      .stats {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 4px;
      }
    `,
  ],
})
export class WorkplacesPanel {
  private readonly facade = inject(DashboardFacade);

  readonly $workplaces = this.facade.$workplaces;

  readonly $current = computed(() => this.$workplaces()?.currentActiveWorkplaces ?? 0);
  readonly $total = computed(() => this.$workplaces()?.totalWorkplaces ?? 0);
}
