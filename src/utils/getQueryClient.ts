import { QueryClient } from '@tanstack/react-query';

const getQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    },
  });

  return queryClient;
};
export default getQueryClient;
