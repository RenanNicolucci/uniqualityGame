import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { questionsEnum } from "@/constants/questionsEnum";
import ReactWordcloud from "react-wordcloud";

const Results = () => {
  const [productData, setProductData] = useState([]);
  const [productIndex, setProductIndex] = useState<string | undefined>();

  const options = {
    rotations: [1, 1],
    rotationAngles: [0, 0],
    fontFamily: "sans-serif",
    fontSizes: [16, 36],
  };

  useEffect(() => {
    const product = localStorage.getItem("product");
    setProductIndex(product || undefined);
  }, []);

  useEffect(() => {
    if (typeof productIndex === "string") {
      axios
        .get("/api/answers")
        .then((response) => {
          setProductData(
            response.data
              .filter(
                (item: any) =>
                  item.product === parseInt(productIndex) && item.quantity > 0
              )
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
    }
  }, [productIndex]);

  return (
    <>
      <Header />
      <main>
        <div className="text-center my-[32px] text-[22px]">
          <h1>Respostas:</h1>
        </div>
        <div className="md:flex md:justify-center gap-[64px] mb-[32px] flex-col md:flex-row">
          {productData.length > 0 && (
            <div className="flex flex-col justify-center">
              <p className="text-center">
                {productIndex === "1" ? "Omo Litro" : "Omo Pacote"}
              </p>
              <div className="max-w-[400px] max-h-[400px] min-w-[400px] min-h-[400px]">
                <ReactWordcloud
                  size={[400, 400]}
                  words={productData}
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
