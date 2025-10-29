import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNotificationCircle]',
})
export class NotificationCircle {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  $count = input.required<number>({ alias: 'appNotificationCircle' });

  private badgeEl: HTMLElement | null = null;

  constructor() {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

    effect(() => {
      this.updateBadge(this.$count());
    });
  }

  private updateBadge(count: number | null): void {
    if (count === null || count === 0) {
      if (this.badgeEl) {
        this.renderer.removeChild(this.el.nativeElement, this.badgeEl);
        this.badgeEl = null;
      }
      return;
    }

    if (!this.badgeEl) {
      this.badgeEl = this.renderer.createElement('span');
      this.renderer.appendChild(this.el.nativeElement, this.badgeEl);

      this.renderer.setStyle(this.badgeEl, 'position', 'absolute');
      this.renderer.setStyle(this.badgeEl, 'top', '-20px');
      this.renderer.setStyle(this.badgeEl, 'right', '-20px');
      this.renderer.setStyle(this.badgeEl, 'background', '#f44336'); // red
      this.renderer.setStyle(this.badgeEl, 'color', '#fff');
      this.renderer.setStyle(this.badgeEl, 'border-radius', '50%');
      this.renderer.setStyle(this.badgeEl, 'width', '36px');
      this.renderer.setStyle(this.badgeEl, 'height', '36px');
      this.renderer.setStyle(this.badgeEl, 'display', 'flex');
      this.renderer.setStyle(this.badgeEl, 'align-items', 'center');
      this.renderer.setStyle(this.badgeEl, 'justify-content', 'center');
      this.renderer.setStyle(this.badgeEl, 'font-size', '13px');
      this.renderer.setStyle(this.badgeEl, 'font-weight', '600');
      this.renderer.setStyle(this.badgeEl, 'border', '4px solid #fff');
    }

    this.badgeEl!.textContent = count.toString();
  }
}
