import type { CustomerPersona } from "../data/industryPresets";
import type { TrustDimensions } from "../hooks/useGameState";

interface FeedbackItem {
  personaId: string;
  message: string;
  dimension: keyof TrustDimensions;
  sentiment: "positive" | "neutral" | "negative";
}

interface CustomerFeedbackProps {
  feedback: FeedbackItem[];
  personas: CustomerPersona[];
}

const dimensionLabels: Record<keyof TrustDimensions, string> = {
  credibility: "Credibility",
  reliability: "Reliability",
  intimacy: "Intimacy",
  selfOrientation: "Self-Orientation",
};

export const CustomerFeedback = ({ feedback, personas }: CustomerFeedbackProps) => {
  const getPersona = (id: string) => personas.find((p) => p.id === id) || personas[0];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "border-l-[var(--trust-high)]";
      case "negative":
        return "border-l-[var(--trust-low)]";
      default:
        return "border-l-[var(--trust-medium)]";
    }
  };

  const getAvatarColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-[var(--trust-high)]";
      case "negative":
        return "bg-[var(--trust-low)]";
      default:
        return "bg-[var(--trust-medium)]";
    }
  };

  return (
    <div className="glass rounded-xl p-4">
      <h3 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-3">
        Stakeholder Feedback
      </h3>
      <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
        {feedback.length === 0 ? (
          <p className="text-[var(--muted-foreground)] text-sm italic">
            Take actions to see stakeholder reactions...
          </p>
        ) : (
          feedback.map((item, index) => {
            const persona = getPersona(item.personaId);
            return (
              <div
                key={index}
                className={`flex gap-3 p-3 rounded-lg bg-[var(--ae-purple-800)]/50 border-l-4 ${getSentimentColor(
                  item.sentiment
                )} animate-fadeIn`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${getAvatarColor(
                    item.sentiment
                  )}`}
                >
                  {persona.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-[var(--foreground)] text-sm">
                      {persona.name}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--ae-purple-700)] text-[var(--muted-foreground)]">
                      {dimensionLabels[item.dimension]}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">{item.message}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
