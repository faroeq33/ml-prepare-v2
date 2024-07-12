import { Label } from "@/components/ui/label";
import { useId, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Cpu, Monitor } from "lucide-react";

export function ModelSettingsSection() {
  const [handedness, setHandedness] = useState<1 | 2>(1);

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <div className="flex flex-col">
        <main className="grid flex-1 gap-4 p-4 overflow-auto md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative flex-col items-start hidden gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            <form className="grid items-start w-full gap-6">
              <fieldset className="grid gap-6 p-4 border rounded-lg">
                <legend className="px-1 -ml-1 text-lg">Settings</legend>

                {/* Add selection for cpu|gpu for adjusting handedness */}
                <Field label="Delegate">
                  <Select>
                    <SelectTrigger
                      id="model"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="genesis">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Monitor className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              <span className="font-medium text-foreground">
                                GPU
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Our fastest model for general use cases.
                            </p>
                          </div>
                        </div>
                      </SelectItem>

                      <SelectItem value="cpu">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Cpu className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              <span className="font-medium text-foreground">
                                CPU
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              The most powerful model for complex computations.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                {/* Add slider for adjusting handedness */}
                <div className="grid gap-3">
                  <Label htmlFor="handedness">
                    handedness :{" "}
                    <span className="text-muted">{handedness}</span>
                  </Label>

                  <input
                    type="range"
                    min={1}
                    max={2}
                    value={handedness}
                    className="transparent h-[4px] w-full cursor-pointer appearance-none border-transparent bg-neutral-200 dark:bg-neutral-600"
                    onChange={(e) =>
                      setHandedness(Number(e.target.value) as 1 | 2)
                    }
                  />
                </div>
              </fieldset>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

const Field = (props: { label: string; children: React.ReactNode }) => {
  return (
    <div key={useId()} className="grid gap-3">
      <Label htmlFor={props.label}>{props.label}</Label>
      {props.children}
      {/* <Slider defaultValue={[0]} max={2} step={1} /> */}
    </div>
  );
};
