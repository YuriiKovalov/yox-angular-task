import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestionsTable } from './requestions-table';

describe('RequestionsTable', () => {
  let component: RequestionsTable;
  let fixture: ComponentFixture<RequestionsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestionsTable],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestionsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
