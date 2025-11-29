import type { Challenge } from "../data/industryPresets";
import { AlertTriangle, TrendingUp, Info } from "lucide-react";

interface ChallengeCardProps {
  challenge: Challenge | null;
  welcomeMessage: string;
  goalDescription: string;
}

const dimensionLabels: Record<string, string> = {
  credibility: "Credibility",
  reliability: "Reliability", 
  intimacy: "Intimacy",
  selfOrientation: "Self-Orientation",
};

export const ChallengeCard = ({ challenge, welcomeMessage, goalDescription }: ChallengeCardProps) => {
  if (!challenge) {
    return (
      <div className="glass rounded-xl p-4 border-l-4 border-[var(--ae-accent-cyan)]">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-[var(--ae-accent-cyan)]" />
          <h3 className="text-sm font-medium text-[var(--foreground)]">Current Status</h3>
        </div>
        <p className="text-sm text-[var(--muted-foreground)]">{welcomeMessage}</p>
        <p className="text-xs text-[var(--muted-foreground)] mt-2 italic">{goalDescription}</p>
      </div>
    );
  }

  const isPositive = challenge.effect > 0 && challenge.dimension !== "selfOrientation" ||
                     challenge.effect < 0 && challenge.dimension === "selfOrientation";

  return (
    <div
      className={`glass rounded-xl p-4 border-l-4 ${
        isPositive ? "border-[var(--trust-high)]" : "border-[var(--trust-low)]"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-[var(--trust-high)]" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-[var(--trust-low)]" />
        )}
        <h3 className="text-sm font-medium text-[var(--foreground)]">{challenge.title}</h3>
      </div>
      <p className="text-sm text-[var(--muted-foreground)] mb-2">{challenge.description}</p>
      <p
        className={`text-xs font-medium ${
          isPositive ? "text-[var(--trust-high)]" : "text-[var(--trust-low)]"
        }`}
      >
        {challenge.effect > 0 ? "+" : ""}{challenge.effect} {dimensionLabels[challenge.dimension]}
      </p>
    </div>
  );
};
