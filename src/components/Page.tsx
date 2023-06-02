import { PropsWithChildren, useEffect } from "react";
import { ScrollRestoration } from "react-router-dom";

type Props = {
  title: string;
  scrollRestoration?: boolean;
};

export const Page = ({
  title,
  children,
  scrollRestoration = false,
}: PropsWithChildren<Props>): JSX.Element => {
  useEffect(() => {
    document.title = title || "";
  }, [title]);

  return (
    <>
      {scrollRestoration && <ScrollRestoration />}
      {children}
    </>
  );
};
