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
  styles: [
    `
      .toggle-group {
        display: flex;
        align-items: center;
        background-color: #f3f3f3;
        max-width: 205px;
        height: 36px;
        border-radius: 40px;
        padding: 4px;
        user-select: none;
        width: fit-content;
        transition: all 0.2s ease;
      }

      .toggle-option {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 20px;
        border-radius: 40px;
        font-weight: 500;
        font-size: 12px;
        color: #0b1633;
        cursor: pointer;
        transition: all 0.25s ease;
      }

      .toggle-option.active {
        background-color: #ffffff;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
      }

      .toggle-option .count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 19px;
        height: 19px;
        padding: 0 6px;
        border-radius: 50%;
        background-color: #f5f5f5;
      }

      .toggle-group.disabled {
        opacity: 0.6;
        pointer-events: none;
      }
    `,
  ],
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
