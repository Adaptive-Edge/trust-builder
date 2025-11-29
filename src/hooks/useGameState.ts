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
  pendingDecision: Challenge | null; // For forcing decisions
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
  credibility: 35,  // Start lower - you have to earn it
  reliability: 35,
  intimacy: 35,
  selfOrientation: 35, // Start moderate - pressure builds
};

const initialState: GameState = {
  resources: 6,  // Tighter resources - can't do everything
  profit: 80,    // Start with some pressure
  customers: 1000,
  dimensions: { ...initialDimensions },
  round: 1,
  maxRounds: 10,  // Longer game for more compounding
  actionsLeft: 2, // Only 2 actions per round - forces choices
  maxActions: 2,
  playedInitiatives: [],
  currentChallenge: null,
  pendingDecision: null,
  eventLog: [],
  gameOver: false,
  feedbackHistory: [],
};

// Calculate trust using the Trust Equation
export const calculateTrust = (dims: TrustDimensions): number => {
  const numerator = dims.credibility + dims.reliability + dims.intimacy;
  const denominator = Math.max(dims.selfOrientation, 10);
  const trust = (numerator / denominator) * 10;
  return Math.min(100, Math.max(0, Math.round(trust)));
};

// Diminishing returns on positive changes
const applyDiminishingReturns = (currentValue: number, change: number): number => {
  if (change <= 0) return currentValue + change;
  const diminishingFactor = 1 - (currentValue / 120);
  const adjustedChange = change * Math.max(0.25, diminishingFactor);
  return currentValue + adjustedChange;
};

export const useGameState = (preset: IndustryPreset) => {
  const [state, setState] = useState<GameState>({
    ...initialState,
    eventLog: [
      "=== " + preset.name + " ===",
      preset.welcomeMessage,
      "Trust = (C + R + I) / S. Start: 35/35/35, S: 35",
      "You have 2 actions per round. Choose wisely.",
    ],
  });

  const addFeedback = useCallback(
    (dimension: keyof TrustDimensions, value: number) => {
      const feedbackSet = preset.feedback[dimension];
      if (!feedbackSet) return;

      let sentiment: "positive" | "neutral" | "negative";
      let messages: string[];

      if (dimension === "selfOrientation") {
        if (value <= 25) {
          sentiment = "positive";
          messages = feedbackSet.low;
        } else if (value <= 45) {
          sentiment = "neutral";
          messages = feedbackSet.medium;
        } else {
          sentiment = "negative";
          messages = feedbackSet.high;
        }
      } else {
        if (value >= 55) {
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
        if (prev.pendingDecision) return prev; // Can't act while decision pending

        const newDimensions = { ...prev.dimensions };
        const effects = initiative.effects;
        
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
          newDimensions.selfOrientation = Math.min(100, Math.max(5,
            newDimensions.selfOrientation + effects.selfOrientation
          ));
        }

        const profitChange = effects.profit || 0;
        const trust = calculateTrust(newDimensions);
        
        // Category tag
        const categoryLabel = initiative.category === "tempting" ? " [TEMPTING]" : 
                             initiative.category === "necessary" ? " [NECESSARY]" :
                             initiative.category === "trade-off" ? " [TRADE-OFF]" : "";

        return {
          ...prev,
          resources: prev.resources - initiative.cost,
          profit: Math.max(0, prev.profit + profitChange),
          actionsLeft: prev.actionsLeft - 1,
          dimensions: newDimensions,
          playedInitiatives: [...prev.playedInitiatives, initiativeId],
          eventLog: [
            ...prev.eventLog,
            "→ " + initiative.title + categoryLabel + " - Trust: " + trust + "%",
          ],
        };
      });

      // Generate feedback
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

  // Check for triggered events based on current state
  const getTriggeredChallenge = useCallback((dims: TrustDimensions, profit: number): Challenge | null => {
    const trust = calculateTrust(dims);
    
    // Find challenges that match current state
    const triggeredChallenges = preset.challenges.filter(c => {
      if (!c.trigger) return false;
      
      switch (c.trigger.condition) {
        case "low_reliability":
          return dims.reliability < (c.trigger.threshold || 35);
        case "high_self_orientation":
          return dims.selfOrientation > (c.trigger.threshold || 55);
        case "low_profit":
          return profit < (c.trigger.threshold || 50);
        case "high_trust":
          return trust > (c.trigger.threshold || 55);
        default:
          return false;
      }
    });

    if (triggeredChallenges.length > 0 && Math.random() < 0.4) {
      return triggeredChallenges[Math.floor(Math.random() * triggeredChallenges.length)];
    }

    // Otherwise random event (30% chance)
    if (Math.random() < 0.3) {
      const randomChallenges = preset.challenges.filter(c => 
        c.trigger?.condition === "random" || !c.trigger
      );
      if (randomChallenges.length > 0) {
        return randomChallenges[Math.floor(Math.random() * randomChallenges.length)];
      }
    }

    return null;
  }, [preset]);

  const applyChallenge = useCallback(
    (challenge: Challenge) => {
      // If challenge has options, set it as pending decision
      if (challenge.options && challenge.options.length > 0) {
        setState((prev) => ({
          ...prev,
          pendingDecision: challenge,
          eventLog: [
            ...prev.eventLog,
            "⚠️ DECISION: " + challenge.title,
            "   " + challenge.description,
          ],
        }));
        return;
      }

      // Otherwise apply directly
      setState((prev) => {
        const newDimensions = { ...prev.dimensions };
        
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
          newProfit = Math.max(0, Math.floor(prev.profit + challenge.profitEffect));
        }

        if (challenge.customerEffect) {
          newCustomers = Math.max(100, Math.floor(prev.customers * (1 + challenge.customerEffect / 100)));
        }

        const trust = calculateTrust(newDimensions);
        const effectSign = challenge.effect > 0 ? "+" : "";

        return {
          ...prev,
          dimensions: newDimensions,
          profit: newProfit,
          customers: newCustomers,
          currentChallenge: challenge,
          eventLog: [
            ...prev.eventLog,
            "📢 " + challenge.title + " (" + effectSign + challenge.effect + " " + challenge.dimension + ") - Trust: " + trust + "%",
          ],
        };
      });

      setTimeout(() => {
        addFeedback(challenge.dimension, state.dimensions[challenge.dimension] + challenge.effect);
      }, 800);
    },
    [addFeedback, state.dimensions]
  );

  const resolveDecision = useCallback((optionIndex: number) => {
    setState((prev) => {
      if (!prev.pendingDecision?.options) return prev;
      
      const option = prev.pendingDecision.options[optionIndex];
      if (!option) return prev;

      const newDimensions = { ...prev.dimensions };
      const effects = option.effects;
      
      if (effects.credibility) {
        newDimensions.credibility = Math.min(100, Math.max(0, 
          newDimensions.credibility + effects.credibility
        ));
      }
      if (effects.reliability) {
        newDimensions.reliability = Math.min(100, Math.max(0,
          newDimensions.reliability + effects.reliability
        ));
      }
      if (effects.intimacy) {
        newDimensions.intimacy = Math.min(100, Math.max(0,
          newDimensions.intimacy + effects.intimacy
        ));
      }
      if (effects.selfOrientation) {
        newDimensions.selfOrientation = Math.min(100, Math.max(5,
          newDimensions.selfOrientation + effects.selfOrientation
        ));
      }

      let newProfit = prev.profit;
      let newCustomers = prev.customers;

      if (effects.profit) {
        newProfit = Math.max(0, prev.profit + effects.profit);
      }
      if (effects.customers) {
        newCustomers = Math.max(100, Math.floor(prev.customers * (1 + effects.customers / 100)));
      }

      const trust = calculateTrust(newDimensions);

      return {
        ...prev,
        dimensions: newDimensions,
        profit: newProfit,
        customers: newCustomers,
        pendingDecision: null,
        eventLog: [
          ...prev.eventLog,
          "   → Chose: " + option.label + " - Trust: " + trust + "%",
        ],
      };
    });
  }, []);

  const nextRound = useCallback(() => {
    setState((prev) => {
      if (prev.pendingDecision) return prev; // Must resolve decision first
      
      if (prev.round >= prev.maxRounds) {
        const finalTrust = calculateTrust(prev.dimensions);
        let rating = "";
        if (finalTrust >= 55) rating = "Excellent - Genuinely trusted";
        else if (finalTrust >= 45) rating = "Good - Trusted but room to grow";
        else if (finalTrust >= 35) rating = "Mediocre - Average trust, average results";
        else if (finalTrust >= 25) rating = "Poor - Significant trust deficit";
        else rating = "Failed - Trust has collapsed";

        return {
          ...prev,
          gameOver: true,
          eventLog: [
            ...prev.eventLog,
            "",
            "══════════════════════════",
            "SIMULATION COMPLETE",
            "══════════════════════════",
            "",
            "Final Trust: " + finalTrust + "%",
            "Rating: " + rating,
            "",
            "C: " + Math.round(prev.dimensions.credibility) + 
            " + R: " + Math.round(prev.dimensions.reliability) + 
            " + I: " + Math.round(prev.dimensions.intimacy) + 
            " / S: " + Math.round(prev.dimensions.selfOrientation),
            "",
            preset.metrics.customersLabel + ": " + prev.customers,
            preset.metrics.profitLabel + ": " + prev.profit,
          ],
        };
      }

      // Self-orientation drift - pressure to monetize increases
      const newDimensions = { ...prev.dimensions };
      newDimensions.selfOrientation = Math.min(100, newDimensions.selfOrientation + 2); // +2 per round
      
      // Decay without reinforcement - stronger decay
      newDimensions.credibility = Math.max(0, newDimensions.credibility - 1);
      newDimensions.reliability = Math.max(0, newDimensions.reliability - 1);
      newDimensions.intimacy = Math.max(0, newDimensions.intimacy - 1.5); // Intimacy decays faster

      const trust = calculateTrust(newDimensions);
      
      // Resource gain - tighter, based on profit
      const resourceGain = Math.max(1, Math.floor(prev.profit / 30));

      // Customer growth/loss based on trust
      let customerChange = 0;
      if (trust >= 55) {
        customerChange = Math.floor(prev.customers * 0.08);
      } else if (trust >= 40) {
        customerChange = Math.floor(prev.customers * 0.02);
      } else if (trust < 30) {
        customerChange = -Math.floor(prev.customers * 0.08);
      } else if (trust < 40) {
        customerChange = -Math.floor(prev.customers * 0.03);
      }

      // Profit pressure - if low trust, profit erodes
      let profitChange = 0;
      if (trust < 30) {
        profitChange = -5;
      }

      return {
        ...prev,
        round: prev.round + 1,
        actionsLeft: prev.maxActions,
        resources: prev.resources + resourceGain,
        customers: Math.max(100, prev.customers + customerChange),
        profit: Math.max(0, prev.profit + profitChange),
        dimensions: newDimensions,
        currentChallenge: null,
        eventLog: [
          ...prev.eventLog,
          "",
          "══ Round " + (prev.round + 1) + " of " + prev.maxRounds + " ══",
          "Resources +" + resourceGain + " | S drifts +2 | C/R/I decay",
          "Trust: " + trust + "% | " + preset.metrics.customersLabel + ": " + (prev.customers + customerChange),
        ],
      };
    });

    // Check for triggered or random challenges
    setTimeout(() => {
      const challenge = getTriggeredChallenge(state.dimensions, state.profit);
      if (challenge) {
        applyChallenge(challenge);
      }
    }, 500);
  }, [preset, applyChallenge, getTriggeredChallenge, state.dimensions, state.profit]);

  const resetGame = useCallback(() => {
    setState({
      ...initialState,
      eventLog: [
        "=== " + preset.name + " ===",
        preset.welcomeMessage,
        "Trust = (C + R + I) / S. Start: 35/35/35, S: 35",
        "You have 2 actions per round. Choose wisely.",
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
    resolveDecision,
    preset,
  };
};
