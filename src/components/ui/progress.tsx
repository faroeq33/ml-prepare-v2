import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import { Root, Indicator } from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, value, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800",
      className
    )}
    {...props}
  >
    <Indicator
      className="flex-1 w-full h-full transition-all bg-zinc-900 dark:bg-zinc-50"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </Root>
));
Progress.displayName = Root.displayName;

export { Progress };
