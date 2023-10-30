import axios from 'axios';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import type { FieldValues, UseFormGetValues } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export const Timer = ({
  getValues,
  productId,
}: {
  getValues: UseFormGetValues<FieldValues>;
  productId: number;
}) => {
  const [seconds, setSeconds] = useState(2 * 60); // 2 minutos em segundos
  const [isActive, setIsActive] = useState(true);

  const createAnswer = async (data: any) => {
    return axios.post('/api/answers', {
      ...data,
      product: productId,
    });
  };

  const { mutate } = useMutation('createAnswerMutationByTime', createAnswer);

  const onTimeEnd = async () => {
    const userId = localStorage.getItem('userId') || '';
    const data = getValues();
    mutate(
      { ...data, userId },
      {
        onSuccess: () => {
          localStorage.setItem('product', productId.toString());
          router.push(`${productId}/${userId}/gabarito/`);
        },
        onError: (err: any) => {
          toast.error(err.response.data.error || 'erro ao enviar respostas!');
        },
      },
    );
  };

  useEffect(() => {
    let interval: any;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      onTimeEnd();
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  return (
    <div>
      <h1 className="text-[16px] font-bold text-[#4056e6]">
        Seu Tempo: {formatTime(seconds)}
      </h1>
    </div>
  );
};
