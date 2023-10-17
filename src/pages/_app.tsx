import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Unilever | Treinamento</title>
    </Head>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ToastContainer />
    </QueryClientProvider>
  </>
);

export default MyApp;
