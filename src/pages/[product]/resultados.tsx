import axios from 'axios';
import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactWordcloud from 'react-wordcloud';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const ResultId = ({
  id,
  data,
}: {
  id: string;
  data: { text: string; value: number }[];
}) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const options = {
    rotations: [1, 1],
    rotationAngles: [0, 0],
    fontFamily: 'sans-serif',
    fontSizes: [16, 36],
  };

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="my-[32px] text-center text-[22px]">
          <h1>Respostas:</h1>
        </div>
        <div className="mb-[32px] flex-col gap-[64px] md:flex md:flex-row md:justify-center">
          {data.length > 0 && (
            <div className="flex flex-col justify-center">
              <p className="text-center">
                {id === '1' ? 'Omo Litro' : 'Omo Pacote'}
              </p>
              <div className="max-h-[250px] min-h-[250px] min-w-[360px] max-w-[360px]">
                {show && (
                  <ReactWordcloud
                    size={[360, 250]}
                    words={data}
                    // @ts-ignore
                    options={options}
                  />
                )}
              </div>
              <div className="mx-[auto] min-w-[340px]">
                <button
                  type="button"
                  className="mx-[auto] my-[64px] w-full max-w-[340px] rounded bg-[#1f36c7] p-[8px] font-bold uppercase text-white"
                  onClick={() => {
                    router.push(`/`);
                  }}
                >
                  Voltar
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const formatedId = id as string;

  try {
    const response = await axios.get(
      'https://unilever-nine.vercel.app/api/answers',
    );
    const formatedResponse = response.data
      .filter(
        (item: any) =>
          item.product === parseInt(formatedId, 10) && item.quantity > 0,
      )
      .map((item: any) => ({
        // @ts-ignore
        text: questionsEnum[item.key],
        value: item.quantity,
      }));

    return {
      props: {
        id: formatedId,
        data: formatedResponse as { text: string; value: number }[],
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default ResultId;
