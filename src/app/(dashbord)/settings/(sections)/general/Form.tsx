'use client';

import Input from '@/components/Input';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { fields } from './config';
import { GeneralResponse } from './page';

export interface GeneralProps extends GeneralResponse {
  loading: boolean;
}

export function Form({ user, error, loading }: GeneralProps) {
  useEffect(() => {
    if (!error) return;

    toast.error(error);
  }, [error]);

  return (
    <div>
      <ToastContainer autoClose={2500} />
      {fields.map((field, index) => (
        <div className="pt-4 pb-8 flex border-b border-gray-100" key={index}>
          <div className="w-[30rem]">
            <span>{field.label}</span>
            <p className="text-sm text-gray-500">{field.description}</p>
          </div>
          <Input
            className="w-full max-w-lg"
            placeholder="Digite seu nome"
            defaultValue={user[field.key]}
            loading={loading}
          />
        </div>
      ))}
    </div>
  );
}
