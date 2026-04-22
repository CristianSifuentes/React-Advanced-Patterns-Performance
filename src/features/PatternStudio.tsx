import { useCallback } from 'react';

import { DataFetcher } from '../components/DataFetcher';
import { Tabs } from '../components/Tabs';
import { fetchInsights, type Insight } from '../utils/mockApi';

export function PatternStudio(): JSX.Element {
  const request = useCallback(() => fetchInsights(), []);

  return (
    <section className="panel">
      <h3>Composition Studio</h3>
      <p>
        Compound Components + Render Props working together: tab structure is composable, and data fetching
        presentation is consumer-controlled.
      </p>

      <Tabs.Root defaultValue="compound">
        <Tabs.List>
          <Tabs.Trigger value="compound">Compound Components</Tabs.Trigger>
          <Tabs.Trigger value="render-props">Render Props</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="compound">
          <ul>
            <li>State is shared through context internally.</li>
            <li>Consumers can reorder triggers/content freely.</li>
            <li>API stays expressive and scalable for design systems.</li>
          </ul>
        </Tabs.Content>

        <Tabs.Content value="render-props">
          <DataFetcher<Insight[]> request={request}>
            {({ data, loading, error }) => {
              if (loading) return <p>Loading insights…</p>;
              if (error) return <p role="alert">Failed: {error}</p>;
              return (
                <ul className="insight-list">
                  {data?.map((insight) => (
                    <li key={insight.id}>
                      <h4>{insight.title}</h4>
                      <p>{insight.impact}</p>
                    </li>
                  ))}
                </ul>
              );
            }}
          </DataFetcher>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
