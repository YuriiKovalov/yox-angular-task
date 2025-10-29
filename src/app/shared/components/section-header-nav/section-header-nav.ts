import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-header-nav',
  imports: [RouterLink],
  templateUrl: './section-header-nav.html',
  styleUrl: './section-header-nav.scss',
})
export class SectionHeaderNav {
  $title = input.required<string>({ alias: 'title' });
  $link = input.required<string>({ alias: 'link' });
  $linkText = input<string>('See all', { alias: 'linkText' });
}
