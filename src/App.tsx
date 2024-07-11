import PoseFormSection from "./components/sections/PoseFormSection";

const App = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2">
        <div className="bg-purple-400 col">Settings</div>
        <div className="bg-pink-400 col">
          <PoseFormSection />
        </div>
      </div>
    </div>
  );
};

export default App;
