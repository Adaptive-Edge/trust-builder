import { ArrowRight, RotateCcw, HelpCircle, Home, Zap } from "lucide-react";
import { useGameState } from "../hooks/useGameState";
import type { IndustryPreset } from "../data/industryPresets";
import { TrustEquation } from "./TrustEquation";
import { InitiativeCard } from "./InitiativeCard";
import { ChallengeCard } from "./ChallengeCard";
import { CustomerFeedback } from "./CustomerFeedback";
import { GameStats } from "./GameStats";
import { EventLog } from "./EventLog";
import { GameOver } from "./GameOver";
import { useState } from "react";

interface GameProps {
  preset: IndustryPreset;
  onChangeIndustry: () => void;
}

export const Game = ({ preset, onChangeIndustry }: GameProps) => {
  const { state, playInitiative, nextRound, resetGame, getAvailableInitiatives } = useGameState(preset);
  const [showHelp, setShowHelp] = useState(false);

  if (state.gameOver) {
    return (
      <GameOver
        state={state}
        preset={preset}
        onRestart={resetGame}
        onChangeIndustry={onChangeIndustry}
      />
    );
  }

  const availableInitiatives = getAvailableInitiatives();

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-7xl px-6 md:px-8 lg:px-10 py-6">
        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                Trust Builder
              </h1>
              <p className="text-[var(--muted-foreground)]">{preset.name}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="btn btn-secondary flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4" />
                Help
              </button>
              <button
                onClick={onChangeIndustry}
                className="btn btn-secondary flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Industries
              </button>
              <button
                onClick={resetGame}
                className="btn btn-secondary flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Restart
              </button>
              <button
                onClick={nextRound}
                disabled={state.round >= state.maxRounds}
                className="btn btn-primary flex items-center gap-2"
              >
                Next Round
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Help Panel */}
        {showHelp && (
          <div className="mb-6">
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">The Trust Equation</h3>
              <p className="text-[var(--foreground)] font-mono text-xl mb-4">
                Trust = (Credibility + Reliability + Intimacy) / Self-Orientation
              </p>
              <ul className="text-[var(--muted-foreground)] space-y-2 text-sm">
                <li><strong className="text-[var(--ae-accent-cyan)]">Credibility (C)</strong> - Can they trust what you say? Your expertise, accuracy, credentials.</li>
                <li><strong className="text-[var(--ae-accent-cyan)]">Reliability (R)</strong> - Do you do what you say? Consistency, follow-through, dependability.</li>
                <li><strong className="text-[var(--ae-accent-cyan)]">Intimacy (I)</strong> - Do they feel safe with you? Empathy, discretion, understanding.</li>
                <li><strong className="text-[var(--trust-low)]">Self-Orientation (S)</strong> - Are you in it for yourself? This DIVIDES everything else. Keep it low.</li>
              </ul>
              <div className="mt-4 p-3 bg-[var(--ae-purple-800)]/50 rounded-lg">
                <p className="text-sm text-[var(--muted-foreground)]">
                  <strong className="text-[var(--ae-accent-gold)]">Warning:</strong> "Tempting" initiatives offer high profit but increase self-orientation. 
                  Self-orientation also drifts up each round. The denominator is the trust killer.
                </p>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="mt-4 text-[var(--ae-accent-cyan)] text-sm hover:underline"
              >
                Close Help
              </button>
            </div>
          </div>
        )}

        {/* Main Layout: 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column - Trust Equation Dashboard */}
          <div className="lg:col-span-3 space-y-4">
            <TrustEquation dimensions={state.dimensions} />
            
            {/* Challenge Card */}
            <ChallengeCard
              challenge={state.currentChallenge}
              welcomeMessage={preset.welcomeMessage}
              goalDescription={preset.goalDescription}
            />
          </div>

          {/* Middle Column - Actions */}
          <div className="lg:col-span-6">
            {/* Stats Bar */}
            <div className="mb-4">
              <GameStats
                resources={state.resources}
                profit={state.profit}
                customers={state.customers}
                round={state.round}
                maxRounds={state.maxRounds}
                actionsLeft={state.actionsLeft}
                labels={preset.metrics}
              />
            </div>

            {/* Action Area */}
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-[var(--ae-accent-gold)]"/>
              <h2 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                Available Initiatives
              </h2>
              <span className="ml-auto text-sm text-[var(--ae-accent-cyan)] font-medium">
                {state.actionsLeft} actions remaining
              </span>
            </div>
            
            <div className="p-4 rounded-2xl border-2 border-dashed border-[var(--ae-purple-600)] bg-[var(--ae-purple-900)]/30 min-h-[400px]">
              {state.actionsLeft === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[var(--muted-foreground)] mb-4">
                    No actions remaining this round.
                  </p>
                  <button
                    onClick={nextRound}
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    Next Round
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : availableInitiatives.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[var(--muted-foreground)] mb-4">
                    No affordable initiatives. Advance to gain resources.
                  </p>
                  <button
                    onClick={nextRound}
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    Next Round
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {preset.initiatives
                    .filter((i) => !state.playedInitiatives.includes(i.id))
                    .map((initiative) => (
                      <InitiativeCard
                        key={initiative.id}
                        initiative={initiative}
                        canAfford={initiative.cost <= state.resources && state.actionsLeft > 0}
                        onPlay={() => playInitiative(initiative.id)}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Feedback & Log */}
          <div className="lg:col-span-3 space-y-4">
            <CustomerFeedback
              feedback={state.feedbackHistory}
              personas={preset.personas}
            />
            <EventLog events={state.eventLog} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">
            Based on the Trust Equation by Maister, Green & Galford •{" "}
            <a
              href="https://adaptiveedge.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ae-accent-cyan)] hover:underline"
            >
              Adaptive Edge
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};
