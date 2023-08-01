import { Outlet } from "react-router-dom";
import { Header, HeaderProps } from "@codegouvfr/react-dsfr/Header";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { ReactNode } from "react";
import { RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";
import { ThinableFooter } from "./ThinableFooter";
import Footer from "@codegouvfr/react-dsfr/Footer";

type Props = {
  title: ReactNode;
  quickAccessItems?: HeaderProps.QuickAccessItem[];
  contentDescription?: string;
  personalDataLinkProps?: RegisteredLinkProps;
  termsLinkProps?: RegisteredLinkProps;
  cookiesManagementLinkProps?: RegisteredLinkProps;
  websiteMapLinkProps?: RegisteredLinkProps;
  isFooterThinable?: boolean;
};

export const Root = ({
  title,
  quickAccessItems,
  contentDescription,
  personalDataLinkProps = { href: "#" },
  termsLinkProps = { href: "#" },
  cookiesManagementLinkProps = { href: "#" },
  websiteMapLinkProps = { href: "#" },
  isFooterThinable = false,
}: Props): JSX.Element => {
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
      termsLinkProps={termsLinkProps}
      websiteMapLinkProps={websiteMapLinkProps}
      bottomItems={[
        { linkProps: personalDataLinkProps, text: "Données personnelles" },
        { linkProps: cookiesManagementLinkProps, text: "Gestion des cookies" },
        headerFooterDisplayItem,
      ]}
    />
  );

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header
        brandTop={brandTop}
        serviceTitle={title}
        homeLinkProps={homeLinkProps}
        quickAccessItems={quickAccessItems}
        serviceTagline="Prototype - version 1.2 - août 2023"
      />

      <Outlet />

      {footer}
    </div>
  );
};
