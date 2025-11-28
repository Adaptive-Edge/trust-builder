import type { TrustPillar as TrustPillarType } from "../data/industryPresets";

interface TrustPillarProps {
  pillar: TrustPillarType;
  score: number;
}

export const TrustPillar = ({ pillar, score }: TrustPillarProps) => {
  const getTrustColor = (value: number) => {
    if (value >= 70) return "var(--trust-high)";
    if (value >= 40) return "var(--trust-medium)";
    return "var(--trust-low)";
  };

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">{pillar.name}</h3>
        <span
          className="text-2xl font-bold"
          style={{ color: getTrustColor(score) }}
        >
          {score}%
        </span>
      </div>
      <div className="trust-meter mb-3">
        <div
          className="trust-fill"
          style={{
            width: `${score}%`,
            background: getTrustColor(score),
          }}
        />
      </div>
      <p className="text-sm text-[var(--muted-foreground)] mb-2">{pillar.description}</p>
      <div className="flex flex-wrap gap-1">
        {pillar.focusAreas.map((area) => (
          <span
            key={area}
            className="text-xs px-2 py-1 rounded-full bg-[var(--secondary)] text-[var(--secondary-foreground)]"
          >
            {area}
          </span>
        ))}
      </div>
    </div>
  );
};
