import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { CountableModel } from '../../../../core/models/common.models';
import { StatusValue } from '../../../../core/models/common.types';

@Component({
  selector: 'app-toggle-group',
  imports: [],
  template: `
    <div class="toggle-group" [class.disabled]="$disabled()">
      @for (option of $options(); track option.value) {
        <div
          class="toggle-option"
          [class.active]="$value() === option.value"
          (click)="onSelect(option.value)"
        >
          <span class="label">{{ option.label }}</span>

          @if (option.count !== undefined) {
            <span class="count">{{ option.count }}</span>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './toggle-group.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleGroupComponent),
      multi: true,
    },
  ],
})
export class ToggleGroupComponent extends BaseControlValueAccessor<StatusValue> {
  $options = input.required<CountableModel<StatusValue>[]>({ alias: 'options' });

  onSelect(value: StatusValue): void {
    this.setValue(value);
    this.markAsTouched();
  }
}
