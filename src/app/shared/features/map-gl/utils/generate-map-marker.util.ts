export function generateMapMarker() {
  const el = document.createElement('div');
  el.className = 'map-marker';
  el.style.backgroundImage = 'url(assets/icons/map-pin.svg)';
  el.style.backgroundSize = 'contain';
  el.style.width = '32px';
  el.style.height = '32px';
  el.style.cursor = 'pointer';
  return el;
}
