import { Bird, Rabbit, Settings, Share, Turtle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import NavSection from "./NavSection";

export function ModelSettingsSection() {
  return (
    <TooltipProvider>
      <div className="grid h-screen w-full pl-[56px]">
        <NavSection />
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">Playground</h1>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Settings className="size-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh]">
                <DrawerHeader>
                  <DrawerTitle>Configuration</DrawerTitle>
                  <DrawerDescription>
                    Configure the settings for the model and messages.
                  </DrawerDescription>
                </DrawerHeader>
                <form className="grid items-start w-full gap-6 p-4 pt-0 overflow-auto">
                  <fieldset className="grid gap-6 p-4 border rounded-lg">
                    <legend className="px-1 -ml-1 text-sm font-medium">
                      Settings
                    </legend>
                    <div className="grid gap-3">
                      <Label htmlFor="model">Model</Label>
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
                              <Rabbit className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  Neural{" "}
                                  <span className="font-medium text-foreground">
                                    Genesis
                                  </span>
                                </p>
                                <p className="text-xs" data-description>
                                  Our fastest model for general use cases.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="explorer">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <Bird className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  Neural{" "}
                                  <span className="font-medium text-foreground">
                                    Explorer
                                  </span>
                                </p>
                                <p className="text-xs" data-description>
                                  Performance and speed for efficiency.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="quantum">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <Turtle className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  Neural{" "}
                                  <span className="font-medium text-foreground">
                                    Quantum
                                  </span>
                                </p>
                                <p className="text-xs" data-description>
                                  The most powerful model for complex
                                  computations.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="temperature">Temperature</Label>
                      <Input id="temperature" type="number" placeholder="0.4" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="top-p">Top P</Label>
                      <Input id="top-p" type="number" placeholder="0.7" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="top-k">Top K</Label>
                      <Input id="top-k" type="number" placeholder="0.0" />
                    </div>
                  </fieldset>
                </form>
              </DrawerContent>
            </Drawer>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto gap-1.5 text-sm"
            >
              <Share className="size-3.5" />
              Share
            </Button>
          </header>
          <main className="grid flex-1 gap-4 p-4 overflow-auto md:grid-cols-2 lg:grid-cols-3">
            <div
              className="relative flex-col items-start hidden gap-8 md:flex"
              x-chunk="dashboard-03-chunk-0"
            >
              <form className="grid items-start w-full gap-6">
                <fieldset className="grid gap-6 p-4 border rounded-lg">
                  <legend className="px-1 -ml-1 text-sm font-medium">
                    Settings
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="model">Model</Label>
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
                            <Rabbit className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural
                                <span className="font-medium text-foreground">
                                  Genesis
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                Our fastest model for general use cases.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="explorer">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Bird className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Explorer
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                Performance and speed for efficiency.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="quantum">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Turtle className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Quantum
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                The most powerful model for complex
                                computations.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input id="temperature" type="number" placeholder="0.4" />
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
              <div className="flex-1" />
              {/* <MessageForm /> */}
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
