import { ConcurrentSearch } from './features/ConcurrentSearch';
import { PatternStudio } from './features/PatternStudio';
import { ResiliencePlayground } from './features/ResiliencePlayground';

const sections = [
  { id: 'concurrency', title: '1) Concurrent Features' },
  { id: 'composition', title: '2) Compound Components & Render Props' },
  { id: 'resilience', title: '3) Error & Suspense Boundaries' },
];

export default function App(): JSX.Element {
  return (
    <main className="app-shell">
      <header>
        <h1>React Advanced Patterns & Performance — 2026 Lab</h1>
        <p>
          A production-style learning project showcasing high-performance concurrent UX, advanced composition patterns,
          and resilient error/loading isolation.
        </p>
      </header>

      <section className="panel toc" aria-label="Table of contents">
        <h2>Table of Contents</h2>
        <ol>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        </ol>
      </section>

      <section id="concurrency">
        <ConcurrentSearch />
      </section>

      <section id="composition">
        <PatternStudio />
      </section>

      <section id="resilience">
        <ResiliencePlayground />
      </section>
    </main>
  );
}
