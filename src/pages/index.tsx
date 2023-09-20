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

  const handleSwipe = (num: number) => {
    const newIndex = imageDir + num;
    if(newIndex < 0 ){
      return setImageDir(63)
    }
    if( newIndex > 63){
      return setImageDir(0)
    }
    setImageDir(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
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
            <div>
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
          </div>
          <div>
            <form>
              <h1 className="text-center">
                Assinale as alternativas conforme identificado nas imagens:
              </h1>
              <select name="cars" id="cars" multiple>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
