import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesCountCard } from './candidates-count-card.component';

describe('NotificationCard', () => {
  let component: CandidatesCountCard;
  let fixture: ComponentFixture<CandidatesCountCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesCountCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CandidatesCountCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
