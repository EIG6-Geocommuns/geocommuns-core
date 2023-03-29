import { fr } from "@codegouvfr/react-dsfr";
import { Feature, Map, View } from "ol";
import { Coordinate } from "ol/coordinate";
import { Polygon } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import BaseLayer from "ol/layer/Base";
import "ol/ol.css";
import { fromLonLat, Projection } from "ol/proj";
import VectorSource from "ol/source/Vector";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useEffect, useMemo, useState } from "react";
import { assert } from "tsafe/assert";
import { makeStyles } from "tss-react/dsfr";

import {
  createFullScreenController,
  createScaleLineController,
  createZoomController,
} from "../map/controllers";
import { aiPredictionLayer, getIgnWMTSTileLayer } from "../map/ignTileLayer";

export type AvailableLayer = "planIGN" | "ortho" | "admin" | "aiPrediction";

const LAYER_TO_OPENLAYER_LAYER: { [key in AvailableLayer]: BaseLayer } = {
  "planIGN": getIgnWMTSTileLayer("GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2"),
  "ortho": getIgnWMTSTileLayer("ORTHOIMAGERY.ORTHOPHOTOS"),
  "admin": getIgnWMTSTileLayer("LIMITES_ADMINISTRATIVES_EXPRESS.LATEST"),
  "aiPrediction": aiPredictionLayer,
};

const lightTheme = fr.getColors(false);

const useStyles = makeStyles({ name: "Map" })({
  zoomContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%",
    bottom: 0,
    left: 0,
    margin: fr.spacing("2w"),
    marginBottom: fr.spacing("9w"),
    backgroundColor: "transparent",
  },
  mapControllersZoomButton: {
    "&&": {
      height: fr.spacing("5w"),
      width: fr.spacing("5w"),
      fontSize: "x-large",
      color: lightTheme.decisions.background.actionHigh.blueFrance.default,
      backgroundColor: lightTheme.decisions.artwork.background.grey.default,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  mapControllersZoomInButton: {
    borderBottom: "1px solid",
    borderColor: lightTheme.decisions.background.actionHigh.blueFrance.default,
  },

  fullScreenContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    height: "100%",
    bottom: 0,
    left: 0,
    color: lightTheme.decisions.background.actionHigh.blueFrance.default,
    backgroundColor: "transparent",
    "&& > button": {
      height: fr.spacing("5w"),
      width: fr.spacing("5w"),
      fontSize: "large",
      color: lightTheme.decisions.background.actionHigh.blueFrance.default,
      backgroundColor: lightTheme.decisions.artwork.background.grey.default,
      margin: fr.spacing("2w"),
    },
  },
  inactivateFullScreen: {
    alignSelf: "flex-end",
  },
  scaleLine: {
    bottom: fr.spacing("2w"),
    right: fr.spacing("4w"),
    left: "auto",
    fontSize: "large",
  },
});

export const useMap = (
  target: string,
  center: [number, number],
  zoom: number,
  layers: AvailableLayer[],
) => {
  const { classes, cx } = useStyles();
  const [map, setMap] = useState<Map | undefined>(undefined);

  const mapLayers = useMemo(() => layers.map(layer => LAYER_TO_OPENLAYER_LAYER[layer]), [layers]);

  const view = useMemo(
    () =>
      new View({
        zoom,
        center: fromLonLat(center),
      }),
    [zoom, center],
  );

  const zoomController = useMemo(
    () =>
      createZoomController({
        className: classes.zoomContainer,
        zoomInClassName: cx(classes.mapControllersZoomButton, classes.mapControllersZoomInButton),
        zoomOutClassName: classes.mapControllersZoomButton,
      }),
    [classes],
  );

  const fullScreenController = useMemo(
    () =>
      createFullScreenController({
        className: classes.fullScreenContainer,
        inactiveClassName: classes.inactivateFullScreen,
      }),
    [classes],
  );

  const scaleLineController = useMemo(
    () =>
      createScaleLineController({ className: cx(classes.scaleLine, "ol-scale-line"), minWidth: 100 }),
    [],
  );

  useEffect(() => {
    const map = new Map({
      target,
      layers: mapLayers,
      view,
      controls: [fullScreenController, zoomController, scaleLineController],
    });

    setMap(map);

    return () => map.setTarget(undefined);
  }, []);

  const setNewCenterAndNewZoom = useConstCallback((coordinates: [number, number], zoom: number) => {
    view.setCenter(fromLonLat(coordinates));
    view.setZoom(zoom);
  });

  const fitViewToPolygon = useConstCallback((coordinates: Coordinate[][]) => {
    const epsg4326 = new Projection({ code: "EPSG:4326" });
    const epsg3857 = new Projection({ code: "EPSG:3857" });
    // TODO handle multi-polygon like Marseille
    const polygon = new Polygon(coordinates).transform(epsg4326, epsg3857);

    view.fit(polygon as Polygon, { padding: [150, 150, 150, 150] });

    const feature = new Feature(polygon);
    const vectorSource = new VectorSource({ features: [feature] });
    const layer = new VectorLayer({ source: vectorSource });

    assert(
      map !== undefined,
      "The map object should have been instantiated (it is after fist render) by the time this function is called",
    );

    map.addLayer(layer);
  });

  const setLayerOpacity = useConstCallback((layer: AvailableLayer, opacityValue: number) => {
    const ol_layer = LAYER_TO_OPENLAYER_LAYER[layer];
    ol_layer.setOpacity(opacityValue);
  });

  return { setNewCenterAndNewZoom, fitViewToPolygon, setLayerOpacity };
};
