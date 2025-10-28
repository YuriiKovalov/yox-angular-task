import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
import { SimpleModel } from '../../../../core/models/common.models';

@Component({
  selector: 'app-requestions-overview',
  imports: [ToggleGroupComponent, ReactiveFormsModule, FilterSelectComponent],
  templateUrl: './requestions-overview.component.html',
  styleUrl: './requestions-overview.component.scss',
})
export class RequestionsOverview {
  private facade = inject(DashboardFacade);

  readonly $requestionsFilters = this.facade.$requestionsFilters;
  readonly options = REQUESTIONS_STATUS;
  readonly locations = REQUESTIONS_LOCATIONS;
  readonly roles = REQUESTIONS_ROLES;
  readonly workplaces = REQUESTIONS_WORKPLACES;

  formGroup = new FormGroup({
    status: new FormControl<SimpleModel<StatusValue>>(this.$requestionsFilters().status),
    location: new FormControl<SimpleModel<string>>(this.$requestionsFilters().location),
    role: new FormControl<SimpleModel<string>>(this.$requestionsFilters().role),
    workplace: new FormControl<SimpleModel<string>>(this.$requestionsFilters().workplace),
  });

  constructor() {
    this.formGroupValueChanges();
  }

  formGroupValueChanges() {
    this.formGroup.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.facade.updateRequestionsFilters(value as RequestionsFilters);
    });
  }
}
