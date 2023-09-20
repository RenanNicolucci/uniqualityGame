import { questions } from "@/constants/questions";
import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

const Index = () => {
  const [imageDir, setImageDir] = useState(0);

  const leftZero = (num: number) => {
    if (num < 10) {
      return `00${num}`;
    } else if (num < 100) {
      return `0${num}`;
    } else {
      return num.toString();
    }
  };

  const handleSwipe = (num: number, e: any) => {
    console.log(e);
    const newIndex = imageDir + num;
    if (newIndex < 0) {
      return setImageDir(63);
    }
    if (newIndex > 63) {
      return setImageDir(0);
    }
    setImageDir(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: (e) => handleSwipe(1, e),
    onSwipedRight: (e) => handleSwipe(-1, e),
  });

  return (
    <>
      <header className="bg-[#1f36c7] w-full">
        <div className="p-[20px] bg-[#4056e6] w-[130px]">
          <div className="w-[90px] h-[90px] relative">
            <Image src="/assets/logo.webp" alt="productImage" fill />
          </div>
        </div>
      </header>
      <main>
        <div className="w-full p-[32px] flex items-center justify-center flex-col m-auto gap-[32px]">
          <div className="flex items-center">
            <div {...handlers}>
              <div className="relative w-[300px] h-[300px]">
                <Image
                  src={`/assets/product-01/02.RGB_color.0${leftZero(
                    imageDir
                  )}.webp`}
                  alt="productImage"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
          <div>
            <input
              type="range"
              min="0"
              max="63"
              id="myRange"
              onChange={(e) => setImageDir(parseInt(e.target.value))}
              className="h-1 bg-[#1f36c7] rounded-lg appearance-none cursor-pointer dark:[#1f36c7]"
            />
          </div>
          <div>
            <h1 className="text-center text-[20px]">
              Assinale as alternativas conforme identificado nas imagens:
            </h1>
            <form className="mt-[32px] flex flex-col gap-[16px] text-[16px]">
              {questions.map((quest) => (
                <div key={quest} className="flex items-center gap-[16px]">
                  <input
                    type="checkbox"
                    className="w-[22px] h-[22px] text-blue-600 bg-[#bcd0ff] border-[transparent] rounded "
                  />
                  <label>{quest}</label>
                </div>
              ))}
              <div>
                <button className="w-full bg-[#1f36c7] text-white p-[8px] mt-[32px] rounded font-bold uppercase">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer className="bg-[#1f36c7] w-full p-[16px] mt-[32px]">
        <div className="w-[40px] h-[40px] relative m-[auto]">
          <Image src="/assets/logo.webp" alt="productImage" fill />
        </div>
      </footer>
    </>
  );
};

export default Index;
