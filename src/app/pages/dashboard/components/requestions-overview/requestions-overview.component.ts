import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs/operators';

import { ToggleGroupComponent } from '../../../../shared/components/form-controls/toggle-group/toggle-group';
import { FilterSelectComponent } from '../../../../shared/components/form-controls/filter-select/filter-select';
import { DashboardFacade } from '../../facade/dashboard.facade';
import { RequestionsFilters } from '../../../../core/models/dashboard.models';
import {
  REQUESTIONS_LOCATIONS,
  REQUESTIONS_ROLES,
  REQUESTIONS_STATUS,
  REQUESTIONS_WORKPLACES,
} from '../../../../core/constants/requestions-filters.constants';
import { StatusValue } from '../../../../core/models/common.types';
import { CountableModel, SimpleModel } from '../../../../core/models/common.models';
import { RequestionsTable } from '../requestions-table/requestions-table';

@Component({
  selector: 'app-requestions-overview',
  imports: [ToggleGroupComponent, ReactiveFormsModule, FilterSelectComponent, RequestionsTable],
  templateUrl: './requestions-overview.component.html',
  styleUrl: './requestions-overview.component.scss',
})
export class RequestionsOverview {
  private facade = inject(DashboardFacade);

  readonly $requestionsFilters = this.facade.$filters;
  readonly $requisitionData = this.facade.$requisitionData;
  readonly $loading = this.facade.$loading;

  readonly options = this.getRequisitionsOptions();
  readonly locations = REQUESTIONS_LOCATIONS;
  readonly roles = REQUESTIONS_ROLES;
  readonly workplaces = REQUESTIONS_WORKPLACES;

  formGroup = new FormGroup({
    status: new FormControl<StatusValue>(this.options[0].value),
    location: new FormControl<SimpleModel<string>>(this.$requestionsFilters().location),
    role: new FormControl<SimpleModel<string>>(this.$requestionsFilters().role),
    workplace: new FormControl<SimpleModel<string>>(this.$requestionsFilters().workplace),
  });

  constructor() {
    this.formGroupValueChanges();
  }

  formGroupValueChanges() {
    this.formGroup.valueChanges.pipe(debounceTime(300), takeUntilDestroyed()).subscribe((value) => {
      this.facade.updateRequestionsFilters(value as RequestionsFilters);
    });
  }

  getRequisitionsOptions(): CountableModel<StatusValue>[] {
    return REQUESTIONS_STATUS.map((item) => ({
      ...item,
      count: this.$requisitionData()?.[item.value] ?? 0,
    }));
  }
}
