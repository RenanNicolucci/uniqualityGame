import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import axios from "axios";

const Zerar = () => {
  return (
    <>
      <Header />
      <main>
        <div className="text-center my-[64px] text-[22px]">
          <h1>Zerar treinamento</h1>
        </div>
        <div className="min-h-[30vh] w-full flex justify-center">
          <button
            className="w-full max-w-[320px] bg-[#1f36c7] max-h-[64px] text-white p-[8px] mt-[32px] rounded font-bold uppercase"
            onClick={async () => {
              await axios.delete("/api/answers");
              window.location.href = "/";
            }}
          >
            Zerar Dados
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Zerar;
