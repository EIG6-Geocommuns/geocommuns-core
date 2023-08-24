import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Grid, Snackbar } from "@mui/material";
import { memo, useCallback, useState } from "react";
import { makeStyles } from "tss-react/dsfr";
import { MemoizedInfoBlock as InfoBlock } from "./InfoBlock";

const useStyles = makeStyles()(theme => ({
  container: {
    display: "flex",
    [fr.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  image: {
    objectFit: "cover",
    height: 114,
    borderRadius: 8,
    [fr.breakpoints.down("md")]: {
      width: "100%",
    },
    [fr.breakpoints.up("md")]: {
      width: 114,
    },
  },
  alert: {
    backgroundColor: theme.decisions.background.default.grey.default,
  },
}));

type Props = {
  title: string;
  subtitle: string;
  creationDate: Date;
  updateDate: Date;
  image: string;
  altImage?: string;
};

const DataDescriptionCard = ({
  title,
  subtitle,
  creationDate,
  updateDate,
  image,
  altImage = "Vignette donnant un aperçu des données",
}: Props) => {
  const { classes, cx } = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const copyUrlToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href);
    setSnackbarOpen(true);
  }, []);

  const handleClose = useCallback(() => setSnackbarOpen(false), []);

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={60000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <div className={cx(fr.cx("fr-alert", "fr-alert--success"), classes.alert)}>
          <p>L'URL a bien été copié !</p>
          <button className="fr-btn--close fr-btn" title="Masquer le message" onClick={handleClose}>
            Masquer le message
          </button>
        </div>
      </Snackbar>

      <Grid container className={classes.container} spacing={3}>
        <Grid item xs={12} md="auto">
          <img src={image} className={classes.image} alt={altImage} />
        </Grid>

        <Grid item xs="auto" container>
          <InfoBlock
            title={title}
            subtitle={subtitle}
            creationDate={creationDate}
            updateDate={updateDate}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md
          alignSelf="flex-start"
          container
          spacing={2}
          justifyContent={{ xs: "flex-start", md: "flex-end" }}
        >
          <Grid item xs={12} sm="auto">
            <Button iconId="fr-icon-star-line" title="Ajouter en favoris" />
          </Grid>

          <Grid item xs={12} sm="auto">
            <Button iconId="fr-icon-link" onClick={copyUrlToClipboard} title="Copier l'URL" />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export const MemoizedDataDescriptionCard = memo(DataDescriptionCard);
