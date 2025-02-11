import { LabeledPose } from "@/types/types";

function savePosesToFile(myPoses: LabeledPose[], metaData: object) {
  const currentdate = new Date();
  const datetime =
    currentdate.getDate() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getFullYear() +
    "@" +
    currentdate.getHours() +
    "h" +
    currentdate.getMinutes() +
    "m" +
    currentdate.getSeconds() +
    "s";

  const finalPoses = JSON.stringify(
    {
      data: myPoses,
      metaData: metaData,
    },
    null,
    2
  );
  const blob = new Blob([finalPoses], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `poses-${datetime}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
export default savePosesToFile;
