import { useEffect, useState, type ReactNode } from 'react';

type FetchState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

type DataFetcherProps<T> = {
  request: () => Promise<T>;
  children: (state: FetchState<T>) => ReactNode;
};

export function DataFetcher<T>({ request, children }: DataFetcherProps<T>): JSX.Element {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let mounted = true;
    request()
      .then((data) => {
        if (mounted) {
          setState({ data, error: null, loading: false });
        }
      })
      .catch((error: Error) => {
        if (mounted) {
          setState({ data: null, error: error.message, loading: false });
        }
      });

    return () => {
      mounted = false;
    };
  }, [request]);

  return <>{children(state)}</>;
}
