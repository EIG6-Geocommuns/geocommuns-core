import { useCallback, useEffect, useState } from "react";
import { Map } from "ol";

export const useIsMapLoading = (map: Map | undefined) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setIsLoadingToTrue = useCallback(() => {
    console.log("set to true !");
    setIsLoading(true);
  }, []);

  const setIsLoadingToFalse = useCallback(() => {
    console.log("set to false !");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    map?.on("loadstart", setIsLoadingToTrue);
    return () => {
      map?.un("loadstart", setIsLoadingToTrue);
    };
  }, [map]);

  useEffect(() => {
    map?.on("loadend", setIsLoadingToFalse);
    return () => {
      map?.un("loadend", setIsLoadingToFalse);
    };
  }, [map]);

  return { isLoading };
};
