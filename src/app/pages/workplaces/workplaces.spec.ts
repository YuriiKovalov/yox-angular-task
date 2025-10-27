import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Workplaces } from './workplaces';

describe('Workplaces', () => {
  let component: Workplaces;
  let fixture: ComponentFixture<Workplaces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Workplaces],
    }).compileComponents();

    fixture = TestBed.createComponent(Workplaces);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
