import axios from 'axios';
import { useRouter } from 'next/router';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useMutation } from 'react-query';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const Zerar = () => {
  const router = useRouter();

  const deleteRanking = async () => {
    return axios.delete('/api/zerar/ranking');
  };

  const { mutate: mutateRanking, isLoading: isLoadingRanking } = useMutation(
    'deleteRanking',
    deleteRanking,
  );

  const deleteWords = async () => {
    return axios.delete('/api/zerar/words');
  };

  const { mutate: mutateWords, isLoading: isLoadingWords } = useMutation(
    'deleteWords',
    deleteWords,
  );

  return (
    <>
      <Header />
      <main>
        <div className="my-[64px] text-center text-[22px]">
          <h1>Zerar treinamento</h1>
        </div>
        <div className="mx-auto flex min-h-[30vh] w-full flex-col items-center gap-[60px] md:flex-row md:justify-center">
          <button
            type="button"
            className="mt-[32px] max-h-[64px] w-full max-w-[320px] rounded bg-[#1f36c7] p-[8px] font-bold uppercase text-white"
            onClick={async () => {
              mutateRanking();
              router.push('/');
            }}
          >
            Zerar Ranking
            {isLoadingRanking && (
              <div className="animate-spin">
                <AiOutlineLoading3Quarters />
              </div>
            )}
          </button>
          <button
            type="button"
            className="mt-[32px] max-h-[64px] w-full max-w-[320px] rounded bg-[#1f36c7] p-[8px] font-bold uppercase text-white"
            onClick={async () => {
              mutateWords();
              router.push('/');
            }}
          >
            Zerar Palavras
            {isLoadingWords && (
              <div className="animate-spin">
                <AiOutlineLoading3Quarters />
              </div>
            )}
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Zerar;
