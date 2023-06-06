import { useConstCallback } from "powerhooks";
import { useEffect, useState } from "react";

class MatomoConsent {
  cookiesDisabled = !navigator || !navigator.cookieEnabled;
  CONSENT_COOKIE_NAME = "mtm_consent";
  CONSENT_REMOVED_COOKIE_NAME = "mtm_consent_removed";
  cookieIsSecure = false;
  useSecureCookies = true;
  cookiePath = "";
  cookieDomain = "";
  cookieSameSite = "Lax";

  constructor(
    useSecureCookies: boolean,
    cookiePath: string,
    cookieDomain: string,
    cookieSameSite: string,
  ) {
    this.useSecureCookies = useSecureCookies;
    this.cookiePath = cookiePath;
    this.cookieDomain = cookieDomain;
    this.cookieSameSite = cookieSameSite;
    if (useSecureCookies && location.protocol !== "https:") {
      console.log("Error with setting useSecureCookies: You cannot use this option on http.");
    } else {
      this.cookieIsSecure = useSecureCookies;
    }
  }
  hasConsent() {
    const consentCookie = this.getCookie(this.CONSENT_COOKIE_NAME);
    const removedCookie = this.getCookie(this.CONSENT_REMOVED_COOKIE_NAME);
    if (!consentCookie && !removedCookie) {
      return true; // No cookies set, so opted in
    }
    if (removedCookie && consentCookie) {
      this.setCookie(this.CONSENT_COOKIE_NAME, "", -129600000);
      return false;
    }
    return Boolean(consentCookie) || consentCookie !== 0;
  }

  consentGiven() {
    this.setCookie(this.CONSENT_REMOVED_COOKIE_NAME, "", -129600000);
    this.setCookie(this.CONSENT_COOKIE_NAME, new Date().getTime(), 946080000000);
  }

  consentRevoked() {
    this.setCookie(this.CONSENT_COOKIE_NAME, "", -129600000);
    this.setCookie(this.CONSENT_REMOVED_COOKIE_NAME, new Date().getTime(), 946080000000);
  }

  getCookie(cookieName: string) {
    const cookiePattern = new RegExp("(^|;)[ ]*" + cookieName + "=([^;]*)"),
      cookieMatch = cookiePattern.exec(document.cookie);
    return cookieMatch ? window.decodeURIComponent(cookieMatch[2]) : 0;
  }
  setCookie(cookieName: string, value: string | number | boolean, msToExpire: number) {
    const expiryDate = new Date();
    expiryDate.setTime(new Date().getTime() + msToExpire);
    document.cookie =
      cookieName +
      "=" +
      window.encodeURIComponent(value) +
      (msToExpire ? ";expires=" + expiryDate.toUTCString() : "") +
      ";path=" +
      (this.cookiePath || "/") +
      (this.cookieDomain ? ";domain=" + this.cookieDomain : "") +
      (this.cookieIsSecure ? ";secure" : "") +
      ";SameSite=" +
      this.cookieSameSite;
    if ((!msToExpire || msToExpire >= 0) && this.getCookie(cookieName) !== String(value)) {
      console.log(
        "There was an error setting cookie `" + cookieName + "`. Please check domain and path.",
      );
    }
  }
}

declare global {
  interface Window {
    MatomoConsent?: MatomoConsent;
  }
}

const SETTINGS = {
  "showIntro": true,
  "divId": "matomo-opt-out",
  "useSecureCookies": true,
  "cookiePath": "",
  "cookieDomain": "",
  "cookieSameSite": "Lax",
  "OptOutComplete":
    "Cookie d'exclusion install\u00e9. Vos visites sur ce site web ne seront PAS enregistr\u00e9es par notre outil d'analyse web.",
  "OptOutCompleteBis":
    "Note\u00a0: si vous nettoyez vos cookies et supprimez le cookie d'exclusion, ou bien si vous changez d'ordinateur et/ou de navigateur, il vous faudra de nouveau effectuer la proc\u00e9dure d'exclusion.",
  "YouMayOptOut2": "Vous pouvez vous opposer au suivi de votre navigation sur ce site web.",
  "YouMayOptOut3":
    "Cela prot\u00e9gera votre vie priv\u00e9e, mais emp\u00eachera \u00e9galement le propri\u00e9taire d'apprendre de vos actions et de cr\u00e9er une meilleure exp\u00e9rience pour vous et les autres utilisateurs.",
  "OptOutErrorNoCookies":
    "La fonctionnalit\u00e9 de d\u00e9sactivation du suivi n\u00e9cessite que les cookies soient autoris\u00e9s.",
  "OptOutErrorNotHttps":
    "La fonctionnalit\u00e9 de d\u00e9sactivation du suivi pourrait ne pas fonctionner car ce site n'a pas \u00e9t\u00e9 charg\u00e9 en HTTPS. Veuillez recharger la page pour v\u00e9rifier que le statut de ce suivi a bien \u00e9t\u00e9 chang\u00e9.",
  "YouAreNotOptedOut": "Vous n'\u00eates pas exclu(e).",
  "UncheckToOptOut": "D\u00e9cochez cette case pour vous exclure.",
  "YouAreOptedOut": "Vous n'\u00eates actuellement pas suivi(e).",
  "CheckToOptIn": "Cochez cette case pour ne plus \u00eatre exclu(e).",
};

export const useCookiesManagement: () => { allowed: boolean; optIn(): void; optOut(): void } = () => {
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    window.MatomoConsent = new MatomoConsent(
      SETTINGS.useSecureCookies,
      SETTINGS.cookiePath,
      SETTINGS.cookieDomain,
      SETTINGS.cookieSameSite,
    );
    if (window.MatomoConsent) {
      setAllowed(window.MatomoConsent.hasConsent());
    }
  }, []);

  const optOut = useConstCallback(() => {
    window.MatomoConsent?.consentRevoked();
    setAllowed(false);
  });

  const optIn = useConstCallback(() => {
    window.MatomoConsent?.consentGiven();
    setAllowed(true);
  });

  return { allowed, optIn, optOut };
};
