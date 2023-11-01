import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

export const Header = () => {
  const { push, asPath } = useRouter();
  const { t } = useTranslation('common');

  const hanldeChange = (value: string) => {
    push(asPath, undefined, { locale: value });
  };
  return (
    <header>
      <div className="flex items-center justify-between  gap-[16px] bg-[#1f36c7]">
        <div className="flex w-full items-center gap-[16px] md:gap-[32px]">
          <div className="bg-[#4056e6] p-[20px] md:w-[130px]">
            <div className="relative h-[45px] w-[45px] md:h-[90px] md:w-[90px]">
              <Image src="/assets/logo.webp" alt="productImage" fill />
            </div>
          </div>
          <div>
            <p className=" text-[14px] text-[white] md:inline md:text-[22px]">
              UniQualityGame
            </p>
          </div>
        </div>
        <div className="flex items-center pr-[16px] text-[white] md:pr-[60px]">
          <select
            className="bg-[#141c51] px-[16px] py-[8px]"
            onChange={(e) => {
              hanldeChange(e.target.value);
            }}
          >
            <option value="pt-BR">{t('portugues')}</option>
            <option value="en-US">{t('ingles')}</option>
            <option value="es">{t('espanhol')}</option>
          </select>
        </div>
      </div>
    </header>
  );
};
