import { FullScreen, MousePosition, ScaleLine, Zoom } from "ol/control";
import { Coordinate, format } from "ol/coordinate";

export const createZoomController = (
  params: Record<"className" | "zoomInClassName" | "zoomOutClassName", string>,
) => {
  return new Zoom({
    zoomInTipLabel: "Zoomer",
    zoomOutTipLabel: "Dézoomer",
    ...params,
  });
};

export const positionCurseurController = new MousePosition({
  coordinateFormat: function (coordinate: Coordinate | undefined) {
    return format(
      coordinate === undefined ? [0, 0] : coordinate,
      '<span><i class="fas fa-map-marker-alt"></i> {x} ° | {y} °</span>',
      6,
    );
  },
  projection: "EPSG:4326",
});

export const createFullScreenController = (params: {
  className: string;
  activeClassName?: string;
  inactiveClassName?: string;
}) => {
  return new FullScreen({ ...params });
};

export const scaleLineController = new ScaleLine({
  bar: true,
  steps: 4,
  minWidth: 50,
  maxWidth: 100,
});
