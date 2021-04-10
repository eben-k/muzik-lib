import React, { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

interface TProps {
  children: React.ReactNode;
}

const ReactQueryProvider = (props: TProps) => {
  const client = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 3,
            refetchOnWindowFocus: true,
            retry: (count) => {
              if (count > 3) return false;

              return false;
            },
          },
        },
      }),
    []
  );

  return (
    <QueryClientProvider client={client}>
      {props.children}
      <ReactQueryDevtools panelProps={{ style: { position: 'fixed' } }} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
