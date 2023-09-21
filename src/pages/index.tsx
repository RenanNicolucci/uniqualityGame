import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { questions } from "@/constants/questions";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SwipeEventData, useSwipeable } from "react-swipeable";
import { GoVideo } from "react-icons/go";

const Index = () => {
  const [imageDir, setImageDir] = useState(0);
  const [product, setProduct] = useState("1");
  const { register, handleSubmit } = useForm();

  const leftZero = (num: number) => {
    if (num < 10) {
      return `00${num}`;
    } else if (num < 100) {
      return `0${num}`;
    } else {
      return num.toString();
    }
  };

  const handleSwipe = (e: SwipeEventData) => {
    const swipeForce = e.deltaX;
    const sensitivity = 0.1;

    const deltaImageDir = Math.round(swipeForce * sensitivity);

    let newIndex = imageDir + deltaImageDir;

    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex > 31) {
      newIndex = 31;
    }

    setImageDir(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: (event) => handleSwipe(event),
    onSwipedRight: (event) => handleSwipe(event),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/answers", {
        ...data,
        product: parseInt(product),
      });

      if (response.status === 200) {
        window.location.href = "/resultados";
      }
    } catch (error) {
      console.error("Erro ao enviar a requisição:", error);
    }
  };

  useEffect(() => {
    const product = localStorage.getItem("product");

    if (!product) {
      const productNumber = (Math.floor(Math.random() * 2) + 1).toString();
      localStorage.setItem("product", productNumber);
      setProduct(productNumber);
    } else {
      setProduct(product);
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="w-full p-[32px] flex items-center justify-center flex-col m-auto gap-[32px] md:flex-row md:justify-center md:align-center md:gap-[64px]">
          <div className="flex items-center flex-col gap-[16px]">
            <button className="bg-[#1f36c7] p-3 rounded text-white">
              <GoVideo />
            </button>
            <div className="flex items-center">
              <div {...handlers}>
                <div className="relative w-[300px] h-[300px]">
                  <Image
                    src={`/assets/product-0${product}/02.RGB_color.0${leftZero(
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
                max="31"
                id="myRange"
                onChange={(e) => setImageDir(parseInt(e.target.value))}
                className="h-1 bg-[#1f36c7] rounded-lg appearance-none cursor-pointer dark:[#1f36c7]"
                value={imageDir}
              />
            </div>
          </div>

          <div>
            <h1 className="text-center text-[20px]">
              Assinale as alternativas conforme for identificado nas imagens:
            </h1>
            <form
              className="mt-[32px] flex flex-col gap-[16px] text-[16px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-[16px] md:grid md:grid-cols-2">
                {questions.map((quest) => (
                  <div key={quest.key} className="flex items-center gap-[16px]">
                    <input
                      {...register(quest.key)}
                      type="checkbox"
                      className="w-[22px] h-[22px] text-blue-600 bg-[#bcd0ff] border-[transparent] rounded"
                    />
                    <label>{quest.value}</label>
                  </div>
                ))}
              </div>
              <div>
                <button className="w-full bg-[#1f36c7] text-white p-[8px] mt-[32px] rounded font-bold uppercase">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Index;
