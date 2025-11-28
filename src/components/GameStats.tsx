import { Coins, TrendingUp, Users, Target, RotateCcw } from "lucide-react";

interface GameStatsProps {
  resources: number;
  profit: number;
  customers: number;
  trust: number;
  round: number;
  maxRounds: number;
  actionsLeft: number;
  labels: {
    resourcesLabel: string;
    profitLabel: string;
    customersLabel: string;
  };
}

export const GameStats = ({
  resources,
  profit,
  customers,
  trust,
  round,
  maxRounds,
  actionsLeft,
  labels,
}: GameStatsProps) => {
  return (
    <div className="glass rounded-xl p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-[var(--ae-accent-gold)]" />
          <div>
            <p className="text-xs text-[var(--muted-foreground)]">{labels.resourcesLabel}</p>
            <p className="text-lg font-bold text-[var(--foreground)]">{resources}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[var(--trust-high)]" />
          <div>
            <p className="text-xs text-[var(--muted-foreground)]">{labels.profitLabel}</p>
            <p className="text-lg font-bold text-[var(--foreground)]">{profit}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[var(--ae-accent-cyan)]" />
          <div>
            <p className="text-xs text-[var(--muted-foreground)]">{labels.customersLabel}</p>
            <p className="text-lg font-bold text-[var(--foreground)]">{customers.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-[var(--ae-accent-magenta)]" />
          <div>
            <p className="text-xs text-[var(--muted-foreground)]">Overall Trust</p>
            <p className="text-lg font-bold text-[var(--foreground)]">{trust}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-[var(--muted-foreground)]" />
          <div>
            <p className="text-xs text-[var(--muted-foreground)]">Round</p>
            <p className="text-lg font-bold text-[var(--foreground)]">{round}/{maxRounds}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[var(--ae-accent-cyan)] flex items-center justify-center text-xs font-bold text-[var(--ae-purple-950)]">
            {actionsLeft}
          </div>
          <div>
            <p className="text-xs text-[var(--muted-foreground)]">Actions Left</p>
            <p className="text-lg font-bold text-[var(--foreground)]">{actionsLeft}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
