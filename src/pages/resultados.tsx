import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { questionsEnum } from "@/constants/questionsEnum";

const Results = () => {
  const [product01Data, setProduct01Data] = useState([]);
  const [product02Data, setProduct02Data] = useState([]);
  const chartRef01 = useRef(null);
  const chartRef02 = useRef(null);

  useEffect(() => {
    axios
      .get("/api/answers")
      .then((response) => {
        setProduct01Data(
          response.data.filter(
            (item: any) => item.product === 1 && item.quantity > 0
          )
        );
        setProduct02Data(
          response.data.filter(
            (item: any) => item.product === 2 && item.quantity > 0
          )
        );
      })
      .catch((error) => {
        console.error("Erro ao fazer a requisição:", error);
      });
  }, []);

  useEffect(() => {
    if (product01Data.length) {
      //@ts-ignore
      const ctx = chartRef01?.current?.getContext("2d");

      new Chart(ctx, {
        type: "pie",
        data: {
          //@ts-ignore
          labels: product01Data.map((item) => questionsEnum[item.key]),
          datasets: [
            {
              //@ts-ignore
              data: product01Data.map((item) => item.quantity),
              backgroundColor: [
                "#1f36c7",
                "#39b6e3",
                "#9e3db4",
                "#9b2c42",
                "#257633",
                "#666820",
                "#3f6b26",
                "#652323",
                "#1c4048",
                "#391630",
              ],
            },
          ],
        },
      });
    }
  }, [product01Data]);

  useEffect(() => {
    if (product02Data.length) {
      //@ts-ignore
      const ctx = chartRef02?.current?.getContext("2d");

      new Chart(ctx, {
        type: "pie",
        data: {
          //@ts-ignore
          labels: product02Data.map((item) => questionsEnum[item.key]),
          datasets: [
            {
              //@ts-ignore
              data: product02Data.map((item) => item.quantity),
              backgroundColor: [
                "#1f36c7",
                "#39b6e3",
                "#9e3db4",
                "#9b2c42",
                "#257633",
                "#666820",
                "#3f6b26",
                "#652323",
                "#1c4048",
                "#391630",
              ],
            },
          ],
        },
      });
    }
  }, [product01Data]);

  return (
    <>
      <Header />
      <main>
        <div className="text-center my-[32px] text-[22px]">
          <h1>Respostas:</h1>
        </div>
        <div className="md:flex md:justify-center gap-[64px] mb-[32px] flex-col md:flex-row">
          <canvas className="max-w-[400px] max-h-[400px]" ref={chartRef01} />
          <canvas
            className="max-w-[400px] max-h-[400px] mt-[64px] md:mt-[0px]"
            ref={chartRef02}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Results;
