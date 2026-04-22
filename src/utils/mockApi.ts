export type Insight = {
  id: number;
  title: string;
  impact: string;
};

export const insightData: Insight[] = [
  { id: 1, title: 'Transitions isolate expensive state', impact: 'Input stays responsive under list churn.' },
  { id: 2, title: 'Deferred values smooth noisy updates', impact: 'Heavy children lag intentionally without blocking typing.' },
  { id: 3, title: 'Compound APIs scale design systems', impact: 'Consumers compose behavior without prop drilling.' },
  { id: 4, title: 'Render props maximize UI freedom', impact: 'Fetching logic and presentation remain independent.' },
  { id: 5, title: 'Error + Suspense boundaries localize failures', impact: 'Single widgets fail/load without taking down the full app.' },
];

export async function fetchInsights(): Promise<Insight[]> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return insightData;
}
