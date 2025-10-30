import {
  inject,
  ElementRef,
  Injectable,
  Injector,
  ViewContainerRef,
  signal,
  Type,
} from '@angular/core';
import mapboxgl, { Map } from 'mapbox-gl';

import { MAPBOX_ACCESS_TOKEN } from '../../../../app.config';
import { generateMapMarker } from '../utils/generate-map-marker.util';
import { MapControlFactory } from '../classes/map-control-factory';

@Injectable({ providedIn: 'root' })
export class MapGlFacade {
  private readonly injector = inject(Injector);

  readonly $map = signal<Map | null>(null);
  private $viewContainerRef = signal<ViewContainerRef | null>(null);

  initMap(
    mapContainer: ElementRef<HTMLDivElement>,
    viewContainerRef: ViewContainerRef,
    lng: number,
    lat: number,
    zoom: number,
  ): void {
    const map = new mapboxgl.Map({
      container: mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: zoom,
      accessToken: MAPBOX_ACCESS_TOKEN,
    });
    this.$viewContainerRef.set(viewContainerRef);

    this.$map.set(map);
    this.$map()?.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
  }

  destroyMap(): void {
    const map = this.$map();
    if (map) {
      map.remove();
      this.$map.set(null);
    }
  }

  addPins(points: Array<{ lat: number; lng: number }>) {
    points.forEach(({ lat, lng }) => {
      const marker = generateMapMarker();
      new mapboxgl.Marker(marker).setLngLat([lng, lat]).addTo(this.$map()!);
    });
  }

  addControl<TComponent extends object, TData>(
    component: Type<TComponent>,
    position: mapboxgl.ControlPosition,
  ) {
    const map = this.$map();
    if (!map) return;

    const control = new MapControlFactory<TComponent, TData>(
      component,
      this.$viewContainerRef()!,
      this.injector,
    );

    map.addControl(control, position);
  }
}
