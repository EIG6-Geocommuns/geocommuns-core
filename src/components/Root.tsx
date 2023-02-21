import { Outlet } from "react-router-dom";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { Display, headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";

type Props = {
  title: string;
};

export const Root = ({ title }: Props): JSX.Element => {
  const brandTop = <>GOUVERNEMENT</>;

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
            },
            text: "Se connecter",
          },
          {
            iconId: "fr-icon-feedback-fill",
            linkProps: {
              href: "#",
            },
            text: "Soumettre ses retours",
          },
          headerFooterDisplayItem,
        ]}
        serviceTagline="Prototype - Version1 - 2023"
      />

      <Outlet />

      <Footer
        accessibility="fully compliant"
        brandTop={brandTop}
        homeLinkProps={homeLinkProps}
        contentDescription="Ce message est à remplacer par les informations de votre site.
          Comme exemple de contenu, vous pouvez indiquer les informations 
          suivantes : Le site officiel d’information administrative pour les entreprises.
          Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
          à la gestion et au développement de votre entreprise."
        cookiesManagementLinkProps={{ href: "#" }}
        personalDataLinkProps={{ href: "#" }}
        termsLinkProps={{ href: "#" }}
        websiteMapLinkProps={{ href: "#" }}
      />
      <Display />
    </div>
  );
};
