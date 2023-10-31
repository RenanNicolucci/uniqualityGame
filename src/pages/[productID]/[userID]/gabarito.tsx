import axios from 'axios';
import type { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const Gabarito = ({
  data: {
    position,
    correctAnswers,
    user: { name },
  },
}: any) => {
  const { t } = useTranslation('common');
  return (
    <>
      <Header />
      <main>
        <div className="m-auto flex w-full flex-col items-center justify-center gap-[32px] p-[32px] md:flex-row md:items-center md:justify-center md:gap-[64px]">
          <div className="min-w-[350px]">
            <h1 className="text-center text-[20px]">{`${name} ${t(
              'seuGabarito',
            )}:`}</h1>
            <div className="mt-[32px] flex flex-col gap-[16px]">
              <div className="flex w-full items-center justify-between">
                <p>{`${t('suaPosicaoNoRanking')}:`}</p>
                <p>{`${position + 1}º`}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-[#076607]">{`${t('acertou')}:`}</p>
                <p>{`${correctAnswers?.length || 0}/3`}</p>
              </div>
              <div>
                <Link
                  href="/ranking"
                  className="mt-[22px] flex w-full items-center justify-center gap-[16px] rounded bg-[#1f36c7] p-[8px] px-[22px] font-bold uppercase text-white"
                >
                  {t('visualizarRanking')}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { productID, userID } = context.query;

  try {
    const response = await axios.get(
      `${process.env.PROJECT_URL}api/ranking/${productID}/${userID}`,
    );
    const correctAnswers = await axios.get(
      `${process.env.PROJECT_URL}api/answers/correctAnswers/${productID}`,
    );

    return {
      props: {
        data: { ...response.data, correctAnswersByDB: correctAnswers.data },
        ...(await serverSideTranslations(context.locale || '', ['common'])),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Gabarito;
