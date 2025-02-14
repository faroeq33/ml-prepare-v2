import HorizontalNavSection from "./sections/horizontal-nav-section";
import PoseFormSection from "./sections/pose-form-section";
import { Toaster } from "./ui/toaster";

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
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default App;
