import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()(theme => ({
  body: {
    margin: "auto",
    maxWidth: 1000,
    width: "90%",
    backgroundColor: theme.decisions.background.default.grey.default,
    padding: fr.spacing("10w"),
  },
}));

export const PersonalData = () => {
  const { classes } = useStyles();

  return (
    <section className={classes.body}>
      <h1>Données personnelles</h1>

      <h6>1. Qu’est-ce qu’une donnée personnelle ?</h6>
      <p>
        Une donnée personnelle est une donnée qui permet d’identifier directement une personne comme un
        nom, une adresse ou un numéro de téléphone ou bien indirectement comme un pseudonyme ou une
        adresse IP.
      </p>

      <h6>2. Quelles sont les données collectées ?</h6>
      <p>
        Si vous avez rempli l’un de nos formulaires, nous sommes susceptibles de collecter les données
        suivantes :
        <br />- nom
        <br />- prénom
        <br />- organisation
        <br />- adresse email
      </p>

      <h6>3. Pourquoi mes données sont-elles collectées ?</h6>
      <p>
        Nous collectons les données que vous nous soumettez par formulaire pour vous recontacter et
        répondre au mieux à vos demandes.
      </p>

      <h6>4. Comment mes données sont-elles collectées ?</h6>
      <p>
        Vos données personnelles sont celles que vous nous avez fournies par formulaire. Elles sont
        collectées sur la base du consentement et leur traitement est conforme au RGPD.
      </p>

      <h6>5. Combien de temps mes données sont-elles conservées?</h6>
      <p>
        Nous conservons vos données le temps nécessaire pour réaliser les opérations pour lesquelles
        elles ont été collectées.
      </p>

      <h6>6. Mes données sont-elles partagées ?</h6>
      <p>Nous ne partageons vos données personnelles à aucun tiers.</p>

      <h6>7. Quels sont mes droits et comment les exercer ?</h6>
      <p>
        Vous pouvez à tout moment exercer vos droits :
        <ul>
          <li>d’accès pour consulter vos données personnelles,</li>
          <li>de portabilité pour obtenir et réutiliser une copie de vos données,</li>
          <li>de rectification pour corriger vos données si elles sont inexactes ou incomplètes,</li>
          <li>
            d’opposition pour vous opposer à l’utilisation de vos données selon un objectif précis,
          </li>
          <li>de suppression pour demander l’effacement définitif de vos données,</li>
        </ul>
      </p>

      <p>
        Comment faire ? Vous pouvez envoyer votre demande à notre Délégué à la Protection des Données par
        email ou par courrier postal.
        <br />
        <b>Email : </b>
        <a href="mailto:dpo@ign.fr">dpo@ign.fr</a>
        <br />
        <b>Adresse :</b> Institut national de l’information géographique et forestière - Délégué à la
        protection des données (Dpo) - 73 avenue de Paris, 94165 SAINT-MANDE Cedex.
      </p>
      <p>
        Le cas échéant, vous pouvez exercer une réclamation auprès de la{" "}
        <a href="https://cnil.fr" target="_blank">
          CNIL
        </a>
        .
      </p>

      <h6>8. Contact</h6>
      <p>
        Pour toute question concernant vos données ou ce document, vous pouvez vous adresser à notre
        Délégué à la Protection des Données par email ou par courrier postal.
        <br />
        <b>Email : </b>
        <a href="mailto:dpo@ign.fr">dpo@ign.fr</a>
        <br />
        <b>Adresse : </b>Institut national de l’information géographique et forestière - Délégué à la
        protection des données (Dpo) - 73 avenue de Paris, 94165 SAINT-MANDE Cedex.
      </p>
    </section>
  );
};
