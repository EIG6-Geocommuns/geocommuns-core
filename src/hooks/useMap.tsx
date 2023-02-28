import { useEffect, useMemo, useState } from "react";
import { Feature, Map, View } from "ol";
import { fromLonLat, Projection } from "ol/proj";
import { Polygon } from "ol/geom";
import { Coordinate } from "ol/coordinate";
import { Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import BaseLayer from "ol/layer/Base";
import { makeStyles } from "tss-react/dsfr";

import { createZoomController, createFullScreenController } from "../map/controllers";

import { getIgnWMTSTileLayer, aiPredictionLayer } from "../map/ignTileLayer";
import { fr } from "@codegouvfr/react-dsfr";

export type AvailableLayer = "planIGN" | "ortho" | "admin" | "aiPrediction";

const LAYER_TO_OPENLAYER_LAYER: { [key in AvailableLayer]: BaseLayer } = {
  "planIGN": getIgnWMTSTileLayer("GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2"),
  "ortho": getIgnWMTSTileLayer("ORTHOIMAGERY.ORTHOPHOTOS"),
  "admin": getIgnWMTSTileLayer("LIMITES_ADMINISTRATIVES_EXPRESS.LATEST"),
  "aiPrediction": aiPredictionLayer,
};

const useStyles = makeStyles()(theme => ({
  zoomContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%",
    bottom: 0,
    right: 0,
    margin: fr.spacing("4w"),
  },
  mapControllersZoomInButton: {
    height: fr.spacing("5w"),
    width: fr.spacing("5w"),
    fontSize: "x-large",
    color: theme.decisions.background.actionHigh.blueFrance.default,
    backgroundColor: theme.decisions.artwork.background.grey.default,
    border: "1px solid",
    borderColor: theme.decisions.background.actionHigh.blueFrance.default,
    borderRadius: "8px 8px 0px 0px",
  },
  mapControllersZoomOutButton: {
    height: fr.spacing("5w"),
    width: fr.spacing("5w"),
    fontSize: "x-large",
    color: theme.decisions.background.actionHigh.blueFrance.default,
    backgroundColor: theme.decisions.artwork.background.grey.default,
    border: "1px solid",
    borderColor: theme.decisions.background.actionHigh.blueFrance.default,
    borderRadius: "0px 0px 8px 8px",
  },
  fullScreenContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%",
    bottom: 0,
    right: 0,
    margin: fr.spacing("4w"),
    marginBottom: fr.spacing("15w"),
    color: theme.decisions.background.actionHigh.blueFrance.default,
    borderRadius: 8,
  },
  activateFullScreen: {
    height: fr.spacing("5w"),
    width: fr.spacing("5w"),
    fontSize: "large",
    backgroundColor: theme.decisions.artwork.background.grey.default,
    border: "1px solid",
    borderColor: theme.decisions.background.actionHigh.blueFrance.default,
    borderRadius: 8,
  },
  inactivateFullScreen: {
    height: fr.spacing("5w"),
    width: fr.spacing("5w"),
    fontSize: "large",
    backgroundColor: theme.decisions.artwork.background.grey.default,
    border: "1px solid",
    borderColor: theme.decisions.background.actionHigh.blueFrance.default,
    borderRadius: 8,
  },
}));

export const useMap = (
  target: string,
  center: [number, number],
  zoom: number,
  layers: AvailableLayer[],
) => {
  const { classes } = useStyles();
  const [view, setView] = useState<View | undefined>(undefined);
  const [map, setMap] = useState<Map | undefined>(undefined);

  const mapLayers = layers.map(layer => LAYER_TO_OPENLAYER_LAYER[layer]);

  const initialView = new View({
    zoom,
    center: fromLonLat(center),
  });

  const zoomController = useMemo(
    () =>
      createZoomController({
        className: classes.zoomContainer,
        zoomInClassName: classes.mapControllersZoomInButton,
        zoomOutClassName: classes.mapControllersZoomOutButton,
      }),
    [classes],
  );

  const fullScreenController = useMemo(
    () =>
      createFullScreenController({
        className: classes.fullScreenContainer,
        activeClassName: classes.activateFullScreen,
        inactiveClassName: classes.inactivateFullScreen,
      }),
    [classes],
  );

  useEffect(() => {
    const map = new Map({
      target,
      layers: mapLayers,
      view: initialView,
      controls: [zoomController, fullScreenController],
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
