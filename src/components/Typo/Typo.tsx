import { ReactNode } from "react";
import { ComponentBaseProps } from "src/interfaces";

interface TypoProps extends ComponentBaseProps {
  children: ReactNode;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "label";
}

export function Typo({ as = "p", ...rest }: TypoProps) {
  const Root = as;
  return <Root {...rest} />;
}
