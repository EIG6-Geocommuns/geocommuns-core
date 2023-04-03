import { Outlet } from "react-router-dom";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { Display, headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { makeStyles } from "tss-react/dsfr";

type Props = {
  title: string;
  contactMail: string;
  feedbackLink?: string;
  contentDescription?: string;
};

const useStyles = makeStyles()(theme => ({
  disabled: {
    pointerEvents: "none",
    "&&": {
      color: theme.decisions.text.disabled.grey.default,
    },
  },
}));

export const Root = ({ title, contactMail, feedbackLink, contentDescription }: Props): JSX.Element => {
  const { classes } = useStyles();
  const brandTop = (
    <>
      République
      <br />
      Française
    </>
  );

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
            text: "Me connecter",
          },
          {
            iconId: "ri-chat-3-line",
            linkProps: {
              href: feedbackLink || "#",
            },
            text: "Soumettre mes retours",
          },
          {
            iconId: "ri-mail-line",
            linkProps: {
              href: `mailto:${contactMail}`,
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
        contentDescription={contentDescription}
        personalDataLinkProps={{ href: "#" }}
        termsLinkProps={{ href: "#" }}
        websiteMapLinkProps={{ href: "#" }}
        bottomItems={[headerFooterDisplayItem]}
      />
      <Display />
    </div>
  );
};
