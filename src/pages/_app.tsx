import '@/styles/global.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Unilever | Treinamento</title>
    </Head>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </>
);

export default MyApp;
