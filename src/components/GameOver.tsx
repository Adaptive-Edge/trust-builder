import { Trophy, TrendingUp, Users, RotateCcw, Home } from "lucide-react";
import type { GameState } from "../hooks/useGameState";
import { calculateTrust } from "../hooks/useGameState";
import type { IndustryPreset } from "../data/industryPresets";

interface GameOverProps {
  state: GameState;
  preset: IndustryPreset;
  onRestart: () => void;
  onChangeIndustry: () => void;
}

export const GameOver = ({ state, preset, onRestart, onChangeIndustry }: GameOverProps) => {
  const trust = calculateTrust(state.dimensions);
  const numerator = state.dimensions.credibility + state.dimensions.reliability + state.dimensions.intimacy;
  
  const getTrustRating = (t: number) => {
    if (t >= 70) return { label: "Exceptional", color: "var(--trust-high)", description: "You built a genuinely trusted organization." };
    if (t >= 50) return { label: "Strong", color: "var(--trust-high)", description: "Solid trust foundation with room to grow." };
    if (t >= 35) return { label: "Moderate", color: "var(--trust-medium)", description: "Trust exists but is fragile." };
    if (t >= 20) return { label: "Weak", color: "var(--trust-low)", description: "Self-orientation has undermined trust." };
    return { label: "Critical", color: "var(--trust-low)", description: "Trust is severely damaged. Self-interest dominated." };
  };

  const rating = getTrustRating(trust);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="glass rounded-2xl p-8 text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4" style={{ color: rating.color }} />
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Simulation Complete
          </h1>
          <p className="text-xl mb-2" style={{ color: rating.color }}>
            Trust Rating: {rating.label}
          </p>
          <p className="text-[var(--muted-foreground)] mb-6">{rating.description}</p>

          {/* The Equation Result */}
          <div className="glass rounded-xl p-6 mb-6">
            <h3 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-3">
              Final Trust Equation
            </h3>
            <div className="flex items-center justify-center gap-4 text-2xl font-mono mb-4">
              <div className="text-center">
                <div className="text-[var(--ae-accent-cyan)] font-bold">{Math.round(numerator)}</div>
                <div className="text-xs text-[var(--muted-foreground)]">(C + R + I)</div>
              </div>
              <div className="text-3xl text-[var(--muted-foreground)]">/</div>
              <div className="text-center">
                <div className="text-[var(--trust-low)] font-bold">{Math.round(state.dimensions.selfOrientation)}</div>
                <div className="text-xs text-[var(--muted-foreground)]">(Self)</div>
              </div>
              <div className="text-3xl text-[var(--muted-foreground)]">=</div>
              <div className="text-center">
                <div className="font-bold text-3xl" style={{ color: rating.color }}>{trust}%</div>
                <div className="text-xs text-[var(--muted-foreground)]">Trust</div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div className="p-2 rounded bg-[var(--ae-purple-800)]">
                <div className="text-[var(--ae-accent-cyan)] font-bold">{Math.round(state.dimensions.credibility)}</div>
                <div className="text-xs text-[var(--muted-foreground)]">Credibility</div>
              </div>
              <div className="p-2 rounded bg-[var(--ae-purple-800)]">
                <div className="text-[var(--ae-accent-cyan)] font-bold">{Math.round(state.dimensions.reliability)}</div>
                <div className="text-xs text-[var(--muted-foreground)]">Reliability</div>
              </div>
              <div className="p-2 rounded bg-[var(--ae-purple-800)]">
                <div className="text-[var(--ae-accent-cyan)] font-bold">{Math.round(state.dimensions.intimacy)}</div>
                <div className="text-xs text-[var(--muted-foreground)]">Intimacy</div>
              </div>
              <div className="p-2 rounded bg-[var(--ae-purple-800)]">
                <div className="text-[var(--trust-low)] font-bold">{Math.round(state.dimensions.selfOrientation)}</div>
                <div className="text-xs text-[var(--muted-foreground)]">Self-Orient.</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass rounded-xl p-4">
              <Users className="w-6 h-6 mx-auto mb-2 text-[var(--ae-accent-cyan)]" />
              <p className="text-2xl font-bold text-[var(--foreground)]">{state.customers.toLocaleString()}</p>
              <p className="text-xs text-[var(--muted-foreground)]">{preset.metrics.customersLabel}</p>
            </div>
            <div className="glass rounded-xl p-4">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-[var(--ae-accent-gold)]" />
              <p className="text-2xl font-bold text-[var(--foreground)]">{state.profit}</p>
              <p className="text-xs text-[var(--muted-foreground)]">{preset.metrics.profitLabel}</p>
            </div>
          </div>

          {/* Insight */}
          <div className="mb-6 text-left">
            <h3 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Key Insight</h3>
            <p className="text-[var(--muted-foreground)] italic">
              "{preset.insights[Math.floor(Math.random() * preset.insights.length)]}"
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={onRestart}
              className="btn btn-primary flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
            <button
              onClick={onChangeIndustry}
              className="btn btn-secondary flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Change Industry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
