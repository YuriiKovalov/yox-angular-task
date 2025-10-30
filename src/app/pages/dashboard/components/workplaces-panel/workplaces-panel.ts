import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { DashboardFacade } from '../../facade/dashboard.facade';

@Component({
  selector: 'app-workplaces-panel',
  imports: [],
  templateUrl: './workplaces-panel.html',
  styleUrl: './workplaces-panel.scss',
})
export class WorkplacesPanel {
  private readonly facade = inject(DashboardFacade);

  readonly $workplaces = this.facade.$workplaces;

  readonly $current = computed(() => this.$workplaces()?.currentActiveWorkplaces ?? 0);
  readonly $total = computed(() => this.$workplaces()?.totalWorkplaces ?? 0);

  readonly $segments = computed(() => Array.from({ length: 26 }, (_, i) => i));

  readonly $activeSegments = computed(() => {
    const current = this.$current();
    const total = this.$total();

    if (total <= 0) return 0;

    const ratio = current / total;
    return Math.floor(ratio * 26);
  });

  readonly $term = signal('') as WritableSignal<string>;

  onSearch() {
    console.log(this.$term());
  }
}
