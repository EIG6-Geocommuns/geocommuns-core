import { fr } from "@codegouvfr/react-dsfr";
import { Grid, Box } from "@mui/material";
import { makeStyles } from "tss-react/dsfr";
import { Doc, MemoizedDownladLink as DownloadLink } from "./DownloadLink";

const useStyles = makeStyles()(theme => ({
  subtitle: {
    marginTop: fr.spacing("1w"),
    marginBottom: fr.spacing("2w"),
  },
  card: {
    padding: fr.spacing("3w"),
    backgroundColor: theme.decisions.background.alt.grey.default,
    display: "flex",
    alignItems: "center",
    marginBottom: fr.spacing("4w"),
  },
  logo: {
    height: 48,
    marginRight: fr.spacing("3w"),
  },
}));

type Props = {
  textInfo: JSX.Element;
  docs: Doc[];
};

export const GenericDataInfo = ({ textInfo, docs }: Props) => {
  const { classes } = useStyles();

  return (
    <Grid container columnSpacing={{ md: 10 }}>
      <Grid item md={12} lg>
        <h4>Informations</h4>
        {textInfo}
      </Grid>
      <Box component={Grid} item xs={12} display={{ xs: "block", lg: "none" }}>
        <hr />
      </Box>
      <Grid item xs={12} lg={5}>
        <p className={classes.subtitle}>
          <b>Producteur</b>
        </p>
        <div className={classes.card}>
          <img src={require("../assets/img/ign_logo.png")} className={classes.logo} />
          <span>
            <b>Institut National de l’Information Géographique et Forestière</b>
            <br />
            <a
              title="lien vers le site de l'IGN - ouvre une nouvelle fenêtre"
              href=" https://www.ign.fr/"
              target="_blank"
              rel="noopener"
            >
              https://www.ign.fr/
            </a>
          </span>
        </div>

        {docs && (
          <>
            <hr />

            <p className={classes.subtitle}>
              <b>Ressources</b>
            </p>

            {docs.map(doc => (
              <DownloadLink doc={doc} key={doc.name} />
            ))}
          </>
        )}
      </Grid>
    </Grid>
  );
};
