import Image from "next/image";
import React from "react";

export const Header = () => {
  return (
    <header className="bg-[#1f36c7] w-full">
      <div className="p-[20px] bg-[#4056e6] w-[130px]">
        <div className="w-[90px] h-[90px] relative">
          <Image src="/assets/logo.webp" alt="productImage" fill />
        </div>
      </div>
    </header>
  );
};
