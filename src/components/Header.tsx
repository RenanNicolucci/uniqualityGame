import Image from 'next/image';
import React from 'react';

export const Header = () => {
  return (
    <header className="w-full bg-[#1f36c7]">
      <div className="w-[130px] bg-[#4056e6] p-[20px]">
        <div className="relative h-[90px] w-[90px]">
          <Image src="/assets/logo.webp" alt="productImage" fill />
        </div>
      </div>
    </header>
  );
};
