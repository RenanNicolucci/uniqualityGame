import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { questions } from '@/constants/questions';

const Index = ({ product }: { product: string }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/answers', {
        ...data,
        product: parseInt(product, 10),
      });

      if (response.status === 200) {
        window.location.href = `/resultados/${product}`;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao enviar a requisição:', error);
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="m-auto flex w-full flex-col items-center justify-center gap-[32px] p-[32px] md:flex-row md:items-center md:justify-center md:gap-[64px]">
          <div className="flex flex-col items-center gap-[16px]">
            <div className="flex items-center">
              <div>
                <div className="relative h-[400px] w-full md:w-[400px]">
                  <div className="h-full w-full">
                    <iframe
                      className="h-full w-full"
                      title="Shinobi Frog"
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                      src={
                        product === '1'
                          ? 'https://sketchfab.com/models/c3de7f8b092e4092aef14d4ffc9fac7f/embed'
                          : 'https://sketchfab.com/models/8bc5f4b31d414908846f2464ce6876dd/embed'
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-center text-[20px]">
              Assinale as alternativas conforme for identificado nas imagens:
            </h1>
            <form
              className="mt-[32px] flex flex-col gap-[16px] text-[16px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-[16px] md:grid md:grid-cols-2">
                {questions.map((quest) => (
                  <div key={quest.key} className="flex items-center gap-[16px]">
                    <input
                      {...register(quest.key)}
                      type="checkbox"
                      className="h-[22px] w-[22px] rounded border-[transparent] bg-[#bcd0ff] text-blue-600"
                    />
                    <label htmlFor={quest.key}>{quest.value}</label>
                  </div>
                ))}
              </div>
              <div>
                <button
                  type="submit"
                  className="mt-[32px] flex w-full items-center justify-center gap-[16px] rounded bg-[#1f36c7] p-[8px] font-bold uppercase text-white"
                >
                  Enviar
                  {loading && (
                    <div className="animate-spin">
                      <AiOutlineLoading3Quarters />
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      product: (Math.floor(Math.random() * 2) + 1).toString(),
    },
  };
}

export default Index;
