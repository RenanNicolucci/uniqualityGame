import axios from 'axios';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const Zerar = () => {
  return (
    <>
      <Header />
      <main>
        <div className="my-[64px] text-center text-[22px]">
          <h1>Zerar treinamento</h1>
        </div>
        <div className="flex min-h-[30vh] w-full justify-center">
          <button
            type="button"
            className="mt-[32px] max-h-[64px] w-full max-w-[320px] rounded bg-[#1f36c7] p-[8px] font-bold uppercase text-white"
            onClick={async () => {
              await axios.delete('/api/answers');
              window.location.href = '/';
            }}
          >
            Zerar Dados
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Zerar;
