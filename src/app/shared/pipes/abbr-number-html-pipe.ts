import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'abbrNumberHtml',
})
export class AbbrNumberHtmlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: number | null | undefined): SafeHtml {
    if (value == null || isNaN(value)) return '0';

    const abs = Math.abs(value);
    const format = (divisor: number, suffix: string) =>
      `${(value / divisor).toFixed(1).replace(/\.0$/, '')}<span class="abbr-suffix">${suffix}</span>`;

    let formatted: string;

    if (abs >= 1_000_000_000) formatted = format(1_000_000_000, 'B');
    else if (abs >= 1_000_000) formatted = format(1_000_000, 'M');
    else if (abs >= 1_000) formatted = format(1_000, 'K');
    else formatted = value.toString();

    return this.sanitizer.bypassSecurityTrustHtml(formatted);
  }
}
