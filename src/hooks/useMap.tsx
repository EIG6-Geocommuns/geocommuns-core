import { fr } from "@codegouvfr/react-dsfr";
import { Map, View } from "ol";
import { Coordinate } from "ol/coordinate";
import { Polygon } from "ol/geom";
import BaseLayer from "ol/layer/Base";
import "ol/ol.css";
import { Projection, fromLonLat } from "ol/proj";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import { makeStyles } from "tss-react/dsfr";

import { Control } from "ol/control";
import {
  createFullScreenController,
  createScaleLineController,
  createZoomController,
} from "../map/controllers";
import { aiPredictionLayer, getIgnWMTSTileLayer } from "../map/ignTileLayer";
import { useIsMapLoading } from "./useIsMapLoading";

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
    bottom: fr.spacing("7w"),
    right: 0,
    margin: fr.spacing("2w"),
    backgroundColor: "transparent",
  },
  mapControllersZoomButton: {
    "&&": {
      width: fr.spacing("5w"),
      fontSize: "x-large",
      color: lightTheme.decisions.background.actionHigh.blueFrance.default,
      margin: 0,
      "&:hover": {
        outline: "none",
      },
    },
  },
  mapControllersZoomOutButton: {
    marginTop: -1,
  },
  fullScreenContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    height: "100%",
    bottom: 0,
    right: 0,
    backgroundColor: "transparent",
    "&& > button": {
      height: fr.spacing("5w"),
      width: fr.spacing("5w"),
      fontSize: "large",
      color: lightTheme.decisions.background.actionHigh.blueFrance.default,
      margin: fr.spacing("2w"),
      "&:hover": {
        outline: "none",
      },
    },
  },
  inactivateFullScreen: {
    alignSelf: "flex-end",
  },
  scaleLine: {
    bottom: fr.spacing("2w"),
    right: fr.spacing("9w"),
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
  const { isLoading } = useIsMapLoading(map);

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
        zoomInClassName: cx("fr-btn fr-btn--secondary", classes.mapControllersZoomButton),
        zoomOutClassName: cx(
          "fr-btn fr-btn--secondary",
          classes.mapControllersZoomButton,
          classes.mapControllersZoomOutButton,
        ),
      }),
    [classes],
  );

  const fullScreenController = useMemo(
    () =>
      createFullScreenController({
        className: classes.fullScreenContainer,
        inactiveClassName: cx("fr-btn fr-btn--secondary", classes.inactivateFullScreen),
      }),
    [classes],
  );

  const scaleLineController = useMemo(
    () =>
      createScaleLineController({ className: cx(classes.scaleLine, "ol-scale-line"), minWidth: 100 }),
    [],
  );

  const controls = useMemo(() => {
    const controlsList: Control[] = [fullScreenController, scaleLineController];
    if (!isMobile) controlsList.push(zoomController);

    return controlsList;
  }, [fullScreenController, scaleLineController, zoomController, isMobile]);

  useEffect(() => {
    const map = new Map({
      target,
      layers: mapLayers,
      view,
      controls,
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

    view.fit(polygon as Polygon, { padding: [20, 20, 20, 20] });
  });

  const setLayerOpacity = useConstCallback((layer: AvailableLayer, opacityValue: number) => {
    const ol_layer = LAYER_TO_OPENLAYER_LAYER[layer];
    ol_layer.setOpacity(opacityValue);
  });

  const setLayerVisibility = useConstCallback((layer: AvailableLayer, visibility: boolean) => {
    const ol_layer = LAYER_TO_OPENLAYER_LAYER[layer];
    ol_layer.setVisible(visibility);
  });

  return { setNewCenterAndNewZoom, fitViewToPolygon, setLayerOpacity, setLayerVisibility, isLoading };
};
