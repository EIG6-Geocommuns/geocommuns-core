import { useEffect, useState } from "react";
import { Feature, Map, View } from "ol";
import { fromLonLat, Projection } from "ol/proj";
import { Polygon } from "ol/geom";
import { Coordinate } from "ol/coordinate";
import { Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import BaseLayer from "ol/layer/Base";

import { zoomController, positionCurseurController } from "../map/controllers";
import { getIgnWMTSTileLayer, aiPredictionLayer } from "../map/ignTileLayer";

export type AvailableLayer = "planIGN" | "ortho" | "admin" | "aiPrediction";

const LAYER_TO_OPENLAYER_LAYER: { [key in AvailableLayer]: BaseLayer } = {
  "planIGN": getIgnWMTSTileLayer("GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2"),
  "ortho": getIgnWMTSTileLayer("ORTHOIMAGERY.ORTHOPHOTOS"),
  "admin": getIgnWMTSTileLayer("LIMITES_ADMINISTRATIVES_EXPRESS.LATEST"),
  "aiPrediction": aiPredictionLayer,
};

export const useMap = (
  target: string,
  center: [number, number],
  zoom: number,
  layers: AvailableLayer[],
) => {
  const [view, setView] = useState<View | undefined>(undefined);
  const [map, setMap] = useState<Map | undefined>(undefined);

  const mapLayers = layers.map(layer => LAYER_TO_OPENLAYER_LAYER[layer]);

  const initialView = new View({
    zoom,
    center: fromLonLat(center),
  });

  useEffect(() => {
    const map = new Map({
      target,
      layers: mapLayers,
      view: initialView,
      controls: [zoomController, positionCurseurController],
    });
    setMap(map);
    setView(initialView);

    return () => map.setTarget(undefined);
  }, []);

  const setNewCenterAndNewZoom = (coordinates: [number, number], zoom: number) => {
    view?.setCenter(fromLonLat(coordinates));
    view?.setZoom(zoom);
  };

  const fitViewToPolygon = (coordinates: Coordinate[][]) => {
    const epsg4326 = new Projection({ code: "EPSG:4326" });
    const epsg3857 = new Projection({ code: "EPSG:3857" });
    // TODO handle multi-polygon like Marseille
    const polygon = new Polygon(coordinates).transform(epsg4326, epsg3857);

    view?.fit(polygon as Polygon, { padding: [150, 150, 150, 150] });

    const feature = new Feature(polygon);
    const vectorSource = new VectorSource({ features: [feature] });
    const layer = new VectorLayer({ source: vectorSource });
    map?.addLayer(layer);
  };

  const setLayerOpacity = (layer: AvailableLayer, opacityValue: number) => {
    const ol_layer = LAYER_TO_OPENLAYER_LAYER[layer];
    ol_layer.setOpacity(opacityValue);
  };

  return { setNewCenterAndNewZoom, fitViewToPolygon, setLayerOpacity };
};
