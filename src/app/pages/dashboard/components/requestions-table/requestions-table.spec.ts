import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RequestionsTable } from './requestions-table';
import { DashboardFacade } from '../../facade/dashboard.facade';
import { Requisition } from '../../../../core/models/dashboard.models';

describe('RequestionsTable', () => {
  let component: RequestionsTable;
  let fixture: ComponentFixture<RequestionsTable>;

  let mockFacade: {
    $loading: () => boolean;
    $error: () => string | null;
    toggleRequisition: jasmine.Spy;
  };

  beforeEach(async () => {
    mockFacade = {
      $loading: () => false,
      $error: () => null,
      toggleRequisition: jasmine.createSpy('toggleRequisition'),
    };

    await TestBed.configureTestingModule({
      imports: [RequestionsTable],
      providers: [{ provide: DashboardFacade, useValue: mockFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestionsTable);
    component = fixture.componentInstance;
    // set required input initially
    fixture.componentRef.setInput('dataSource', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render loading state', () => {
    (component as any).$loading = () => true;
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Loading requisitions…');
  });

  it('should render empty state when no data', () => {
    mockFacade.$loading = () => false;
    mockFacade.$error = () => null;
    fixture.componentRef.setInput('dataSource', []);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('No requisitions found');
  });

  it('should render error state when error exists', () => {
    (component as any).$loading = () => false;
    (component as any).$error = () => 'err';
    fixture.componentRef.setInput('dataSource', []);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('err');
  });

  it('should render rows when data present', () => {
    const rows: Requisition[] = [
      {
        id: 1,
        active: true,
        role: 'Barista',
        status: 'Delivering Candidates',
        statusType: 'success',
        workplace: { name: 'Starbucks on Broadway & Bond', location: 'Manhattan, New York City' },
        shifts: { active: 1, available: 5 },
      },
    ];
    fixture.componentRef.setInput('dataSource', rows);
    fixture.detectChanges();
    const tableRows = fixture.debugElement.queryAll(By.css('table tr.mat-mdc-row'));
    expect(tableRows.length).toBe(1);
  });

  it('should call facade on toggle', () => {
    const rows: Requisition[] = [
      {
        id: 2,
        active: false,
        role: 'Cleaner',
        status: 'Not Delivering Candidates',
        statusType: 'warning',
        workplace: { name: 'Starbucks on 14th & Sixth', location: 'Manhattan, New York City' },
        shifts: { active: 0, available: 5, inactive: 3 },
      },
    ];
    fixture.componentRef.setInput('dataSource', rows);
    fixture.detectChanges();
    component.onToggle(rows[0], true);
    expect(mockFacade.toggleRequisition).toHaveBeenCalledOnceWith(2, true);
  });
});
