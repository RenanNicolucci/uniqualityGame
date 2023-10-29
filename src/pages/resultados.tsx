import axios from 'axios';
import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactWordcloud from 'react-wordcloud';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { QuestionsEnum } from '@/constants/questionsEnum';

const ResultId = ({ data }: { data: { text: string; value: number }[] }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { productID } = router.query;

  const names = ['Omo Litro', 'Omo Pacote', 'Cif', 'Comfort'];

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
              <p className="mb-[32px] text-center text-[18px]">
                {names[parseInt(productID as string, 10) - 1]}
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
  try {
    const response = await axios.get(`${process.env.PROJECT_URL}api/answers`);
    const formatedResponse = response.data.map((item: any) => ({
      // @ts-ignore
      text: QuestionsEnum[item.key],
      value: item.value,
    }));
    const groupedData: any = {};

    // Iterate through the data and group by 'text'
    formatedResponse.forEach((item: any) => {
      const { text, value } = item;
      if (!groupedData[text]) {
        groupedData[text] = 0;
      }

      if (value) {
        // eslint-disable-next-line no-plusplus
        groupedData[text]++;
      }
    });

    const data = Object.keys(groupedData).map((item: any) => ({
      text: item,
      value: groupedData[item],
    }));

    return {
      props: {
        data: data as { text: string; value: number }[],
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default ResultId;
