/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/ui/buttons/shadcnbutton/button";
import {
  FormProvider,
  FormControl,
  FormDescription,
  FormField,
  FormItemProvider,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  getDefaultSettings,
  HandLandmarkerSettings,
  HandLandmarkerSettingsSchema,
} from "@/utils/hand-landmarker";

const defaultSettings = getDefaultSettings();

function ModelSettingsSection() {
  const methods = useForm<HandLandmarkerSettings>({
    resolver: zodResolver(HandLandmarkerSettingsSchema),
    defaultValues: {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
        delegate: "GPU",
      },
      minTrackingConfidence: 0.5,
      minHandDetectionConfidence: 0.5,
      minHandPresenceConfidence: 0.5,
      runningMode: "VIDEO",
      numHands: 1,
    },
    values: defaultSettings, // Load the default settings from local storage
    mode: "onSubmit",
  });

  function onSubmit(data: HandLandmarkerSettings) {
    const result = HandLandmarkerSettingsSchema.parse(data);
    console.log(result);
    localStorage.setItem("handLandMarkerOptions", JSON.stringify(data));
    console.log("Saved to local storage");

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const onError = (errors: unknown) => {
    console.log(errors);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, onError)}
        className="space-y-6 w-2/3"
      >
        <FormField
          control={methods.control}
          name="numHands"
          render={({ field }) => (
            <FormItemProvider>
              <FormLabel className="capitalize">{field.name}</FormLabel>
              <FormDescription>
                Pick the number of hands to detect.
              </FormDescription>

              <Select
                onValueChange={field.onChange}
                defaultValue={defaultSettings.numHands?.toString() ?? "1"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of hands" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  {/* This application only supports 1 hand for now */}
                  {/* <SelectItem value="2">2</SelectItem> */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItemProvider>
          )}
        />
        <FormField
          control={methods.control}
          name="baseOptions.delegate"
          render={({ field }) => (
            <FormItemProvider>
              <FormLabel className="capitalize">{field.name}</FormLabel>
              <FormDescription>
                Select the computing delegate to use.
              </FormDescription>
              <Select
                onValueChange={field.onChange}
                defaultValue={defaultSettings.baseOptions.delegate}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="GPU">GPU</SelectItem>
                  {/* Cpu commented because cpu is just too slow on my machine */}
                  {/* <SelectItem value="CPU">CPU</SelectItem> */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItemProvider>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
export default ModelSettingsSection;
