import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import { Root, Track, Range, Thumb } from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <Track className="relative w-full h-2 overflow-hidden rounded-full grow bg-zinc-100 dark:bg-zinc-800">
      <Range className="absolute h-full bg-zinc-900 dark:bg-zinc-50" />
    </Track>
    <Thumb className="block w-5 h-5 transition-colors bg-white border-2 rounded-full border-zinc-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-50 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300" />
  </Root>
));
Slider.displayName = Root.displayName;

export { Slider };
