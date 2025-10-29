import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { StatusValue } from '../../../../core/models/common.types';
import { SimpleModel } from '../../../../core/models/common.models';

@Component({
  selector: 'app-toggle-group',
  imports: [MatButtonToggleModule, FormsModule],
  template: `
    <mat-button-toggle-group
      [value]="$value()"
      (change)="onSelect($event.value)"
      [disabled]="$disabled()"
      class="status-toggle"
    >
      @for (option of $options(); track option.value) {
        <mat-button-toggle [value]="option">{{ option.label }}</mat-button-toggle>
      }
    </mat-button-toggle-group>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleGroupComponent),
      multi: true,
    },
  ],
})
export class ToggleGroupComponent extends BaseControlValueAccessor<StatusValue> {
  $options = input.required<SimpleModel<StatusValue>[]>({ alias: 'options' });

  onSelect(value: StatusValue): void {
    this.setValue(value);
    this.markAsTouched();
  }
}
