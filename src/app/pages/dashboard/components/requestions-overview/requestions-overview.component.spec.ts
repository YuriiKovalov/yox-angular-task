import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestionsOverview } from './requestions-overview.component';

describe('RequestionOverview', () => {
  let component: RequestionsOverview;
  let fixture: ComponentFixture<RequestionsOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestionsOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestionsOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
