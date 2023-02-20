import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";
import { ReactNode } from "react";

const useStyles = makeStyles()(theme => ({
  titleBlock: {
    height: 520,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: fr.spacing("10w"),
  },
  titleTexts: {
    position: "absolute",
    textAlign: "center",
    padding: fr.spacing("2w"),
    [fr.breakpoints.down("md")]: { width: "90%" },
    [fr.breakpoints.up("md")]: { width: "70%" },
    [fr.breakpoints.up("lg")]: { width: "50%" },
  },
  title: {
    color: theme.decisions.text.inverted.grey.default,
    fontSize: 64,
  },
  subtitle: {
    color: theme.decisions.text.inverted.grey.default,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 48,
    lineHeight: fr.spacing("7w"),
  },
  titleInfo: {
    fontVariantCaps: "all-small-caps",
    color: theme.decisions.text.inverted.grey.default,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: fr.spacing("8w"),
  },
  cover: {
    position: "absolute",
    objectFit: "cover",
    height: "inherit",
    width: "100%",
  },
  main: {
    margin: "auto",
    marginBottom: fr.spacing("15w"),
    textAlign: "center",
    [fr.breakpoints.down("md")]: { width: "90%" },
    [fr.breakpoints.up("md")]: { width: "70%" },
    [fr.breakpoints.up("lg")]: { width: "50%" },
  },
  descriptionTitle: {
    fontVariantCaps: "all-small-caps",
  },
  description: {
    marginBottom: fr.spacing("7w"),
  },
  iconButton: {
    marginLeft: fr.spacing("1w"),
  },
}));

type Props = {
  title: string;
  subtitle?: string;
  titleInfo: string;
  titleClass?: string;
  cover: string;
  description: ReactNode[];
  cta: ReactNode;
};

export const Home = ({ title, subtitle, titleInfo, titleClass, cover, description, cta }: Props) => {
  const { classes, cx } = useStyles();
  return (
    <div>
      <div className={classes.titleBlock}>
        <img className={classes.cover} src={cover} alt="" />
        <div className={cx(classes.titleTexts, titleClass)}>
          <h1 className={classes.title}>{title}</h1>
          {subtitle && <h2 className={classes.subtitle}>{subtitle}</h2>}
          <p className={classes.titleInfo}>{titleInfo}</p>
        </div>
      </div>

      <main className={classes.main}>
        <h2 className={classes.descriptionTitle}>Bienvenue</h2>
        <div className={classes.description}>{description}</div>

        {cta}
      </main>
    </div>
  );
};
