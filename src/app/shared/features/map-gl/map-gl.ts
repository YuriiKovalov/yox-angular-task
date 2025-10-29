import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';
import { MapGlFacade } from './facade/map-gl.facade';

@Component({
  selector: 'app-map-gl',
  imports: [],
  template: `<div #mapContainer class="map-container"></div>`,
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
        border-radius: 12px;
        overflow: hidden;
      }
    `,
  ],
})
export class MapGl implements OnInit, OnDestroy {
  private readonly facade = inject(MapGlFacade);
  private readonly viewContainerRef = inject(ViewContainerRef);

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  readonly $lat = input.required<number>({ alias: 'lat' });
  readonly $lng = input.required<number>({ alias: 'lng' });
  readonly $zoom = input.required<number>({ alias: 'zoom' });

  readonly $map = this.facade.$map;

  ngOnInit(): void {
    this.facade.initMap(
      this.mapContainer,
      this.viewContainerRef,
      this.$lng(),
      this.$lat(),
      this.$zoom(),
    );
  }

  ngOnDestroy(): void {
    this.facade.destroyMap();
  }
}
