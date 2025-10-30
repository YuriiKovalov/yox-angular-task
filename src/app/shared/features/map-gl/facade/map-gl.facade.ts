import { inject, ElementRef, Injectable, Injector, ViewContainerRef, signal } from '@angular/core';
import mapboxgl, { Map } from 'mapbox-gl';

import { WorkplaceControl } from '../../map-worlplaces-control/workplace-control';
import { MAPBOX_ACCESS_TOKEN } from '../../../../app.config';
import { generateMapMarker } from '../utils/generate-map-marker.util';

@Injectable({ providedIn: 'root' })
export class MapGlFacade {
  private readonly injector = inject(Injector);

  readonly $map = signal<Map | null>(null);

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

    this.$map.set(map);
    this.$map()?.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
    this.$map()?.addControl(
      new WorkplaceControl(viewContainerRef, this.injector, { current: 7, total: 25 }),
      'top-left',
    );
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
}
