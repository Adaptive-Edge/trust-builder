import type { Initiative } from "../data/industryPresets";
import { AlertTriangle } from "lucide-react";

interface InitiativeCardProps {
  initiative: Initiative;
  canAfford: boolean;
  onPlay: () => void;
}

export const InitiativeCard = ({ initiative, canAfford, onPlay }: InitiativeCardProps) => {
  const effects = initiative.effects;
  
  return (
    <div
      onClick={canAfford ? onPlay : undefined}
      className={`rounded-xl p-4 transition-all duration-200 ${
        initiative.tempting 
          ? "bg-gradient-to-br from-[var(--ae-purple-800)] to-[oklch(0.25_0.15_30)] border border-[var(--trust-low)]/50"
          : "glass"
      } ${
        canAfford
          ? "cursor-pointer hover:translate-y-[-4px] hover:shadow-lg"
          : "opacity-50 cursor-not-allowed"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-base font-semibold text-[var(--foreground)]">
          {initiative.title}
        </h4>
        {initiative.tempting && (
          <div className="flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-[var(--trust-low)] text-white">
            <AlertTriangle className="w-3 h-3" />
            Tempting
          </div>
        )}
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
