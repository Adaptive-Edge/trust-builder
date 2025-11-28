import type { Initiative, TrustPillar } from "../data/industryPresets";

interface InitiativeCardProps {
  initiative: Initiative;
  pillar: TrustPillar | undefined;
  canAfford: boolean;
  onPlay: () => void;
}

export const InitiativeCard = ({ initiative, pillar, canAfford, onPlay }: InitiativeCardProps) => {
  return (
    <div
      onClick={canAfford ? onPlay : undefined}
      className={`glass rounded-xl p-4 transition-all duration-200 ${
        canAfford
          ? "cursor-pointer hover:translate-y-[-4px] hover:shadow-lg"
          : "opacity-50 cursor-not-allowed"
      }`}
    >
      <h4 className="text-base font-semibold text-[var(--foreground)] mb-2">
        {initiative.title}
      </h4>
      <p className="text-sm text-[var(--muted-foreground)] mb-3">
        {initiative.description}
      </p>
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-1 rounded bg-[var(--ae-purple-700)] text-[var(--foreground)]">
          Cost: {initiative.cost}
        </span>
        <span
          className="px-2 py-1 rounded text-white"
          style={{ background: "var(--trust-high)" }}
        >
          +{initiative.trust}% Trust
        </span>
        <span
          className={`px-2 py-1 rounded ${
            initiative.profit >= 0
              ? "bg-[var(--trust-high)] text-white"
              : "bg-[var(--trust-low)] text-white"
          }`}
        >
          {initiative.profit >= 0 ? "+" : ""}{initiative.profit} Profit
        </span>
        {pillar && (
          <span className="px-2 py-1 rounded bg-[var(--ae-accent-cyan)] text-[var(--ae-purple-950)]">
            {pillar.name}
          </span>
        )}
      </div>
    </div>
  );
};
