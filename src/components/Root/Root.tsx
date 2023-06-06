import { Outlet } from "react-router-dom";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Display, headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { makeStyles } from "tss-react/dsfr";
import { ReactNode } from "react";
import { RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";
import { ThinableFooter } from "./ThinableFooter";
import Footer from "@codegouvfr/react-dsfr/Footer";

type Props = {
  title: ReactNode;
  contactMail: string;
  feedbackLink?: string;
  contentDescription?: string;
  personalDataLinkProps?: RegisteredLinkProps;
  termsLinkProps?: RegisteredLinkProps;
  cookiesManagementLinkProps?: RegisteredLinkProps;
  websiteMapLinkProps?: RegisteredLinkProps;
  isFooterThinable?: boolean;
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
  personalDataLinkProps = { href: "#" },
  termsLinkProps = { href: "#" },
  cookiesManagementLinkProps = { href: "#" },
  websiteMapLinkProps = { href: "#" },
  isFooterThinable = false,
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
    href: "/",
    title: "Accueil - IGN",
  };

  const footer = isFooterThinable ? (
    <ThinableFooter
      brandTop={brandTop}
      homeLinkProps={homeLinkProps}
      contentDescription={contentDescription}
      personalDataLinkProps={personalDataLinkProps}
      termsLinkProps={termsLinkProps}
      cookiesManagementLinkProps={cookiesManagementLinkProps}
      websiteMapLinkProps={websiteMapLinkProps}
    />
  ) : (
    <Footer
      accessibility="non compliant"
      brandTop={brandTop}
      homeLinkProps={homeLinkProps}
      contentDescription={contentDescription}
      personalDataLinkProps={personalDataLinkProps}
      termsLinkProps={termsLinkProps}
      cookiesManagementLinkProps={cookiesManagementLinkProps}
      websiteMapLinkProps={websiteMapLinkProps}
      bottomItems={[headerFooterDisplayItem]}
    />
  );

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

      {footer}
      <Display />
    </div>
  );
};
