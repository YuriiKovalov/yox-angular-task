import { ComponentRef, Injector, Type, ViewContainerRef } from '@angular/core';
import mapboxgl from 'mapbox-gl';

/**
 * Generic factory to mount an Angular component inside a Mapbox control.
 */
export abstract class MapControlFactory<TComponent, TData = void> implements mapboxgl.IControl {
  protected container!: HTMLElement;
  protected componentRef!: ComponentRef<TComponent>;

  constructor(
    protected viewContainerRef: ViewContainerRef,
    protected injector: Injector,
    protected data?: TData,
  ) {}

  protected abstract getComponentType(): Type<TComponent>;
  protected abstract bindData(instance: TComponent, data?: TData): void;

  onAdd(): HTMLElement {
    this.container = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl', 'mapboxgl-ctrl-group');
    this.container.style.margin = '12px';

    this.componentRef = this.viewContainerRef.createComponent(this.getComponentType(), {
      injector: this.injector,
    });

    this.bindData(this.componentRef.instance, this.data);
    this.container.appendChild(this.componentRef.location.nativeElement);

    return this.container;
  }

  onRemove(): void {
    this.componentRef?.destroy();
    this.container?.remove();
  }
}
