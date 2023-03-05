'use client';

import { Checkbox } from '@/components/Checkbox';
import Spinner from '@/components/Spinner';
import { useAuth } from '@/contexts/AuthContext';
import { ct } from '@/utils/style';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

interface Credentials {
  email: string;
  password: string;
}

export default function Dashboard() {
  const [credentials, setCredentials] = useState<Credentials>(
    {} as Credentials,
  );
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const imageSize = 30;
  const fields = [
    {
      label: 'E-mail',
      type: 'email',
      field: 'email',
      placeholder: 'Digite seu e-mail',
    },
    {
      label: 'Senha',
      type: 'password',
      field: 'password',
      placeholder: 'Digite sua senha',
    },
  ];

  const handleInput = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = event.target;
    if (typeof value === 'undefined') return;

    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const canAccess = (): boolean => {
    if (Object.keys(credentials).length < fields.length) {
      return true;
    }

    const { email, password } = credentials;
    const validation =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const rules = [validation.test(email.toLowerCase()), password.length >= 6];
    if (rules.includes(false)) return true;

    return false;
  };

  const handleCheck = () => {
    setRemember(prev => !prev);
  };

  const handleLogin = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await signIn({ ...credentials, remember });
    } catch (error) {
      let message = 'Houve um erro em processar sua solicitação.';
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        switch (status) {
          case 401:
          case 404:
            message = 'E-mail ou senha incorretos.';
            break;
        }
      }

      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center bg-gray-200">
      <ToastContainer autoClose={2500} />
      <div className="mt-20 flex flex-col gap-10">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo.svg"
            alt="Logo"
            width={imageSize}
            height={imageSize}
          />

          <span className="font-bold text-md tracking-widest whitespace-nowrap">
            PROGY
          </span>
        </div>

        <div className="flex flex-col">
          <h1 className="font-medium text-2xl">Entrar</h1>
          <span className="text-sm text-[#8e8e94]">
            Faça login na sua conta
          </span>
        </div>

        <div className="w-[25rem] p-7 flex flex-col bg-[#fff] rounded-lg shadow-md">
          {fields.map((field, index) => (
            <div
              className={ct('flex flex-col gap-1', 'first:mb-6')}
              key={index}
            >
              <span className="text-sm">{field.label}</span>
              <input
                className={ct(
                  'px-2.5 py-2.5 border border-gray-100 rounded outline-blue-300 duration-200 text-sm',
                  'hover:bg-[#E7E9ED]',
                )}
                placeholder={field.placeholder}
                type={field.type}
                onChange={event => handleInput(event, field.field)}
              />
            </div>
          ))}

          <div className="my-5 flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <Checkbox onChange={handleCheck} />
              <span className="text-xs font-normal">Relembrar por 30 dias</span>
            </div>

            <span
              className={ct(
                'text-xs font-bold text-blue-300 duration-100 cursor-pointer',
                'hover:brightness-125',
              )}
            >
              Esqueceu sua senha?
            </span>
          </div>

          <button
            data-loading={loading}
            onClick={handleLogin}
            disabled={canAccess()}
            className={ct(
              'group',
              'py-2.5 flex items-center justify-center bg-blue-300 rounded-md text-sm text-[#fff]',
              'disabled:opacity-30 disabled:cursor-not-allowed',
            )}
          >
            <Spinner
              className={ct('hidden', 'group-data-[loading=true]:block')}
            />
            <span className="group-data-[loading=true]:hidden">Acessar</span>
          </button>
        </div>
      </div>
    </div>
  );
}