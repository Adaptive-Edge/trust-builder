import type { Initiative } from "../data/industryPresets";
import { AlertTriangle, TrendingUp, Scale, Wrench } from "lucide-react";

interface InitiativeCardProps {
  initiative: Initiative;
  canAfford: boolean;
  onPlay: () => void;
}

const categoryConfig = {
  investment: { label: "Investment", color: "bg-[var(--trust-high)]", icon: TrendingUp },
  "trade-off": { label: "Trade-off", color: "bg-[var(--ae-accent-gold)]", icon: Scale },
  necessary: { label: "Necessary", color: "bg-gray-500", icon: Wrench },
  tempting: { label: "Tempting", color: "bg-[var(--trust-low)]", icon: AlertTriangle },
};

export const InitiativeCard = ({ initiative, canAfford, onPlay }: InitiativeCardProps) => {
  const effects = initiative.effects;
  const category = categoryConfig[initiative.category];
  const CategoryIcon = category.icon;

  const getBgClass = () => {
    switch (initiative.category) {
      case "tempting":
        return "bg-gradient-to-br from-[var(--ae-purple-800)] to-[oklch(0.25_0.15_30)] border border-[var(--trust-low)]/50";
      case "necessary":
        return "bg-gradient-to-br from-[var(--ae-purple-800)] to-[oklch(0.2_0.05_260)] border border-gray-500/30";
      case "trade-off":
        return "bg-gradient-to-br from-[var(--ae-purple-800)] to-[oklch(0.25_0.1_60)] border border-[var(--ae-accent-gold)]/30";
      default:
        return "glass";
    }
  };

  return (
    <div
      onClick={canAfford ? onPlay : undefined}
      className={`rounded-xl p-4 transition-all duration-200 ${getBgClass()} ${
        canAfford
          ? "cursor-pointer hover:translate-y-[-4px] hover:shadow-lg"
          : "opacity-50 cursor-not-allowed"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-base font-semibold text-[var(--foreground)]">
          {initiative.title}
        </h4>
        <div className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded ${category.color} text-white`}>
          <CategoryIcon className="w-3 h-3" />
          {category.label}
        </div>
      </div>

      <p className="text-sm text-[var(--muted-foreground)] mb-3">
        {initiative.description}
      </p>

      <div className="flex flex-wrap gap-1.5 text-xs">
        <span className="px-2 py-1 rounded bg-[var(--ae-purple-700)] text-[var(--foreground)]">
          Cost: {initiative.cost}
        </span>

        {effects.credibility && (
          <span className={`px-2 py-1 rounded ${effects.credibility > 0 ? "bg-[var(--ae-accent-cyan)]/20 text-[var(--ae-accent-cyan)]" : "bg-[var(--trust-low)]/20 text-[var(--trust-low)]"}`}>
            {effects.credibility > 0 ? "+" : ""}{effects.credibility} C
          </span>
        )}

        {effects.reliability && (
          <span className={`px-2 py-1 rounded ${effects.reliability > 0 ? "bg-[var(--ae-accent-cyan)]/20 text-[var(--ae-accent-cyan)]" : "bg-[var(--trust-low)]/20 text-[var(--trust-low)]"}`}>
            {effects.reliability > 0 ? "+" : ""}{effects.reliability} R
          </span>
        )}

        {effects.intimacy && (
          <span className={`px-2 py-1 rounded ${effects.intimacy > 0 ? "bg-[var(--ae-accent-cyan)]/20 text-[var(--ae-accent-cyan)]" : "bg-[var(--trust-low)]/20 text-[var(--trust-low)]"}`}>
            {effects.intimacy > 0 ? "+" : ""}{effects.intimacy} I
          </span>
        )}

        {effects.selfOrientation && (
          <span className={`px-2 py-1 rounded ${effects.selfOrientation < 0 ? "bg-[var(--trust-high)]/20 text-[var(--trust-high)]" : "bg-[var(--trust-low)]/20 text-[var(--trust-low)]"}`}>
            {effects.selfOrientation > 0 ? "+" : ""}{effects.selfOrientation} S
          </span>
        )}

        {effects.profit && (
          <span className={`px-2 py-1 rounded ${effects.profit > 0 ? "bg-[var(--ae-accent-gold)]/20 text-[var(--ae-accent-gold)]" : "bg-[var(--muted)]/50 text-[var(--muted-foreground)]"}`}>
            {effects.profit > 0 ? "+" : ""}{effects.profit} Profit
          </span>
        )}
      </div>
    </div>
  );
};
