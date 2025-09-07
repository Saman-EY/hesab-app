import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


function QueryProvider({ children }: any) {
  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryProvider;
