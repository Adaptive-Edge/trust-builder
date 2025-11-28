import { ScrollText } from "lucide-react";
import { useEffect, useRef } from "react";

interface EventLogProps {
  events: string[];
}

export const EventLog = ({ events }: EventLogProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <ScrollText className="w-5 h-5 text-[var(--ae-accent-cyan)]" />
        <h3 className="text-lg font-semibold text-[var(--foreground)]">Event Log</h3>
      </div>
      <div
        ref={scrollRef}
        className="h-40 overflow-y-auto space-y-1 pr-2"
      >
        {events.map((event, index) => (
          <p
            key={index}
            className={`text-sm py-1 border-b border-[var(--border)]/30 ${
              event.includes("===")
                ? "text-[var(--ae-accent-cyan)] font-medium"
                : event.includes("Challenge")
                ? "text-[var(--trust-low)]"
                : event.includes("+")
                ? "text-[var(--trust-high)]"
                : "text-[var(--muted-foreground)]"
            }`}
          >
            {event}
          </p>
        ))}
      </div>
    </div>
  );
};
