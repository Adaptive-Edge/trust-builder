import { useState, useCallback } from "react";
import type { IndustryPreset, Challenge } from "../data/industryPresets";

export interface GameState {
  resources: number;
  profit: number;
  customers: number;
  trust: number;
  round: number;
  maxRounds: number;
  actionsLeft: number;
  maxActions: number;
  pillars: Record<number, number>;
  playedInitiatives: number[];
  currentChallenge: Challenge | null;
  eventLog: string[];
  gameOver: boolean;
  feedbackHistory: Array<{
    personaId: string;
    message: string;
    pillar: number;
    sentiment: "positive" | "neutral" | "negative";
  }>;
}

const initialState: GameState = {
  resources: 10,
  profit: 100,
  customers: 1000,
  trust: 50,
  round: 1,
  maxRounds: 8,
  actionsLeft: 3,
  maxActions: 3,
  pillars: { 1: 50, 2: 50, 3: 50, 4: 50 },
  playedInitiatives: [],
  currentChallenge: null,
  eventLog: [],
  gameOver: false,
  feedbackHistory: [],
};

export const useGameState = (preset: IndustryPreset) => {
  const [state, setState] = useState<GameState>({
    ...initialState,
    eventLog: [
      "Welcome to Trust Builder! " + preset.welcomeMessage,
      "The simulation runs for " + initialState.maxRounds + " rounds. Choose up to " + initialState.maxActions + " initiatives per round.",
    ],
  });

  const calculateOverallTrust = useCallback((pillars: Record<number, number>) => {
    const values = Object.values(pillars);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  }, []);

  const addFeedback = useCallback(
    (pillar: number, trustLevel: number) => {
      const feedbackSet = preset.feedback[pillar];
      if (!feedbackSet) return;

      let sentiment: "positive" | "neutral" | "negative";
      let messages: string[];

      if (trustLevel >= 70) {
        sentiment = "positive";
        messages = feedbackSet.high;
      } else if (trustLevel >= 40) {
        sentiment = "neutral";
        messages = feedbackSet.medium;
      } else {
        sentiment = "negative";
        messages = feedbackSet.low;
      }

      const message = messages[Math.floor(Math.random() * messages.length)];
      const persona = preset.personas[Math.floor(Math.random() * preset.personas.length)];

      setState((prev) => ({
        ...prev,
        feedbackHistory: [
          {
            personaId: persona.id,
            message,
            pillar,
            sentiment,
          },
          ...prev.feedbackHistory,
        ].slice(0, 20),
      }));
    },
    [preset]
  );

  const playInitiative = useCallback(
    (initiativeId: number) => {
      const initiative = preset.initiatives.find((i) => i.id === initiativeId);
      if (!initiative) return false;

      let newTrustLevel = 0;

      setState((prev) => {
        if (prev.actionsLeft <= 0) return prev;
        if (prev.resources < initiative.cost) return prev;
        if (prev.playedInitiatives.includes(initiativeId)) return prev;

        const newPillars = { ...prev.pillars };
        newPillars[initiative.pillar] = Math.min(
          100,
          Math.max(0, newPillars[initiative.pillar] + initiative.trust)
        );
        newTrustLevel = newPillars[initiative.pillar];

        const pillarName = preset.pillars.find((p) => p.id === initiative.pillar)?.name || "Unknown";

        return {
          ...prev,
          resources: prev.resources - initiative.cost,
          profit: prev.profit + initiative.profit,
          actionsLeft: prev.actionsLeft - 1,
          pillars: newPillars,
          trust: calculateOverallTrust(newPillars),
          playedInitiatives: [...prev.playedInitiatives, initiativeId],
          eventLog: [
            ...prev.eventLog,
            "[Round " + prev.round + "] Implemented \"" + initiative.title + "\" (+" + initiative.trust + "% to " + pillarName + ")",
          ],
        };
      });

      setTimeout(() => {
        addFeedback(initiative.pillar, newTrustLevel);
      }, 500);

      return true;
    },
    [preset, calculateOverallTrust, addFeedback]
  );

  const applyChallenge = useCallback(
    (challenge: Challenge) => {
      setState((prev) => {
        const newPillars = { ...prev.pillars };

        Object.entries(challenge.pillarEffects).forEach(([pillarId, effect]) => {
          const id = parseInt(pillarId);
          newPillars[id] = Math.min(100, Math.max(0, newPillars[id] + effect));
        });

        let newProfit = prev.profit;
        let newCustomers = prev.customers;

        if (challenge.profitEffect) {
          newProfit = Math.floor(prev.profit * (1 + challenge.profitEffect / 100));
        }

        if (challenge.customerEffect) {
          newCustomers = Math.floor(prev.customers * (1 + challenge.customerEffect / 100));
        }

        return {
          ...prev,
          pillars: newPillars,
          profit: newProfit,
          customers: newCustomers,
          trust: calculateOverallTrust(newPillars),
          currentChallenge: challenge,
          eventLog: [
            ...prev.eventLog,
            "[Round " + prev.round + "] Challenge: " + challenge.title + " - " + challenge.effect,
          ],
        };
      });

      setTimeout(() => {
        const affectedPillars = Object.keys(challenge.pillarEffects).map(Number);
        if (affectedPillars.length > 0) {
          const randomPillar = affectedPillars[Math.floor(Math.random() * affectedPillars.length)];
          addFeedback(randomPillar, state.pillars[randomPillar] + (challenge.pillarEffects[randomPillar] || 0));
        }
      }, 800);
    },
    [calculateOverallTrust, addFeedback, state.pillars]
  );

  const nextRound = useCallback(() => {
    setState((prev) => {
      if (prev.round >= prev.maxRounds) {
        return {
          ...prev,
          gameOver: true,
          eventLog: [
            ...prev.eventLog,
            "=== SIMULATION COMPLETE ===",
            "Final Trust Score: " + prev.trust + "%",
            "Final " + preset.metrics.customersLabel + ": " + prev.customers,
            "Final " + preset.metrics.profitLabel + ": " + prev.profit,
          ],
        };
      }

      const resourceGain = Math.max(1, Math.floor(prev.profit / 25));

      let customerChange = 0;
      if (prev.trust >= 70) {
        customerChange = Math.floor(prev.customers * 0.05);
      } else if (prev.trust < 40) {
        customerChange = -Math.floor(prev.customers * 0.03);
      }

      return {
        ...prev,
        round: prev.round + 1,
        actionsLeft: prev.maxActions,
        resources: prev.resources + resourceGain,
        customers: prev.customers + customerChange,
        currentChallenge: null,
        eventLog: [
          ...prev.eventLog,
          "=== Round " + (prev.round + 1) + " ===",
          "Gained " + resourceGain + " resources. " + preset.metrics.customersLabel + ": " + (prev.customers + customerChange),
        ],
      };
    });

    if (Math.random() < 0.6) {
      const randomChallenge = preset.challenges[Math.floor(Math.random() * preset.challenges.length)];
      setTimeout(() => applyChallenge(randomChallenge), 300);
    }
  }, [preset, applyChallenge]);

  const resetGame = useCallback(() => {
    setState({
      ...initialState,
      eventLog: [
        "Welcome to Trust Builder! " + preset.welcomeMessage,
        "The simulation runs for " + initialState.maxRounds + " rounds. Choose up to " + initialState.maxActions + " initiatives per round.",
      ],
    });
  }, [preset]);

  const getAvailableInitiatives = useCallback(() => {
    return preset.initiatives.filter(
      (i) => !state.playedInitiatives.includes(i.id) && i.cost <= state.resources
    );
  }, [preset, state.playedInitiatives, state.resources]);

  return {
    state,
    playInitiative,
    nextRound,
    resetGame,
    getAvailableInitiatives,
    preset,
  };
};
