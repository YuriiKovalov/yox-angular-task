import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { SimpleModel } from '../../../../core/models/common.models';

@Component({
  selector: 'app-filter-select',
  imports: [MatMenuModule, MatButtonModule],
  template: `
    <button mat-button [matMenuTriggerFor]="menu" class="filter-btn">
      {{ $value()?.label || $label() }}
      <span class="arrow">▾</span>
    </button>

    <mat-menu #menu="matMenu">
      @for (option of $options(); track option.value) {
        <button mat-menu-item (click)="onSelect(option)">
          {{ option.label }}
        </button>
      }
    </mat-menu>
  `,
  styles: [
    `
      .filter-btn {
        background: #f4f4f4;
        padding: 8px 16px;
        height: 32px;
        font-size: 12px;

        .arrow {
          font-size: 14px;
          color: #111;
          transform: translateY(-1px);
        }
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterSelectComponent),
      multi: true,
    },
  ],
})
export class FilterSelectComponent extends BaseControlValueAccessor<SimpleModel<string>> {
  $label = input.required<string>({ alias: 'label' });
  $options = input.required<SimpleModel<string>[]>({ alias: 'options' });

  onSelect(option: SimpleModel<string>): void {
    this.setValue(option);
    this.markAsTouched();
  }
}
