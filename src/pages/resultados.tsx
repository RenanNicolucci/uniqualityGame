import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { questionsEnum } from "@/constants/questionsEnum";
import ReactWordcloud from "react-wordcloud";

const Results = () => {
  const [product01Data, setProduct01Data] = useState([]);
  const [product02Data, setProduct02Data] = useState([]);

  const options = {
    rotations: [1, 1],
    rotationAngles: [0, 0],
    fontFamily: "sans-serif",
    fontSizes: [16, 36],
  };

  useEffect(() => {
    axios
      .get("/api/answers")
      .then((response) => {
        setProduct01Data(
          response.data
            .filter((item: any) => item.product === 1 && item.quantity > 0)
            .map((item: any) => ({
              //@ts-ignore
              text: questionsEnum[item.key],
              value: item.quantity,
            }))
        );
        setProduct02Data(
          response.data
            .filter((item: any) => item.product === 2 && item.quantity > 0)
            .map((item: any) => ({
              //@ts-ignore
              text: questionsEnum[item.key],
              value: item.quantity,
            }))
        );
      })
      .catch((error) => {
        console.error("Erro ao fazer a requisição:", error);
      });
  }, []);

  console.log(product01Data);

  return (
    <>
      <Header />
      <main>
        <div className="text-center my-[32px] text-[22px]">
          <h1>Respostas:</h1>
        </div>
        <div className="md:flex md:justify-center gap-[64px] mb-[32px] flex-col md:flex-row">
          {product01Data.length > 0 && (
            <div className="flex flex-col justify-center">
              <p className="text-center mb-[16px]">Omo Litro</p>
              <div className="max-w-[400px] max-h-[400px] min-w-[400px] min-h-[400px]">
                <ReactWordcloud
                  size={[400, 400]}
                  words={product01Data}
                  //@ts-ignore
                  options={options}
                />
              </div>
            </div>
          )}
          {product02Data.length > 0 && (
            <div className="flex flex-col justify-center">
              <p className="text-center mb-[16px]">Omo Saco</p>
              <div className="max-w-[400px] max-h-[400px] min-w-[400px] min-h-[400px]">
                <ReactWordcloud
                  size={[400, 400]}
                  words={product02Data}
                  //@ts-ignore
                  options={options}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Results;
