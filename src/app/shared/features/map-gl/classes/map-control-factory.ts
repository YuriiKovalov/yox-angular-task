import { ComponentRef, Injector, Type, ViewContainerRef } from '@angular/core';
import mapboxgl from 'mapbox-gl';

/**
 * Generic class to mount any Angular component inside a Mapbox control.
 */
export class MapControlFactory<TComponent extends object, TData = void>
  implements mapboxgl.IControl
{
  private container!: HTMLElement;
  private componentRef!: ComponentRef<TComponent>;

  constructor(
    private componentType: Type<TComponent>,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private options?: { margin?: string },
  ) {}

  onAdd(): HTMLElement {
    this.container = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl', 'mapboxgl-ctrl-group');
    this.container.style.margin = this.options?.margin ?? '12px';

    this.componentRef = this.viewContainerRef.createComponent(this.componentType, {
      injector: this.injector,
    });

    this.container.appendChild(this.componentRef.location.nativeElement);
    return this.container;
  }

  onRemove(): void {
    this.componentRef?.destroy();
    this.container?.remove();
  }
}
