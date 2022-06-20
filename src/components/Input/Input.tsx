import { ChangeEventHandler } from "react";
import { ComponentBaseProps } from "src/interfaces";

interface InputProps extends ComponentBaseProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  placeholder?: string;
  disabled?: boolean;
}

export function Input(props: InputProps) {
  return <input {...props} />;
}
