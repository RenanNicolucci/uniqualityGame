import axios from 'axios';
import type { GetServerSidePropsContext } from 'next';
import React from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { QuestionsEnum } from '@/constants/questionsEnum';

const Gabarito = ({
  data: {
    position,
    correctAnswers,
    wrongAnswers,
    correctAnswersByDB,
    user: { name },
  },
}: any) => {
  return (
    <>
      <Header />
      <main>
        <div className="m-auto flex w-full flex-col items-center justify-center gap-[32px] p-[32px] md:flex-row md:items-center md:justify-center md:gap-[64px]">
          <div>
            <h1 className="text-center text-[20px]">{`${name} seu gabarito:`}</h1>
            <div className="mt-[32px] flex flex-col gap-[16px]">
              <div className="flex w-full items-center justify-between">
                <p>Sua posição no ranking:</p>
                <p>{`${position + 1}º`}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-[#076607]">Acertou:</p>
                <p>{`${correctAnswers?.length || 0}/3`}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-[#d10f09]">Errou:</p>
                <p>{`${wrongAnswers?.length || 0}`}</p>
              </div>
              <div className="mt-[32px]">
                <p>Respostas corretas do produto:</p>
                <div className="mt-[16px] flex flex-col gap-[16px]">
                  {correctAnswersByDB.map(
                    (answer: {
                      answerValue: typeof QuestionsEnum;
                      id: number;
                    }) => (
                      // @ts-ignore
                      <p key={answer.id}>{QuestionsEnum[answer.answerValue]}</p>
                    ),
                  )}
                </div>
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
      `http://localhost:3000/api/ranking/${productID}/${userID}`,
    );

    const correctAnswers = await axios.get(
      `http://localhost:3000/api/answers/correctAnswers/${productID}`,
    );
    return {
      props: {
        data: { ...response.data, correctAnswersByDB: correctAnswers.data },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Gabarito;
