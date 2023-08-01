import { fr } from "@codegouvfr/react-dsfr";
import { Divider, Grid } from "@mui/material";
import { memo } from "react";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()(theme => ({
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    color: theme.decisions.text.title.blueFrance.default,
    marginBottom: 0,
  },
}));

type Props = {
  title: string;
  subtitle: string;
  creationDate: Date;
  updateDate: Date;
};

const InfoBlock = ({ title, subtitle, creationDate, updateDate }: Props) => {
  const { classes } = useStyles();

  return (
    <Grid container flexDirection="column">
      <h2 className={classes.title}>{title}</h2>
      <div>
        <b>{subtitle}</b>
      </div>

      <div>IGN - Institut national de l'information géographique et forestière</div>

      <Grid
        container
        columnSpacing={fr.spacing("3v")}
        rowSpacing={fr.spacing("1v")}
        mb={fr.spacing("1v")}
      >
        <Grid item xs={12} sm="auto">
          Création :{" "}
          <time dateTime={creationDate.toISOString()}>{creationDate.toLocaleDateString()}</time>
        </Grid>
        <Grid item xs={0} sm="auto" sx={{ display: { xs: "none", sm: "block" } }}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs={12} sm="auto">
          Mise à jour :{" "}
          <time dateTime={updateDate.toISOString()}>{updateDate.toLocaleDateString()}</time>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const MemoizedInfoBlock = memo(InfoBlock);
