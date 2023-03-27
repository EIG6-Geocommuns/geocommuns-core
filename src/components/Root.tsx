import { Outlet } from "react-router-dom";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { Display, headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { makeStyles } from "tss-react/dsfr";

type Props = {
  title: string;
};

const useStyles = makeStyles()(theme => ({
  disabled: {
    pointerEvents: "none",
    color: theme.decisions.text.disabled.grey.default + " !important",
  },
}));

export const Root = ({ title }: Props): JSX.Element => {
  const { classes } = useStyles();
  const brandTop = <>ign.fr</>;

  const homeLinkProps = {
    to: "/",
    title: "Accueil - IGN",
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header
        brandTop={brandTop}
        serviceTitle={title}
        homeLinkProps={homeLinkProps}
        quickAccessItems={[
          {
            iconId: "fr-icon-lock-line",
            linkProps: {
              href: "#",
              className: classes.disabled,
            },
            text: "Se connecter",
          },
          {
            iconId: "ri-chat-3-line",
            linkProps: {
              href: "#",
            },
            text: "Soumettre ses retours",
          },
          {
            iconId: "ri-mail-line",
            linkProps: {
              href: "#",
            },
            text: "Nous contacter",
          },
        ]}
        serviceTagline="Prototype - Version1 - 2023"
      />

      <Outlet />

      <Footer
        accessibility="non compliant"
        brandTop={brandTop}
        homeLinkProps={homeLinkProps}
        contentDescription="Ce message est à remplacer par les informations de votre site.
          Comme exemple de contenu, vous pouvez indiquer les informations 
          suivantes : Le site officiel d’information administrative pour les entreprises.
          Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
          à la gestion et au développement de votre entreprise."
        personalDataLinkProps={{ href: "#" }}
        termsLinkProps={{ href: "#" }}
        websiteMapLinkProps={{ href: "#" }}
        bottomItems={[headerFooterDisplayItem]}
      />
      <Display />
    </div>
  );
};
