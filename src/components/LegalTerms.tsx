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

type Props = {
  teamName: string;
  teamUrl: string;
  teamEmail: string;
};

export const LegalTerms = ({ teamName, teamUrl, teamEmail }: Props) => {
  const { classes } = useStyles();
  return (
    <section className={classes.body}>
      <h1>Mentions Légales</h1>

      <h6>Conception et gestion du site</h6>
      <p>
        Inondata est conçu développé dans le cadre du{" "}
        <a href="https://eig.etalab.gouv.fr/" target="_blank">
          programme Entrepreneurs d’Intérêt Général
        </a>{" "}
        par l’équipe{" "}
        <a href={teamUrl} target="_blank">
          {teamName}
        </a>
        .
        <br />
        Il est maintenu en interne à l’Institut National de l’Information Géographique et Forestière. Les
        informations et/ou documents disponibles sur ce site sont susceptibles d’être modifiés à tout
        moment, et peuvent faire l’objet de mises à jour.
      </p>

      <h6>Hébergement</h6>
      <p>
        L’hébergement et l’infogérance sont assurés par la société{" "}
        <a href="https://cegedim.fr" target="_blank">
          cegedim
        </a>
        .
      </p>
      <p>
        <b>Adresse</b> : 137 rue d'Aguesseau – 92100 BOULOGNE-BILLANCOURT
        <br />
        <b>Téléphone</b> : 01 49 09 22 00
      </p>

      <h6>Réutilisation des contenus et liens</h6>
      <p>
        Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site
        sont proposés sous{" "}
        <a
          href="https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf"
          target="_blank"
        >
          licence ouverte Etalab 2.0.
        </a>
        <br />
        Vous êtes notamment libres de les reproduire, copier, modifier, extraire, transformer,
        communiquer diffuser, redistribuer, publier, transmettre et exploiter sous réserve de mentionner
        leur source, leur date de dernière mise à jour et ne pas induire en erreur des tiers quant aux
        informations qui y figurent.
        <br />
        Tout site public ou privé est autorisé à établir, sans autorisation préalable, un lien (y compris
        profond) vers les informations diffusées sur ce site.
      </p>

      <h6>Clause de responsabilité</h6>
      <p>
        Les informations proposées sur ce site le sont à titre de service rendu au public.
        <br />
        Malgré tout le soin apporté à l’intégration, à la vérification des données intégrées, les
        éléments mis en ligne ne sauraient, de quelque manière que ce soit, prétendre à l’exactitude et
        engager la responsabilité de l’Institut National de l’Information Géographique et forestière.
        <br />
        L’IGN ne pourra en aucun cas être tenu responsable de tout dommage de quelque nature qu’il soit
        résultant de l’interprétation ou de l’utilisation des informations et/ou documents disponibles
        sur ce site.
      </p>

      <h6>Crédits photographiques</h6>
      <p>
        Sauf mention contraire, les images et photographies utilisées proviennent par défaut des
        ressources de l’IGN.
      </p>

      <h6>Accessibilité</h6>
      <p>Accessibilité : Non conforme</p>
      <p>
        Inondata est développé selon les recommandations du Référentiel général d'amélioration de
        l'accessibilité (RGAA) mais n’a pas encore fait l’objet d’un audit permettant de garantir
        l’accessibilité des contenus.
      </p>

      <h6>Nous contacter</h6>
      <p>
        Pour toutes questions, suggestions, précisions complémentaires, vous pouvez nous contacter à :{" "}
        <a href={`mailto:${teamEmail}`}>{teamEmail}</a>
      </p>
    </section>
  );
};
