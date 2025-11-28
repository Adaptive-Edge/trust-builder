import { Building2, Landmark, Heart, Laptop } from "lucide-react";
import { getPresetList } from "../data/industryPresets";

interface IndustrySelectorProps {
  onSelect: (industryId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-8 h-8" />,
  Landmark: <Landmark className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
  Laptop: <Laptop className="w-8 h-8" />,
};

export const IndustrySelector = ({ onSelect }: IndustrySelectorProps) => {
  const presets = getPresetList();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            Trust Builder
          </h1>
          <p className="text-xl text-[var(--muted-foreground)] mb-2">
            An interactive simulation for exploring trust dynamics
          </p>
          <p className="text-[var(--muted-foreground)]">
            Select an industry context to begin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelect(preset.id)}
              className="glass rounded-xl p-6 text-left transition-all duration-200 hover:translate-y-[-4px] hover:shadow-xl group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-[var(--ae-accent-cyan)]/20 text-[var(--ae-accent-cyan)] group-hover:bg-[var(--ae-accent-cyan)] group-hover:text-[var(--ae-purple-950)] transition-colors">
                  {iconMap[preset.icon]}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                    {preset.name}
                  </h3>
                  <p className="text-[var(--muted-foreground)]">{preset.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">
            Built by{" "}
            <a
              href="https://adaptiveedge.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ae-accent-cyan)] hover:underline"
            >
              Adaptive Edge
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
