interface BiasCardProps {
  rank: number;
  name: string;
  summary: string;
  why: string;
}

export function BiasCard({ rank, name, summary, why }: BiasCardProps) {
  return (
    <article className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 bg-white dark:bg-zinc-950">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-mono text-xs text-zinc-400 tabular-nums">
          #{rank}
        </span>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {name}
        </h3>
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 italic">
        {summary}
      </p>
      <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
        <span className="text-xs uppercase tracking-widest text-zinc-500 mr-2">
          Why it may apply
        </span>
        {why}
      </p>
    </article>
  );
}
