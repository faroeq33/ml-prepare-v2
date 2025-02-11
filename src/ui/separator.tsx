import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import { Root } from "@radix-ui/react-separator";

import { cn } from "@/utils/cn";

const Separator = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-zinc-200 dark:bg-zinc-800",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = Root.displayName;

export { Separator };
