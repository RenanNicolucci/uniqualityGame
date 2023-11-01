import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import Backend from 'i18next-http-backend';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation, i18n } from 'next-i18next';
import { initReactI18next } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

import eua from '../../public/locales/en-US/common.json';
import spanish from '../../public/locales/es/common.json';
import brasil from '../../public/locales/pt-BR/common.json';

const queryClient = new QueryClient();

const resources = {
  'pt-BR': {
    translation: brasil,
  },
  'en-US': {
    translation: eua,
  },
  es: {
    translation: spanish,
  },
};

if (i18n) {
  i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'pt-BR', // Fallback language
      interpolation: {
        escapeValue: false, // not needed for React
      },
    });
}

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

export default appWithTranslation(MyApp);
