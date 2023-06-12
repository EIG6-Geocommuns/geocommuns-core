import { memo } from "react";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()(theme => ({
  infoDoc: {
    fontSize: 12,
    color: theme.decisions.text.mention.grey.default,
  },
}));

export type Doc = { name: string; link?: string; size?: string };

type Props = {
  doc: Doc;
};

const DownloadLink = ({ doc }: Props) => {
  const { classes } = useStyles();

  const docInfo = doc.size ? `PDF - ${doc.size}` : "PDF";
  return (
    <div key={doc.name}>
      <a
        className="fr-link fr-icon-download-line fr-link--icon-right"
        href={doc.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
      >
        {doc.name}
      </a>
      <p className={classes.infoDoc}>{docInfo}</p>
    </div>
  );
};

export const MemoizedDownladLink = memo(DownloadLink);
