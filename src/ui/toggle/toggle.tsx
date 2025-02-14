import { type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";
import { ComponentProps } from "react";
import { Root as ToggleRoot } from "@radix-ui/react-toggle";
import { toggleVariants } from "./toggleVariants";

function Toggle({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof ToggleRoot> & VariantProps<typeof toggleVariants>) {
  return (
    <ToggleRoot
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle };
