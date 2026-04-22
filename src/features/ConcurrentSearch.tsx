import { memo, useDeferredValue, useMemo, useState, useTransition } from 'react';

type Item = {
  id: number;
  name: string;
  category: string;
};

const inventory: Item[] = Array.from({ length: 2200 }).map((_, index) => ({
  id: index + 1,
  name: `Pattern-${index + 1}`,
  category: ['composition', 'concurrency', 'resilience'][index % 3],
}));

const HeavyResults = memo(function HeavyResults({ query }: { query: string }) {
  const result = useMemo(() => {
    const lowered = query.toLowerCase();
    return inventory
      .filter((item) => item.name.toLowerCase().includes(lowered) || item.category.includes(lowered))
      .slice(0, 80);
  }, [query]);

  return (
    <ul className="result-list">
      {result.map((item) => (
        <li key={item.id}>
          <strong>{item.name}</strong>
          <span>{item.category}</span>
        </li>
      ))}
    </ul>
  );
});

export function ConcurrentSearch(): JSX.Element {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredSearch = useDeferredValue(search);

  return (
    <section className="panel">
      <h3>Concurrent Search Lab</h3>
      <p>
        <code>useTransition</code> controls heavy state updates while <code>useDeferredValue</code> keeps the slow
        result tree one beat behind fast typing.
      </p>
      <label>
        Query inventory (2200 rows)
        <input
          value={input}
          placeholder="Try: concurrency / Pattern-1999"
          onChange={(event) => {
            const next = event.target.value;
            setInput(next);
            startTransition(() => setSearch(next));
          }}
        />
      </label>
      {isPending ? <small className="pending">Transition in progress…</small> : null}
      <HeavyResults query={deferredSearch} />
    </section>
  );
}
