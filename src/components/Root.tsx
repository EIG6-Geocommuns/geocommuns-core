import { Outlet } from "react-router-dom";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { Display, headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { makeStyles } from "tss-react/dsfr";
import { ReactNode } from "react";
import { RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";

type Props = {
  title: ReactNode;
  contactMail: string;
  feedbackLink?: string;
  contentDescription?: string;
  websiteMapLinkProps?: RegisteredLinkProps;
};

const useStyles = makeStyles()(theme => ({
  disabled: {
    pointerEvents: "none",
    "&&": {
      color: theme.decisions.text.disabled.grey.default,
    },
  },
}));

export const Root = ({
  title,
  contactMail,
  feedbackLink,
  contentDescription,
  websiteMapLinkProps = { href: "#" },
}: Props): JSX.Element => {
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
            iconId: "fr-icon-account-circle-line",
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
              target: "_self",
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
        websiteMapLinkProps={websiteMapLinkProps}
        bottomItems={[headerFooterDisplayItem]}
      />
      <Display />
    </div>
  );
};
