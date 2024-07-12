import ModelSettingsSection from "./components/sections/ModelSettingsSection";
import HorizontalNavSection from "./components/sections/HorizontalNavSection";
import PoseFormSection from "./components/sections/PoseFormSection";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <>
      <HorizontalNavSection />
      <div className="container mx-auto">
        <div className="pt-8">
          <div className="flex">
            <div className="flex-1 col">
              <div className="w-full">
                <PoseFormSection />
              </div>
            </div>
            <div className="col">
              <div className="w-full">
                <ModelSettingsSection />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default App;
