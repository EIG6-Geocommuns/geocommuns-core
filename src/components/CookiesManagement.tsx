import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { useCookiesManagement } from "../hooks/useCookiesManagement";

const useStyles = makeStyles()(theme => ({
  body: {
    margin: "auto",
    maxWidth: 1000,
    width: "90%",
    backgroundColor: theme.decisions.background.default.grey.default,
    marginTop: fr.spacing("5w"),
    marginBottom: fr.spacing("5w"),
  },
}));

export const CookiesManagement = () => {
  const { classes } = useStyles();
  const { allowed, optIn, optOut } = useCookiesManagement();

  return (
    <section className={classes.body}>
      <h1>Gestion des cookies</h1>

      <h6>Paramétrer vos cookies</h6>
      <p>
        Ce site utilise des cookies pour mesurer l’audience comme le nombre de visites, le nombre de
        pages vues ou l'activité des visiteurs sur le site et leur fréquence de retour.
      </p>
      <p>
        Ces cookies ne nécessitent pas de consentement et sont déposés à votre arrivée sur le site. Pour
        cela, nous utilisons{" "}
        <a href="https://matomo.org" target="_blank">
          Matomo
        </a>
        , un outil libre et paramètré pour être en conformité avec la{" "}
        <a href="https://www.cnil.fr/fr/solutions-pour-la-mesure-daudience" target="_blank">
          recommandation « Cookies »
        </a>{" "}
        de la CNIL. Cela signifie par exemple que votre adresse IP est anonymisée avant d'être
        enregistrée. Il est donc impossible d'associer vos visites sur ce site à votre personne.
      </p>
      <p>
        La durée de conservation des informations recueillies par ces cookies est limitée à 13 mois et
        les données ne sont ni cédées à des tiers ni utilisées à d’autres fins.
      </p>
      <p>Si vous le souhaitez, vous pouvez vous opposer au suivi de votre navigation sur ce site web.</p>
      <RadioButtons
        legend="Cookies d'audience :"
        orientation="horizontal"
        options={[
          {
            label: "Autoriser",
            nativeInputProps: {
              checked: allowed,
              onChange: optIn,
            },
          },
          {
            label: "Interdire",
            nativeInputProps: {
              checked: !allowed,
              onChange: optOut,
            },
          },
        ]}
        state={allowed ? undefined : "success"}
        stateRelatedMessage={allowed ? undefined : "Nous avons bien désactivé le suivi des cookies"}
      />
    </section>
  );
};
