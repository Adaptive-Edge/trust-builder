import { ArrowRight, RotateCcw, HelpCircle, Home } from "lucide-react";
import { useGameState } from "../hooks/useGameState";
import type { IndustryPreset } from "../data/industryPresets";
import { TrustPillar } from "./TrustPillar";
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
    <div className="min-h-screen p-4 md:p-6">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
              Trust Builder
            </h1>
            <p className="text-[var(--muted-foreground)]">{preset.name}</p>
          </div>
          <div className="flex gap-2">
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
        <div className="max-w-7xl mx-auto mb-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">How to Play</h3>
            <ul className="text-[var(--muted-foreground)] space-y-2 text-sm">
              <li>• Select up to 3 initiatives per round to build trust with stakeholders</li>
              <li>• Each initiative costs resources and affects trust in one of the four pillars</li>
              <li>• Random challenges will test your trust-building strategy</li>
              <li>• Balance all four pillars for the best overall trust score</li>
              <li>• Resources regenerate each round based on your performance</li>
              <li>• High trust attracts more stakeholders; low trust causes them to leave</li>
              <li>• The simulation runs for {state.maxRounds} rounds (2 business years)</li>
            </ul>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-4 text-[var(--ae-accent-cyan)] text-sm hover:underline"
            >
              Close Help
            </button>
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto mb-6">
        <GameStats
          resources={state.resources}
          profit={state.profit}
          customers={state.customers}
          trust={state.trust}
          round={state.round}
          maxRounds={state.maxRounds}
          actionsLeft={state.actionsLeft}
          labels={preset.metrics}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Game */}
          <div className="lg:col-span-2 space-y-6">
            {/* Challenge Card */}
            <ChallengeCard
              challenge={state.currentChallenge}
              welcomeMessage={preset.welcomeMessage}
              goalDescription={preset.goalDescription}
            />

            {/* Trust Pillars */}
            <div>
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                Trust Pillars
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {preset.pillars.map((pillar) => (
                  <TrustPillar
                    key={pillar.id}
                    pillar={pillar}
                    score={state.pillars[pillar.id]}
                  />
                ))}
              </div>
            </div>

            {/* Available Initiatives */}
            <div>
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                Available Initiatives
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                {state.actionsLeft} actions remaining this round
              </p>
              {state.actionsLeft === 0 ? (
                <div className="glass rounded-xl p-6 text-center">
                  <p className="text-[var(--muted-foreground)]">
                    No actions remaining. Click "Next Round" to continue.
                  </p>
                </div>
              ) : availableInitiatives.length === 0 ? (
                <div className="glass rounded-xl p-6 text-center">
                  <p className="text-[var(--muted-foreground)]">
                    No affordable initiatives available. Click "Next Round" to gain more resources.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {preset.initiatives
                    .filter((i) => !state.playedInitiatives.includes(i.id))
                    .map((initiative) => (
                      <InitiativeCard
                        key={initiative.id}
                        initiative={initiative}
                        pillar={preset.pillars.find((p) => p.id === initiative.pillar)}
                        canAfford={initiative.cost <= state.resources && state.actionsLeft > 0}
                        onPlay={() => playInitiative(initiative.id)}
                      />
                    ))}
                </div>
              )}
            </div>

            {/* Event Log */}
            <EventLog events={state.eventLog} />
          </div>

          {/* Right Column - Feedback */}
          <div className="lg:col-span-1">
            <CustomerFeedback
              feedback={state.feedbackHistory}
              personas={preset.personas}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-8 text-center">
        <p className="text-sm text-[var(--muted-foreground)]">
          Built by{" "}
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
  );
};
