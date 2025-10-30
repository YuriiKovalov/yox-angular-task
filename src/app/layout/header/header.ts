import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="dashboard-header">
      <div class="logo">
        <img [src]="'assets/img/yox-logo-v2-blue.svg'" alt="Yox logo" width="80px" height="29px" />
      </div>

      <div class="company">
        <img [src]="'assets/img/startbucks.svg'" alt="Starbucks logo" width="48px" height="48px" />

        <div class="company-info">
          <div class="company-name">{{ $company().name }}</div>
          <div class="company-brand">{{ $company().brand }}</div>
        </div>

        <img src="assets/icons/chevron-right.svg" alt="Chevron right" width="8.2px" height="14px" />
      </div>
    </header>
  `,
  styles: [
    `
      .dashboard-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 47px 80px 25px 177px;
        border-radius: 12px;
      }

      .company {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .company-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 1.2;
        margin-right: 30px;
      }

      .company-name {
        font-weight: 600;
      }

      .company-brand {
        font-size: 14px;
      }
    `,
  ],
})
export class Header {
  readonly $company = signal({
    name: 'AMREST BULGARIA LTD',
    brand: 'Starbucks',
  });
}
