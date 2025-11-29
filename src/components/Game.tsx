import { ArrowRight, RotateCcw, HelpCircle, Home, Zap, AlertTriangle } from "lucide-react";
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
  const { state, playInitiative, nextRound, resetGame, getAvailableInitiatives, resolveDecision } = useGameState(preset);
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
  const hasPendingDecision = state.pendingDecision !== null;

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
                disabled={state.round >= state.maxRounds || hasPendingDecision}
                className="btn btn-primary flex items-center gap-2 disabled:opacity-50"
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
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-[var(--foreground)] mb-2">The Numerator (build these up)</h4>
                  <ul className="text-[var(--muted-foreground)] space-y-1 text-sm">
                    <li><strong className="text-[var(--ae-accent-cyan)]">Credibility</strong> - Can they trust what you say?</li>
                    <li><strong className="text-[var(--ae-accent-cyan)]">Reliability</strong> - Do you do what you say?</li>
                    <li><strong className="text-[var(--ae-accent-cyan)]">Intimacy</strong> - Do they feel safe with you?</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)] mb-2">Initiative Types</h4>
                  <ul className="text-[var(--muted-foreground)] space-y-1 text-sm">
                    <li><strong className="text-[var(--trust-high)]">Investments</strong> - Good but expensive</li>
                    <li><strong className="text-[var(--ae-accent-gold)]">Trade-offs</strong> - Mixed effects, real choices</li>
                    <li><strong className="text-gray-400">Necessary</strong> - Evils you may have to accept</li>
                    <li><strong className="text-[var(--trust-low)]">Tempting</strong> - High profit, high S cost</li>
                  </ul>
                </div>
              </div>
              <div className="p-3 bg-[var(--ae-purple-800)]/50 rounded-lg">
                <p className="text-sm text-[var(--muted-foreground)]">
                  <strong className="text-[var(--trust-low)]">Self-Orientation (S)</strong> - The denominator. It DIVIDES everything else.
                  It drifts up +2 every round. Tempting options increase it. Keep it low or watch your trust collapse.
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

        {/* Pending Decision Modal */}
        {hasPendingDecision && state.pendingDecision && (
          <div className="mb-6">
            <div className="glass rounded-xl p-6 border-2 border-[var(--ae-accent-gold)]">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-[var(--ae-accent-gold)]" />
                <h3 className="text-xl font-bold text-[var(--foreground)]">
                  Decision Required
                </h3>
              </div>
              <h4 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                {state.pendingDecision.title}
              </h4>
              <p className="text-[var(--muted-foreground)] mb-6">
                {state.pendingDecision.description}
              </p>
              <div className="grid gap-3">
                {state.pendingDecision.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => resolveDecision(index)}
                    className="w-full p-4 rounded-lg bg-[var(--ae-purple-800)]/50 hover:bg-[var(--ae-purple-700)]/50 border border-[var(--ae-purple-600)] text-left transition-all"
                  >
                    <div className="font-medium text-[var(--foreground)] mb-1">
                      {option.label}
                    </div>
                    <div className="text-sm text-[var(--muted-foreground)] flex flex-wrap gap-2">
                      {option.effects.credibility && (
                        <span className={option.effects.credibility > 0 ? "text-[var(--trust-high)]" : "text-[var(--trust-low)]"}>
                          C: {option.effects.credibility > 0 ? "+" : ""}{option.effects.credibility}
                        </span>
                      )}
                      {option.effects.reliability && (
                        <span className={option.effects.reliability > 0 ? "text-[var(--trust-high)]" : "text-[var(--trust-low)]"}>
                          R: {option.effects.reliability > 0 ? "+" : ""}{option.effects.reliability}
                        </span>
                      )}
                      {option.effects.intimacy && (
                        <span className={option.effects.intimacy > 0 ? "text-[var(--trust-high)]" : "text-[var(--trust-low)]"}>
                          I: {option.effects.intimacy > 0 ? "+" : ""}{option.effects.intimacy}
                        </span>
                      )}
                      {option.effects.selfOrientation && (
                        <span className={option.effects.selfOrientation < 0 ? "text-[var(--trust-high)]" : "text-[var(--trust-low)]"}>
                          S: {option.effects.selfOrientation > 0 ? "+" : ""}{option.effects.selfOrientation}
                        </span>
                      )}
                      {option.effects.profit && (
                        <span className={option.effects.profit > 0 ? "text-[var(--ae-accent-gold)]" : "text-gray-400"}>
                          Profit: {option.effects.profit > 0 ? "+" : ""}{option.effects.profit}
                        </span>
                      )}
                      {option.effects.customers && (
                        <span className={option.effects.customers > 0 ? "text-[var(--ae-accent-cyan)]" : "text-gray-400"}>
                          Customers: {option.effects.customers > 0 ? "+" : ""}{option.effects.customers}%
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
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

            <div className={`p-4 rounded-2xl border-2 border-dashed min-h-[400px] ${hasPendingDecision ? "border-[var(--ae-accent-gold)] bg-[var(--ae-accent-gold)]/5 opacity-50" : "border-[var(--ae-purple-600)] bg-[var(--ae-purple-900)]/30"}`}>
              {hasPendingDecision ? (
                <div className="text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-[var(--ae-accent-gold)] mx-auto mb-4" />
                  <p className="text-[var(--muted-foreground)]">
                    You must make a decision before continuing.
                  </p>
                </div>
              ) : state.actionsLeft === 0 ? (
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
