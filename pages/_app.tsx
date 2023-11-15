import { AppProps } from "next/app";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { GlobalStyles } from "@/helpers/styles/globalStyles";
import HydrationRenderChecker from "@/hooks/useIsHydrationRender/HydrationRenderChecker";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            networkMode: "always",
            retry: 0,
            refetchOnWindowFocus: false,
          },
          mutations: {
            networkMode: "always",
            retry: 0,
          },
        },
      })
  );

  return (
    <>
      <HydrationRenderChecker></HydrationRenderChecker>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <GlobalStyles />
          <Component {...pageProps} />
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
