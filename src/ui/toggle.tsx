import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import type { ToggleProps } from "./toggle/toggle-constants";
import { toggleVariants } from "./toggle/toggle-variants";
import { cn } from "@/utils/cn";

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(toggleVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle };
