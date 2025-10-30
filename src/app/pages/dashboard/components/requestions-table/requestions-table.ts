import { Component, input, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgClass } from '@angular/common';

import { Requisition } from '../../../../core/models/dashboard.models';
import { DashboardFacade } from '../../facade/dashboard.facade';

@Component({
  selector: 'app-requestions-table',
  imports: [MatTableModule, MatSlideToggle, NgClass],
  templateUrl: './requestions-table.html',
  styleUrl: './requestions-table.scss',
})
export class RequestionsTable {
  readonly displayedColumns = ['onOff', 'role', 'workplace', 'shifts', 'actions'];

  readonly $dataSource = input.required<Requisition[]>({ alias: 'dataSource' });

  private facade = inject(DashboardFacade);
  readonly $loading = this.facade.$loading;
}
