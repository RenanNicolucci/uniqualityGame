import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

export const Header = () => {
  const { push, asPath } = useRouter();
  return (
    <header>
      <div className="flex items-center  justify-between bg-[#1f36c7]">
        <div className="flex w-full items-center gap-[32px]">
          <div className="w-[130px] bg-[#4056e6] p-[20px]">
            <div className="relative h-[90px] w-[90px]">
              <Image src="/assets/logo.webp" alt="productImage" fill />
            </div>
          </div>
          <div>
            <p className="text-[22px] text-[white]">UniQualityGame</p>
          </div>
        </div>
        <div className="flex items-center pr-[60px] text-[white]">
          <button
            onClick={() => {
              push(asPath, undefined, { locale: 'pt-BR' });
            }}
            type="button"
            className="min-w-max bg-[#5769e1] px-[12px] py-[8px]"
          >
            Português
          </button>
          <button
            onClick={() => {
              push(asPath, undefined, { locale: 'en-US' });
            }}
            type="button"
            className="min-w-max bg-[#293cb3] px-[12px] py-[8px]"
          >
            Inglês
          </button>
          <button
            onClick={() => {
              push(asPath, undefined, { locale: 'es' });
            }}
            type="button"
            className="min-w-max bg-[#5769e1] px-[12px] py-[8px]"
          >
            Espanhol
          </button>
        </div>
      </div>
    </header>
  );
};
