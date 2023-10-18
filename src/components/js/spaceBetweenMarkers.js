export function spaceBetweenMarkers(map, marker1, marker2) {
  let p1 = map.getProjection().fromLatLngToPoint(marker1.position);
  let p2 = map.getProjection().fromLatLngToPoint(marker2.position);

  let pixelSize = Math.pow(2, - map.getZoom());

  let d = Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y))/pixelSize;

  return d;
}
