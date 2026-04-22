import { lazy, Suspense, useState } from 'react';

import { ErrorBoundary } from '../components/ErrorBoundary';

const SuspenseCard = lazy(() =>
  new Promise<typeof import('./SuspenseCard')>((resolve) => {
    setTimeout(() => resolve(import('./SuspenseCard')), 700);
  }),
);

function BuggyWidget({ explode }: { explode: boolean }): JSX.Element {
  if (explode) {
    throw new Error('Intentional widget crash for boundary verification.');
  }

  return (
    <article className="panel">
      <h3>Stable Widget</h3>
      <p>No crash detected. Toggle crash mode to test isolation.</p>
    </article>
  );
}

export function ResiliencePlayground(): JSX.Element {
  const [explode, setExplode] = useState(false);

  return (
    <section>
      <h3>Resilience Playground</h3>
      <div className="row">
        <button onClick={() => setExplode((state) => !state)}>{explode ? 'Disable Crash' : 'Trigger Crash'}</button>
      </div>
      <div className="grid-two">
        <ErrorBoundary>
          <BuggyWidget explode={explode} />
        </ErrorBoundary>

        <Suspense fallback={<section className="panel">Loading lazy widget…</section>}>
          <SuspenseCard />
        </Suspense>
      </div>
    </section>
  );
}
