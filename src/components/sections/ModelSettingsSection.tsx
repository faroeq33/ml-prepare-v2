import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Schema, z } from "zod";

import { Button } from "@/components/ui/buttons/shadcnbutton/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { getDefaultSettings } from "@/utils/HandLandmarker";

// The formschema is used to configure handLandmarker settings
const formSchema = z.object({
  baseOptions: z.object({
    modelAssetPath: z.string().url(),
    delegate: z.enum(["GPU", "CPU"]),
  }),
  minTrackingConfidence: z.coerce.number().min(0.1).max(1),
  minHandDetectionConfidence: z.coerce.number(),
  minHandPresenceConfidence: z.coerce.number(),
  // Uncomment the following line if runningMode should be included in the schema
  // runningMode: z.enum(["VIDEO"]),
  numHands: z.coerce.number().min(1).max(2),
});

// const defaultFormValues = ;

type Schema = z.input<typeof formSchema>;

function ModelSettingsSection() {
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
        delegate: "GPU",
      },
      minTrackingConfidence: 0.5,
      minHandDetectionConfidence: 0.5,
      minHandPresenceConfidence: 0.5,
      // runningMode: "VIDEO",
      numHands: 1,
    },
    values: getDefaultSettings(), // Load the default settings from local storage
    mode: "onSubmit",
  });

  function onSubmit(data: Schema) {
    const result = formSchema.parse(data);
    console.log(result);
    localStorage.setItem("handLandMarkerOptions", JSON.stringify(data));
    console.log("sent");

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  // const onSubmit = (data: Schema) => {
  //   console.log(data);
  // };
  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="numHands"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">{field.name}</FormLabel>
              <FormDescription>
                Pick the number of hands to detect.
              </FormDescription>

              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of hands" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="baseOptions.delegate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">{field.name}</FormLabel>
              <FormDescription>
                Select the computing delegate to use.
              </FormDescription>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="GPU">GPU</SelectItem>
                  <SelectItem value="CPU">CPU</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
export default ModelSettingsSection;
