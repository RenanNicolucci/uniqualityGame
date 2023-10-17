import axios from 'axios';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useMutation } from 'react-query';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const Index = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ name: string }>();

  const createUser = async ({ name }: { name: string }) => {
    return axios.post('/api/user', { name });
  };

  const { mutate, isLoading } = useMutation('createUserMutation', createUser);

  const onSubmit = async (data: { name: string }) => {
    const { name } = data;
    try {
      mutate(
        { name },
        {
          onSuccess: (response) => {
            window.location.href = `/perguntas`;
            localStorage.setItem('userId', response.data.id);
          },
        },
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao enviar a requisição:', error);
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="p-[64px]">
          <h1 className="text-center text-[20px]">Digite seu nome:</h1>
          <form
            className="mx-auto mt-[32px] flex max-w-[250px] flex-col items-center gap-[16px] text-[16px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-[16px]">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="name" className="mb-[8px]">
                Nome
              </label>
              <input
                id="name"
                {...register('name', { required: 'Esse campo é necessário' })}
                className="border-[1px] border-solid border-[#535353] px-[16px] py-[8px]"
              />
              {errors.name && (
                <p className="mt-[-6px] text-[red]">Campo obrigatório</p>
              )}
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="mt-[32px] flex w-full items-center justify-center gap-[16px] rounded bg-[#1f36c7] p-[8px] px-[22px] font-bold uppercase text-white"
              >
                Entrar
                {isLoading && (
                  <div className="animate-spin">
                    <AiOutlineLoading3Quarters />
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
};

export default Index;
