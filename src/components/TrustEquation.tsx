import type { TrustDimensions } from "../hooks/useGameState";
import { calculateTrust } from "../hooks/useGameState";

interface TrustEquationProps {
  dimensions: TrustDimensions;
}

export const TrustEquation = ({ dimensions }: TrustEquationProps) => {
  const trust = calculateTrust(dimensions);
  const numerator = dimensions.credibility + dimensions.reliability + dimensions.intimacy;
  
  const getTrustColor = (value: number) => {
    if (value >= 60) return "var(--trust-high)";
    if (value >= 35) return "var(--trust-medium)";
    return "var(--trust-low)";
  };

  const getSelfOrientationColor = (value: number) => {
    // Lower is better for self-orientation
    if (value <= 25) return "var(--trust-high)";
    if (value <= 45) return "var(--trust-medium)";
    return "var(--trust-low)";
  };

  return (
    <div className="glass rounded-xl p-5">
      <div className="text-center mb-4">
        <h3 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
          The Trust Equation
        </h3>
        <div className="text-4xl font-bold" style={{ color: getTrustColor(trust) }}>
          {trust}%
        </div>
        <p className="text-xs text-[var(--muted-foreground)] mt-1">Overall Trust</p>
      </div>
      
      {/* Visual equation */}
      <div className="flex items-center justify-center gap-2 text-lg font-mono mb-4">
        <div className="text-center">
          <div className="text-[var(--ae-accent-cyan)] font-bold">{Math.round(numerator)}</div>
          <div className="text-xs text-[var(--muted-foreground)]">C+R+I</div>
        </div>
        <div className="text-2xl text-[var(--muted-foreground)]">/</div>
        <div className="text-center">
          <div className="font-bold" style={{ color: getSelfOrientationColor(dimensions.selfOrientation) }}>
            {Math.round(dimensions.selfOrientation)}
          </div>
          <div className="text-xs text-[var(--muted-foreground)]">Self</div>
        </div>
      </div>

      {/* Individual dimensions */}
      <div className="space-y-3">
        <DimensionBar 
          label="Credibility" 
          abbrev="C"
          value={dimensions.credibility} 
          description="Can they trust what you say?"
          color="var(--ae-accent-cyan)"
        />
        <DimensionBar 
          label="Reliability" 
          abbrev="R"
          value={dimensions.reliability} 
          description="Do you do what you say?"
          color="var(--ae-accent-cyan)"
        />
        <DimensionBar 
          label="Intimacy" 
          abbrev="I"
          value={dimensions.intimacy} 
          description="Do they feel safe with you?"
          color="var(--ae-accent-cyan)"
        />
        <div className="border-t border-[var(--border)] pt-3 mt-3">
          <DimensionBar 
            label="Self-Orientation" 
            abbrev="S"
            value={dimensions.selfOrientation} 
            description="Are you in it for yourself? (lower is better)"
            color={getSelfOrientationColor(dimensions.selfOrientation)}
            inverted
          />
        </div>
      </div>
    </div>
  );
};

interface DimensionBarProps {
  label: string;
  abbrev: string;
  value: number;
  description: string;
  color: string;
  inverted?: boolean;
}

const DimensionBar = ({ label, abbrev, value, description, color, inverted }: DimensionBarProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: color, color: "var(--ae-purple-950)" }}>
            {abbrev}
          </span>
          <span className="text-sm text-[var(--foreground)]">{label}</span>
        </div>
        <span className="text-sm font-bold" style={{ color }}>{Math.round(value)}</span>
      </div>
      <div className="h-2 bg-[var(--ae-purple-800)] rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: value + "%",
            background: color,
            opacity: inverted ? 0.6 : 1,
          }}
        />
      </div>
      <p className="text-xs text-[var(--muted-foreground)] mt-1">{description}</p>
    </div>
  );
};
