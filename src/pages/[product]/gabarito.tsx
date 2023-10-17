import React from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const Gabarito = () => {
  return (
    <>
      <Header />
      <main>
        <div className="m-auto flex w-full flex-col items-center justify-center gap-[32px] p-[32px] md:flex-row md:items-center md:justify-center md:gap-[64px]">
          <div>
            <h1 className="text-center text-[20px]">Seu Gabarito:</h1>
            <div />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Gabarito;
