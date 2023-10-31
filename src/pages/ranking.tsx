import axios from 'axios';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const Ranking = (data: any) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Header />
      <main>
        <div className="m-auto flex w-full flex-col items-center justify-center gap-[32px] p-[32px] md:flex-row md:items-center md:justify-center md:gap-[64px]">
          <div className="min-w-[350px]">
            <h1 className="text-center text-[20px]">Ranking</h1>
            <div className="mt-[32px] flex flex-col gap-[16px]">
              <table>
                <tr>
                  <th>{t('nome')}</th>
                  <th>{t('acertou')}</th>
                  <th>{t('posicao')}</th>
                </tr>
                {data.data.map((item: any, index: number) => (
                  <tr key={item.user.id}>
                    <td className="p-[8px]">{item.user.name}</td>
                    <td className="p-[8px] text-right">
                      {item.correctAnswers.length || 0}/3
                    </td>
                    <td className="p-[8px] text-right">{`${index + 1}º`}</td>
                  </tr>
                ))}
              </table>
              <div>
                <Link
                  href="/resultados"
                  className="mt-[22px] flex w-full items-center justify-center gap-[16px] rounded bg-[#1f36c7] p-[8px] px-[22px] font-bold uppercase text-white"
                >
                  {t('visualizarPalavras')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export async function getServerSideProps({ locale }: any) {
  try {
    const response = await axios.get(`${process.env.PROJECT_URL}api/ranking`);

    return {
      props: {
        data: response.data.sortByRanking,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Ranking;
