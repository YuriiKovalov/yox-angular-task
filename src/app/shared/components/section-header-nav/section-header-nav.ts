import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-header-nav',
  imports: [RouterLink],
  template: `
    <div class="section-header-nav">
      <h1>{{ $title() }}</h1>
      <a [routerLink]="$link()" target="_blank">
        {{ $linkText() }}
        <img src="assets/icons/arrow-right.svg" alt="Arrow right" width="24px" height="24px" />
      </a>
    </div>
    <ng-content></ng-content>
  `,
  styles: [
    `
      .section-header-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      h1 {
        margin-bottom: 20px;
      }

      a {
        font-weight: 500;
        font-size: 16px;
        color: #000000;
        display: flex;
        align-items: center;
        gap: 13px;
      }
    `,
  ],
})
export class SectionHeaderNav {
  $title = input.required<string>({ alias: 'title' });
  $link = input.required<string>({ alias: 'link' });
  $linkText = input<string>('See all', { alias: 'linkText' });
}
