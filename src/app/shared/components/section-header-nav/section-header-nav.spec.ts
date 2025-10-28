import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHeaderNav } from './section-header-nav';

describe('SectionHeaderNav', () => {
  let component: SectionHeaderNav;
  let fixture: ComponentFixture<SectionHeaderNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionHeaderNav],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionHeaderNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
