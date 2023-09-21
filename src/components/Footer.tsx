import Image from "next/image";
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-[#1f36c7] w-full p-[16px] mt-[32px]">
      <div className="w-[40px] h-[40px] relative m-[auto]">
        <Image src="/assets/logo.webp" alt="productImage" fill />
      </div>
    </footer>
  );
};
