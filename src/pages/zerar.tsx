import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import axios from "axios";

const Zerar = () => {
  return (
    <>
      <Header />
      <main>
        <div className="text-center my-[32px] text-[22px]">
          <h1>Zerar treinamento</h1>
        </div>
        <div className="md:flex md:justify-center gap-[64px] mb-[32px] flex-col md:flex-row min-h-[30vh]">
          <button
            className="w-full max-w-[320px] bg-[#1f36c7] max-h-[64px] text-white p-[8px] mt-[32px] rounded font-bold uppercase"
            onClick={async () => {
              await axios.delete("/api/answers");
              window.location.href = "/";
            }}
          >
            Enviar
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Zerar;
