import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

export const Header = () => {
  const { push, asPath } = useRouter();

  const hanldeChange = (value: string) => {
    push(asPath, undefined, { locale: value });
  };
  return (
    <header>
      <div className="flex items-center justify-between  gap-[16px] bg-[#1f36c7]">
        <div className="flex w-full items-center gap-[32px]">
          <div className="bg-[#4056e6] p-[20px] md:w-[130px]">
            <div className="relative h-[45px] w-[45px] md:h-[90px] md:w-[90px]">
              <Image src="/assets/logo.webp" alt="productImage" fill />
            </div>
          </div>
          <div>
            <p className="text-[14px] text-[white] md:text-[22px]">
              UniQualityGame
            </p>
          </div>
        </div>
        <div className="flex items-center pr-[60px] text-[white]">
          <select
            className="bg-[#141c51] px-[16px] py-[8px]"
            onChange={(e) => {
              hanldeChange(e.target.value);
            }}
          >
            <option value="pt-BR">Português</option>
            <option value="en-US">Inglês</option>
            <option value="es">Espanhol</option>
          </select>
        </div>
      </div>
    </header>
  );
};
