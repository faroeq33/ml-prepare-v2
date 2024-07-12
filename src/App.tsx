import HorizontalNavSection from "./components/sections/HorizontalNavSection";
import { ModelSettingsSection } from "./components/sections/ModelSettingsSection";
import PoseFormSection from "./components/sections/PoseFormSection";

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
    </>
  );
};

export default App;
