import { MouseEventHandler, ReactNode } from "react";
import { ComponentBaseProps } from "src/interfaces";

interface ButtonProps extends ComponentBaseProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children?: ReactNode;
}

export function Button(props: ButtonProps) {
  return <button {...props} />;
}
