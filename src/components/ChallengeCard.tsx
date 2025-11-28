import type { Challenge } from "../data/industryPresets";
import { AlertTriangle, TrendingUp } from "lucide-react";

interface ChallengeCardProps {
  challenge: Challenge | null;
  welcomeMessage: string;
  goalDescription: string;
}

export const ChallengeCard = ({ challenge, welcomeMessage, goalDescription }: ChallengeCardProps) => {
  const isPositive = challenge && Object.values(challenge.pillarEffects).some((v) => v > 0);

  if (!challenge) {
    return (
      <div className="glass rounded-xl p-5 border-l-4 border-[var(--ae-accent-cyan)]">
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Current Status</h3>
        <p className="text-[var(--muted-foreground)]">{welcomeMessage}</p>
        <p className="text-sm text-[var(--muted-foreground)] mt-2 italic">{goalDescription}</p>
      </div>
    );
  }

  return (
    <div
      className={`glass rounded-xl p-5 border-l-4 ${
        isPositive ? "border-[var(--trust-high)]" : "border-[var(--trust-low)]"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        {isPositive ? (
          <TrendingUp className="w-5 h-5 text-[var(--trust-high)]" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-[var(--trust-low)]" />
        )}
        <h3 className="text-lg font-semibold text-[var(--foreground)]">{challenge.title}</h3>
      </div>
      <p className="text-[var(--muted-foreground)] mb-2">{challenge.description}</p>
      <p
        className={`text-sm font-medium ${
          isPositive ? "text-[var(--trust-high)]" : "text-[var(--trust-low)]"
        }`}
      >
        {challenge.effect}
      </p>
    </div>
  );
};
