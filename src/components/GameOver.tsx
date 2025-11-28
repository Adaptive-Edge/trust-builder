import { Trophy, TrendingUp, Users, Target, RotateCcw, Home } from "lucide-react";
import type { GameState } from "../hooks/useGameState";
import type { IndustryPreset } from "../data/industryPresets";

interface GameOverProps {
  state: GameState;
  preset: IndustryPreset;
  onRestart: () => void;
  onChangeIndustry: () => void;
}

export const GameOver = ({ state, preset, onRestart, onChangeIndustry }: GameOverProps) => {
  const getTrustRating = (trust: number) => {
    if (trust >= 80) return { label: "Exceptional", color: "var(--trust-high)", description: "You have built an exemplary trusted organization." };
    if (trust >= 65) return { label: "Strong", color: "var(--trust-high)", description: "Your organization has earned significant stakeholder trust." };
    if (trust >= 50) return { label: "Moderate", color: "var(--trust-medium)", description: "You have maintained acceptable trust levels." };
    if (trust >= 35) return { label: "Weak", color: "var(--trust-low)", description: "Trust has eroded and needs attention." };
    return { label: "Critical", color: "var(--trust-low)", description: "Stakeholder trust is severely damaged." };
  };

  const rating = getTrustRating(state.trust);

  // Calculate pillar balance score
  const pillarValues = Object.values(state.pillars);
  const pillarAvg = pillarValues.reduce((a, b) => a + b, 0) / pillarValues.length;
  const pillarVariance = pillarValues.reduce((sum, val) => sum + Math.pow(val - pillarAvg, 2), 0) / pillarValues.length;
  const balanceScore = Math.max(0, 100 - Math.sqrt(pillarVariance) * 2);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="glass rounded-2xl p-8 text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4" style={{ color: rating.color }} />
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Simulation Complete
          </h1>
          <p className="text-xl mb-6" style={{ color: rating.color }}>
            Trust Rating: {rating.label}
          </p>
          <p className="text-[var(--muted-foreground)] mb-8">{rating.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-xl p-4">
              <Target className="w-6 h-6 mx-auto mb-2 text-[var(--ae-accent-magenta)]" />
              <p className="text-2xl font-bold text-[var(--foreground)]">{state.trust}%</p>
              <p className="text-xs text-[var(--muted-foreground)]">Final Trust</p>
            </div>
            <div className="glass rounded-xl p-4">
              <Users className="w-6 h-6 mx-auto mb-2 text-[var(--ae-accent-cyan)]" />
              <p className="text-2xl font-bold text-[var(--foreground)]">{state.customers.toLocaleString()}</p>
              <p className="text-xs text-[var(--muted-foreground)]">{preset.metrics.customersLabel}</p>
            </div>
            <div className="glass rounded-xl p-4">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-[var(--trust-high)]" />
              <p className="text-2xl font-bold text-[var(--foreground)]">{state.profit}</p>
              <p className="text-xs text-[var(--muted-foreground)]">{preset.metrics.profitLabel}</p>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="w-6 h-6 mx-auto mb-2 rounded-full bg-[var(--ae-accent-gold)] flex items-center justify-center text-xs font-bold text-[var(--ae-purple-950)]">B</div>
              <p className="text-2xl font-bold text-[var(--foreground)]">{Math.round(balanceScore)}%</p>
              <p className="text-xs text-[var(--muted-foreground)]">Balance Score</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Pillar Breakdown</h3>
            <div className="space-y-3">
              {preset.pillars.map((pillar) => (
                <div key={pillar.id} className="flex items-center gap-3">
                  <span className="text-sm text-[var(--muted-foreground)] w-40 text-left truncate">
                    {pillar.name}
                  </span>
                  <div className="flex-1 trust-meter">
                    <div
                      className="trust-fill"
                      style={{
                        width: `${state.pillars[pillar.id]}%`,
                        background:
                          state.pillars[pillar.id] >= 70
                            ? "var(--trust-high)"
                            : state.pillars[pillar.id] >= 40
                            ? "var(--trust-medium)"
                            : "var(--trust-low)",
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-[var(--foreground)] w-12">
                    {state.pillars[pillar.id]}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 text-left">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Key Insight</h3>
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
