import { type VariantProps } from "class-variance-authority";
import { toggleVariants } from "./toggle-variants";

export type ToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof toggleVariants> & {
    asChild?: boolean;
  };
