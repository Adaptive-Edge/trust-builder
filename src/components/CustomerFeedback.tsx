import type { CustomerPersona } from "../data/industryPresets";

interface FeedbackItem {
  personaId: string;
  message: string;
  pillar: number;
  sentiment: "positive" | "neutral" | "negative";
}

interface CustomerFeedbackProps {
  feedback: FeedbackItem[];
  personas: CustomerPersona[];
}

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
    <div className="glass rounded-xl p-4 h-full">
      <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
        Stakeholder Feedback
      </h3>
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {feedback.length === 0 ? (
          <p className="text-[var(--muted-foreground)] text-sm italic">
            Implement initiatives to see stakeholder reactions...
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${getAvatarColor(
                    item.sentiment
                  )}`}
                >
                  {persona.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-[var(--foreground)] text-sm">
                      {persona.name}
                    </span>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      {persona.role}
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
