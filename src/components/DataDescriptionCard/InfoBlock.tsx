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
    marginBottom: fr.spacing("1v"),
  },
  infoContainer: {
    marginBottom: 0,
  },
  infoItem: {
    marginBottom: fr.spacing("1v"),
  },
  icon: {
    marginRight: fr.spacing("1w"),
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
      <Grid item className={classes.titleContainer}>
        <h1 className={classes.title}>{title}</h1>
        <div>
          <b>{subtitle}</b>
        </div>
      </Grid>

      <Grid item className={classes.infoContainer}>
        <div className={classes.infoItem}>Producteur : IGN</div>

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
    </Grid>
  );
};

export const MemoizedInfoBlock = memo(InfoBlock);
