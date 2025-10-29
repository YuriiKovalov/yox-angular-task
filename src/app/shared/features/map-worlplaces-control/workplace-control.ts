import { Type } from '@angular/core';

import { MapControlFactory } from '../map-gl/classes/map-control-factory';
import { WorkplacesPanel } from './workplaces-panel/workplaces-panel';

export interface WorkplaceControlData {
  current: number;
  total: number;
}

export class WorkplaceControl extends MapControlFactory<WorkplacesPanel, WorkplaceControlData> {
  protected override getComponentType(): Type<WorkplacesPanel> {
    return WorkplacesPanel;
  }

  protected override bindData(instance: WorkplacesPanel, data?: WorkplaceControlData): void {
    if (!data) return;
    instance.$current.set(data.current);
    instance.$total.set(data.total);
  }
}
