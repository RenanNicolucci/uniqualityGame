import Image from 'next/image';
import React from 'react';

export const Footer = () => {
  return (
    <footer className="mt-[32px] w-full bg-[#1f36c7] p-[16px]">
      <div className="relative m-[auto] h-[40px] w-[40px]">
        <Image src="/assets/logo.webp" alt="productImage" fill />
      </div>
    </footer>
  );
};
