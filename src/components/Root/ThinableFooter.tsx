import { fr } from "@codegouvfr/react-dsfr";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";
import { useCallback, useState } from "react";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()({
  footer: {
    padding: 0,
  },
  cross: {
    margin: fr.spacing("2w"),
    display: "flex",
    justifyContent: "end",
  },
  hidden: {
    display: "none",
  },
  bottom: {
    "&&": {
      margin: 0,
      boxShadow: "none",
    },
  },
  bottomList: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

type Props = {
  brandTop: JSX.Element;
  homeLinkProps: RegisteredLinkProps & { title: string };
  personalDataLinkProps: RegisteredLinkProps;
  termsLinkProps: RegisteredLinkProps;
  cookiesManagementLinkProps: RegisteredLinkProps;
  websiteMapLinkProps: RegisteredLinkProps;
  contentDescription?: React.ReactNode;
};

export const ThinableFooter = ({
  brandTop,
  homeLinkProps,
  personalDataLinkProps,
  termsLinkProps,
  cookiesManagementLinkProps,
  websiteMapLinkProps,
  contentDescription,
}: Props) => {
  const { cx, classes } = useStyles();
  const [isThin, setIsThin] = useState(false);

  const minimizeFooter = useCallback(() => setIsThin(true), []);

  const getIsThinWrappedClassName = (
    classNameAlwaysPresent: string,
    classNameTriggeredIfFooterIsThin: string,
  ) => {
    return isThin
      ? cx(classNameAlwaysPresent, classNameTriggeredIfFooterIsThin)
      : classNameAlwaysPresent;
  };

  const darkModeButton = (
    <button
      aria-controls="fr-theme-modal"
      data-fr-opened="false"
      className={cx(
        fr.cx(
          "fr-footer__bottom-link",
          ...(headerFooterDisplayItem.iconId !== undefined
            ? ([headerFooterDisplayItem.iconId, "fr-link--icon-left"] as const)
            : []),
        ),
        headerFooterDisplayItem.buttonProps.className,
      )}
      {...headerFooterDisplayItem.buttonProps}
    >
      {headerFooterDisplayItem.text}
    </button>
  );

  const transformLinkdProps = (linkProps: RegisteredLinkProps & { to?: string }) => {
    if (linkProps.to) {
      return { ...linkProps, href: linkProps.to };
    }
    return { linkProps };
  };

  return (
    <footer className={cx("fr-footer", classes.footer)} role="contentinfo" id="footer">
      <div className={getIsThinWrappedClassName(classes.cross, classes.hidden)}>
        <button className="fr-button fr-icon-arrow-up-s-line fr-btn--icon" onClick={minimizeFooter} />
      </div>
      <div className="fr-container">
        <div className={getIsThinWrappedClassName("fr-footer__body", classes.hidden)}>
          <div className="fr-footer__brand fr-enlarge-link">
            <a {...homeLinkProps}>
              <p className="fr-logo">{brandTop}</p>
            </a>
          </div>
          <div className="fr-footer__content">
            <p className="fr-footer__content-desc">{contentDescription}</p>
            <ul className="fr-footer__content-list">
              <li className="fr-footer__content-item">
                <a className="fr-footer__content-link" target="_blank" href="https://legifrance.gouv.fr">
                  legifrance.gouv.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a className="fr-footer__content-link" target="_blank" href="https://gouvernement.fr">
                  gouvernement.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a className="fr-footer__content-link" target="_blank" href="https://service-public.fr">
                  service-public.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a className="fr-footer__content-link" target="_blank" href="https://data.gouv.fr">
                  data.gouv.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={getIsThinWrappedClassName("fr-footer__bottom", classes.bottom)}>
          <ul className={getIsThinWrappedClassName("fr-footer__bottom-list", classes.bottomList)}>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" {...transformLinkdProps(websiteMapLinkProps)}>
                Plan du site
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" href="#">
                Accessibilité : non conforme
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" {...transformLinkdProps(termsLinkProps)}>
                Mentions légales
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" {...transformLinkdProps(personalDataLinkProps)}>
                Données personnelles
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" {...transformLinkdProps(cookiesManagementLinkProps)}>
                Gestion des cookies
              </a>
            </li>
            <li className="fr-footer__bottom-item">{darkModeButton}</li>
            {isThin && (
              <li className="fr-footer__bottom-item">
                <button
                  className="fr-footer__bottom-link fr-icon-arrow-down-s-line fr-link--icon-left"
                  onClick={() => setIsThin(!isThin)}
                >
                  Afficher le pied de page
                </button>
              </li>
            )}
          </ul>
          <div className={getIsThinWrappedClassName("fr-footer__bottom-copy", classes.hidden)}>
            <p>
              Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de
              ce site sont proposés sous{" "}
              <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank">
                licence etalab-2.0
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
