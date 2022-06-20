import { AriaAttributes, AriaRole } from "react";

export interface ComponentBaseProps extends AriaAttributes {
  tabIndex?: number;
  className?: string;
  id?: string;
  role?: AriaRole;
}
