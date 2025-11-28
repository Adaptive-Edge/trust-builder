import { useState } from "react";
import { IndustrySelector } from "./components/IndustrySelector";
import { Game } from "./components/Game";
import { getPreset } from "./data/industryPresets";
import "./index.css";

function App() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const handleSelectIndustry = (industryId: string) => {
    setSelectedIndustry(industryId);
  };

  const handleChangeIndustry = () => {
    setSelectedIndustry(null);
  };

  if (!selectedIndustry) {
    return <IndustrySelector onSelect={handleSelectIndustry} />;
  }

  const preset = getPreset(selectedIndustry);

  return <Game preset={preset} onChangeIndustry={handleChangeIndustry} />;
}

export default App;
