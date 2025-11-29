import { useState, useCallback } from "react";
import type { IndustryPreset, Challenge } from "../data/industryPresets";

export interface TrustDimensions {
  credibility: number;
  reliability: number;
  intimacy: number;
  selfOrientation: number;
}

export interface GameState {
  resources: number;
  profit: number;
  customers: number;
  dimensions: TrustDimensions;
  round: number;
  maxRounds: number;
  actionsLeft: number;
  maxActions: number;
  playedInitiatives: number[];
  currentChallenge: Challenge | null;
  eventLog: string[];
  gameOver: boolean;
  feedbackHistory: Array<{
    personaId: string;
    message: string;
    dimension: keyof TrustDimensions;
    sentiment: "positive" | "neutral" | "negative";
  }>;
}

const initialDimensions: TrustDimensions = {
  credibility: 40,
  reliability: 40,
  intimacy: 40,
  selfOrientation: 30, // Lower is better - starts moderate
};

const initialState: GameState = {
  resources: 10,
  profit: 100,
  customers: 1000,
  dimensions: { ...initialDimensions },
  round: 1,
  maxRounds: 8,
  actionsLeft: 3,
  maxActions: 3,
  playedInitiatives: [],
  currentChallenge: null,
  eventLog: [],
  gameOver: false,
  feedbackHistory: [],
};

// Calculate trust using the Trust Equation
export const calculateTrust = (dims: TrustDimensions): number => {
  const numerator = dims.credibility + dims.reliability + dims.intimacy;
  const denominator = Math.max(dims.selfOrientation, 10); // Minimum 10 to avoid division issues
  const trust = (numerator / denominator) * 10; // Scale to reasonable range
  return Math.min(100, Math.max(0, Math.round(trust)));
};

// Diminishing returns: each point in a dimension is harder to get
const applyDiminishingReturns = (currentValue: number, change: number): number => {
  if (change <= 0) return currentValue + change; // No diminishing for decreases
  
  // The higher the current value, the less impact new investments have
  const diminishingFactor = 1 - (currentValue / 150); // Approaches 0 as value approaches 150
  const adjustedChange = change * Math.max(0.3, diminishingFactor);
  return currentValue + adjustedChange;
};

export const useGameState = (preset: IndustryPreset) => {
  const [state, setState] = useState<GameState>({
    ...initialState,
    eventLog: [
      "Welcome to Trust Builder!",
      "Trust = (Credibility + Reliability + Intimacy) / Self-Orientation",
      preset.welcomeMessage,
    ],
  });

  const addFeedback = useCallback(
    (dimension: keyof TrustDimensions, value: number) => {
      const feedbackSet = preset.feedback[dimension];
      if (!feedbackSet) return;

      let sentiment: "positive" | "neutral" | "negative";
      let messages: string[];

      // For self-orientation, lower is better
      if (dimension === "selfOrientation") {
        if (value <= 25) {
          sentiment = "positive";
          messages = feedbackSet.low; // Low self-orientation = good
        } else if (value <= 45) {
          sentiment = "neutral";
          messages = feedbackSet.medium;
        } else {
          sentiment = "negative";
          messages = feedbackSet.high; // High self-orientation = bad
        }
      } else {
        if (value >= 60) {
          sentiment = "positive";
          messages = feedbackSet.high;
        } else if (value >= 35) {
          sentiment = "neutral";
          messages = feedbackSet.medium;
        } else {
          sentiment = "negative";
          messages = feedbackSet.low;
        }
      }

      const message = messages[Math.floor(Math.random() * messages.length)];
      const persona = preset.personas[Math.floor(Math.random() * preset.personas.length)];

      setState((prev) => ({
        ...prev,
        feedbackHistory: [
          {
            personaId: persona.id,
            message,
            dimension,
            sentiment,
          },
          ...prev.feedbackHistory,
        ].slice(0, 15),
      }));
    },
    [preset]
  );

  const playInitiative = useCallback(
    (initiativeId: number) => {
      const initiative = preset.initiatives.find((i) => i.id === initiativeId);
      if (!initiative) return false;

      setState((prev) => {
        if (prev.actionsLeft <= 0) return prev;
        if (prev.resources < initiative.cost) return prev;
        if (prev.playedInitiatives.includes(initiativeId)) return prev;

        const newDimensions = { ...prev.dimensions };
        const effects = initiative.effects;
        
        // Apply effects with diminishing returns for positive changes
        if (effects.credibility) {
          newDimensions.credibility = Math.min(100, Math.max(0, 
            applyDiminishingReturns(newDimensions.credibility, effects.credibility)
          ));
        }
        if (effects.reliability) {
          newDimensions.reliability = Math.min(100, Math.max(0,
            applyDiminishingReturns(newDimensions.reliability, effects.reliability)
          ));
        }
        if (effects.intimacy) {
          newDimensions.intimacy = Math.min(100, Math.max(0,
            applyDiminishingReturns(newDimensions.intimacy, effects.intimacy)
          ));
        }
        if (effects.selfOrientation) {
          // Self-orientation changes are direct (no diminishing returns)
          newDimensions.selfOrientation = Math.min(100, Math.max(5,
            newDimensions.selfOrientation + effects.selfOrientation
          ));
        }

        const profitChange = effects.profit || 0;
        const trust = calculateTrust(newDimensions);
        
        // Build effect description
        const effectParts: string[] = [];
        if (effects.credibility) effectParts.push((effects.credibility > 0 ? "+" : "") + effects.credibility + " Cred");
        if (effects.reliability) effectParts.push((effects.reliability > 0 ? "+" : "") + effects.reliability + " Rel");
        if (effects.intimacy) effectParts.push((effects.intimacy > 0 ? "+" : "") + effects.intimacy + " Int");
        if (effects.selfOrientation) effectParts.push((effects.selfOrientation > 0 ? "+" : "") + effects.selfOrientation + " Self");
        
        const temptingNote = initiative.tempting ? " [TEMPTING]" : "";

        return {
          ...prev,
          resources: prev.resources - initiative.cost,
          profit: prev.profit + profitChange,
          actionsLeft: prev.actionsLeft - 1,
          dimensions: newDimensions,
          playedInitiatives: [...prev.playedInitiatives, initiativeId],
          eventLog: [
            ...prev.eventLog,
            "[Round " + prev.round + "] " + initiative.title + temptingNote + " (" + effectParts.join(", ") + ") - Trust: " + trust + "%",
          ],
        };
      });

      // Determine which dimension was most affected for feedback
      const effects = initiative.effects;
      const dims: Array<keyof TrustDimensions> = ["credibility", "reliability", "intimacy", "selfOrientation"];
      let maxDim: keyof TrustDimensions = "credibility";
      let maxEffect = 0;
      
      dims.forEach(dim => {
        const effect = Math.abs(effects[dim] || 0);
        if (effect > maxEffect) {
          maxEffect = effect;
          maxDim = dim;
        }
      });

      setTimeout(() => {
        addFeedback(maxDim, state.dimensions[maxDim] + (effects[maxDim] || 0));
      }, 500);

      return true;
    },
    [preset, addFeedback, state.dimensions]
  );

  const applyChallenge = useCallback(
    (challenge: Challenge) => {
      setState((prev) => {
        const newDimensions = { ...prev.dimensions };
        
        // Apply challenge effect to the specified dimension
        if (challenge.dimension === "selfOrientation") {
          newDimensions.selfOrientation = Math.min(100, Math.max(5,
            newDimensions.selfOrientation + challenge.effect
          ));
        } else {
          newDimensions[challenge.dimension] = Math.min(100, Math.max(0,
            newDimensions[challenge.dimension] + challenge.effect
          ));
        }

        let newProfit = prev.profit;
        let newCustomers = prev.customers;

        if (challenge.profitEffect) {
          newProfit = Math.floor(prev.profit + challenge.profitEffect);
        }

        if (challenge.customerEffect) {
          newCustomers = Math.floor(prev.customers * (1 + challenge.customerEffect / 100));
        }

        const trust = calculateTrust(newDimensions);
        const dimLabel = challenge.dimension.charAt(0).toUpperCase() + challenge.dimension.slice(1);
        const effectSign = challenge.effect > 0 ? "+" : "";

        return {
          ...prev,
          dimensions: newDimensions,
          profit: newProfit,
          customers: newCustomers,
          currentChallenge: challenge,
          eventLog: [
            ...prev.eventLog,
            "[Round " + prev.round + "] CHALLENGE: " + challenge.title + " (" + effectSign + challenge.effect + " " + dimLabel + ") - Trust: " + trust + "%",
          ],
        };
      });

      setTimeout(() => {
        addFeedback(challenge.dimension, state.dimensions[challenge.dimension] + challenge.effect);
      }, 800);
    },
    [addFeedback, state.dimensions]
  );

  const nextRound = useCallback(() => {
    setState((prev) => {
      if (prev.round >= prev.maxRounds) {
        const finalTrust = calculateTrust(prev.dimensions);
        return {
          ...prev,
          gameOver: true,
          eventLog: [
            ...prev.eventLog,
            "=== SIMULATION COMPLETE ===",
            "Final Trust Score: " + finalTrust + "%",
            "C: " + Math.round(prev.dimensions.credibility) + " + R: " + Math.round(prev.dimensions.reliability) + " + I: " + Math.round(prev.dimensions.intimacy) + " / S: " + Math.round(prev.dimensions.selfOrientation),
            "Final " + preset.metrics.customersLabel + ": " + prev.customers,
            "Final " + preset.metrics.profitLabel + ": " + prev.profit,
          ],
        };
      }

      // Self-orientation creeps up slightly each round (pressure to monetize)
      const newDimensions = { ...prev.dimensions };
      newDimensions.selfOrientation = Math.min(100, newDimensions.selfOrientation + 1);
      
      // Small decay in other dimensions without reinforcement
      newDimensions.credibility = Math.max(0, newDimensions.credibility - 0.5);
      newDimensions.reliability = Math.max(0, newDimensions.reliability - 0.5);
      newDimensions.intimacy = Math.max(0, newDimensions.intimacy - 0.5);

      const trust = calculateTrust(newDimensions);
      
      // Resource gain based on profit
      const resourceGain = Math.max(1, Math.floor(prev.profit / 25));

      // Customer growth/loss based on trust
      let customerChange = 0;
      if (trust >= 60) {
        customerChange = Math.floor(prev.customers * 0.05);
      } else if (trust < 30) {
        customerChange = -Math.floor(prev.customers * 0.05);
      }

      return {
        ...prev,
        round: prev.round + 1,
        actionsLeft: prev.maxActions,
        resources: prev.resources + resourceGain,
        customers: prev.customers + customerChange,
        dimensions: newDimensions,
        currentChallenge: null,
        eventLog: [
          ...prev.eventLog,
          "=== Round " + (prev.round + 1) + " ===",
          "Resources +" + resourceGain + ". Self-orientation drifts up (+1). Trust: " + trust + "%",
        ],
      };
    });

    // Random challenge (50% chance)
    if (Math.random() < 0.5) {
      const randomChallenge = preset.challenges[Math.floor(Math.random() * preset.challenges.length)];
      setTimeout(() => applyChallenge(randomChallenge), 300);
    }
  }, [preset, applyChallenge]);

  const resetGame = useCallback(() => {
    setState({
      ...initialState,
      eventLog: [
        "Welcome to Trust Builder!",
        "Trust = (Credibility + Reliability + Intimacy) / Self-Orientation",
        preset.welcomeMessage,
      ],
    });
  }, [preset]);

  const getAvailableInitiatives = useCallback(() => {
    return preset.initiatives.filter(
      (i) => !state.playedInitiatives.includes(i.id) && i.cost <= state.resources
    );
  }, [preset, state.playedInitiatives, state.resources]);

  const currentTrust = calculateTrust(state.dimensions);

  return {
    state,
    currentTrust,
    playInitiative,
    nextRound,
    resetGame,
    getAvailableInitiatives,
    preset,
  };
};
