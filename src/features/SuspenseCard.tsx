import { useMemo } from 'react';

const cpuHeavySummary = (seed: number): string => {
  let acc = 0;
  for (let i = 0; i < 800000; i += 1) {
    acc += Math.sqrt((i + seed) % 97);
  }
  return `Computed resilience score: ${(acc % 1000).toFixed(2)}`;
};

export default function SuspenseCard(): JSX.Element {
  const value = useMemo(() => cpuHeavySummary(Date.now() % 100), []);
  return (
    <article className="panel">
      <h3>Lazy + Suspense Widget</h3>
      <p>{value}</p>
      <p>This widget was code-split and loaded under a local suspense boundary.</p>
    </article>
  );
}
