"use client";

import { useEffect, useState } from "react";

interface VetoTimerProps {
  seconds: number;
  onComplete: () => void;
}

export function VetoTimer({ seconds, onComplete }: VetoTimerProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) {
      onComplete();
      return;
    }
    const id = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining, onComplete]);

  const pct = ((seconds - remaining) / seconds) * 100;
  const done = remaining <= 0;

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xs uppercase tracking-widest text-zinc-500">
          {done ? "Friction released" : "Forced pause"}
        </span>
        <span
          className={`font-mono text-2xl tabular-nums ${done ? "text-emerald-600" : "text-zinc-900 dark:text-zinc-100"}`}
        >
          {done ? "00" : remaining.toString().padStart(2, "0")}s
        </span>
      </div>
      <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden rounded-full">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${done ? "bg-emerald-500" : "bg-zinc-900 dark:bg-zinc-100"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
