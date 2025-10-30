import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { DashboardFacade } from '../../facade/dashboard.facade';

@Component({
  selector: 'app-workplaces-panel',
  imports: [],
  template: `
    <div class="card">
      <div class="header">
        <button type="button" (click)="onSearch()">
          <img src="assets/icons/search.svg" alt="search" />
        </button>
        <input type="text" [value]="$term()" (input)="$term.set($event.target?.value ?? '')" />
      </div>

      <div class="content">
        <p>Current Active Workplaces</p>

        <div class="count-info">
          <img src="assets/icons/map-pin.svg" alt="info" />
          <h1>{{ $current() }}</h1>
        </div>

        <div class="segments">
          @for (segment of $segments(); track segment) {
            <div class="segment" [class.active]="segment < $activeSegments()"></div>
          }
        </div>

        <div class="labels">
          <span>0</span>
          <span>{{ $total() }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        width: 248px;
        height: 165px;
      }

      .header {
        padding: 8px 12px 0;
        display: flex;
        align-items: center;
        gap: 8px;
        border-bottom: 1px solid #0000001a;

        button {
          background: none;
          border: none;
          outline: none;
          cursor: pointer;
        }

        input {
          border: none;
          outline: none;
        }
      }

      .content {
        padding: 10px 16px;

        p {
          font-size: 10px;
          text-transform: uppercase;
          color: #00000080;
          margin: 0;
        }

        .count-info {
          display: flex;
          align-items: center;
          gap: 12px;

          h1 {
            margin: 0;
          }
        }
      }

      .segments {
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
        gap: 3px;
        margin-bottom: 6px;

        .segment {
          width: 4px;
          height: 16px;
          border-radius: 4px;
          background-color: #e0e0e0;
          transition: background-color 0.25s ease;
        }

        .segment.active {
          background-color: #1565d8;
        }
      }

      .labels {
        display: flex;
        justify-content: space-between;
        font-weight: 500;
        font-size: 12px;
      }
    `,
  ],
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
