import { memo, useEffect, useState } from "react";
import { Grid, Slider } from "@mui/material";
import { makeStyles } from "tss-react/dsfr";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { useConstCallback } from "powerhooks";
import { fr } from "@codegouvfr/react-dsfr";

const useStyles = makeStyles<{ maxWidth: number | undefined }>()((_theme, { maxWidth }) => ({
  sliderValue: {
    width: "3rem",
    display: "inline-block",
    textAlign: "end",
    paddingTop: "3px",
  },
  checkbox: {
    margin: 0,
    marginLeft: `-${fr.spacing("3v")}`,
    "&& label": {
      paddingBottom: 0,
    },
  },
  slider: {
    width: "100%",
    maxWidth,
  },
}));

type Props = {
  label: string;
  setLayerOpacity(opacity: number): void;
  setLayerVisibility(visible: boolean): void;
  className?: string;
  defaultVisibility?: boolean;
  defaultOpacity?: number;
  maxWidth?: number;
};

//TODO remove export when all apps use Memoized
export const OpacitySlider = ({
  label,
  setLayerOpacity,
  setLayerVisibility,
  className,
  defaultVisibility = true,
  defaultOpacity = 100,
  maxWidth,
}: Props) => {
  const { classes } = useStyles({ maxWidth });
  const [opacity, setOpacity] = useState(defaultOpacity);
  const [isVisible, setIsVisible] = useState(defaultVisibility);

  const handleVisibilityUpdate = useConstCallback(() => {
    setIsVisible(!isVisible);
  });

  useEffect(() => {
    setLayerVisibility(isVisible);
  }, [isVisible]);

  useEffect(() => {
    setLayerOpacity(opacity / 100);
  }, [opacity]);

  const onSliderChange = (_event: Event, value: number | number[]) => {
    if (typeof value === "object") {
      console.error(`onSliderChange got number[] as value arg (label : ${label})`);
      return;
    }

    setOpacity(value);
  };

  return (
    <div className={className}>
      <Checkbox
        className={classes.checkbox}
        options={[
          {
            label,
            nativeInputProps: {
              checked: isVisible,
              onChange: handleVisibilityUpdate,
            },
          },
        ]}
      />
      <Grid container spacing={2} className={classes.slider}>
        <Grid item xs>
          <Slider
            aria-label={`Opacité de la couche ${label}`}
            defaultValue={100}
            min={0}
            max={100}
            value={isVisible ? opacity : 0}
            onChange={onSliderChange}
            disabled={!isVisible}
          />
        </Grid>
        <Grid item>
          <span className={classes.sliderValue}>{isVisible ? opacity : 0} %</span>
        </Grid>
      </Grid>
    </div>
  );
};

export const MemoizedOpacitySlider = memo(OpacitySlider);
