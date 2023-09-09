'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import { Logo } from '@/components/logo';
import { toast } from '@/components/ui/use-toast';
import { redirectUrl } from '@/config/auth';
import { api } from '@/services/api/client';
import { ct } from '@/utils/style';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { ErrorType, errorMessages } from './config';
import { InviteData } from './page';

interface ResultData extends InviteData {
  name: string;
  password: string;
}

interface InviteProps {
  data: InviteData;
  names: {
    role_id: string;
    institution_id: string;
  };
}

export default function InvitePage({ data, names }: InviteProps) {
  const router = useRouter();

  const hasError = () => {
    const expiration = data.expiration || 0;
    if (expiration < new Date().getTime()) {
      return ErrorType.EXPIRED;
    }

    if (!data) return ErrorType.MISSING_DATA;

    const { email, institution_id: institutionId, role_id: roleId } = data;
    if (!email || email.length === 0) return ErrorType.MISSING_DATA;
    if (!institutionId || isNaN(institutionId)) return ErrorType.MISSING_DATA;
    if (!roleId || isNaN(roleId)) return ErrorType.MISSING_DATA;

    return -1;
  };

  const [result, setResult] = useState<ResultData>(data as ResultData);
  const [loading, setLoading] = useState(false);

  const handleInputValue = (
    event: ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const { value } = event.target;
    if (typeof value === 'undefined') return;

    setResult(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { name, password } = result;

    if (!name || name.length === 0) return false;
    if (!password || password.length < 6) return false;

    return true;
  };

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    const response: ResultData = JSON.parse(JSON.stringify(result));
    delete response.expiration;

    const { code } = await api({
      method: 'POST',
      route: '/email/invite/create',
      body: response,
    });

    if (code) {
      let message;
      switch (code) {
        case 'E1000':
          message = 'Uma ou mais informações estão faltando.';
          break;
        case 'E3001':
          message = 'O token do convite está inválido';
          break;
        default:
          message = 'Houve um erro em processar sua solicitação.';
      }

      toast({ variant: 'destructive', title: message });

      setLoading(false);
      return;
    }

    router.push(redirectUrl);
  };

  return (
    <div className="h-screen w-screen flex justify-center bg-gray-200">
      <div className="mt-20 flex flex-col gap-10">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8" />

          <span className="font-bold text-md tracking-widest whitespace-nowrap">
            PROGY
          </span>
        </div>

        <div className="flex flex-col">
          <h1 className="font-medium text-2xl">Cadastro via convite</h1>
          <span className="text-sm text-[#8e8e94]">Finalize seu cadastro</span>
        </div>

        <div className="w-[25rem] p-7 flex flex-col bg-[#fff] rounded-lg shadow-md">
          {hasError() > -1 ? (
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-medium">
                {errorMessages.find(msg => msg.type === hasError())?.title}
              </h1>
              <span className="text-sm text-gray-500">
                {errorMessages.find(msg => msg.type === hasError())?.message}
              </span>
            </div>
          ) : (
            <div>
              <div className="mb-6 flex flex-col gap-1">
                <span className="text-sm">E-mail</span>
                <Input type="email" disabled value={data.email} readOnly />
              </div>

              <div className="mb-6 flex flex-col gap-1">
                <span className="text-sm">Nome</span>
                <Input
                  type="text"
                  placeholder="Digite seu nome"
                  onChange={event => handleInputValue(event, 'name')}
                />
              </div>

              <div className="mb-6 flex flex-col gap-1">
                <span className="text-sm">Senha</span>
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  onChange={event => handleInputValue(event, 'password')}
                />
              </div>

              <div className="mb-6 flex gap-4">
                <div>
                  <span className="text-sm">Instituição</span>
                  <Input
                    className="truncate"
                    type="text"
                    disabled
                    readOnly
                    value={names.institution_id}
                  />
                </div>
                <div>
                  <span className="text-sm">Cargo</span>
                  <Input
                    className="w-full truncate"
                    type="text"
                    disabled
                    readOnly
                    value={names.role_id}
                  />
                </div>
              </div>

              <Button
                className="w-full"
                disabled={!validateForm()}
                onClick={handleSubmit}
                loading={loading}
              >
                <Spinner
                  className={ct('hidden', 'group-data-[loading=true]:block')}
                />
                <span className="group-data-[loading=true]:hidden">
                  Finalizar cadastro
                </span>
              </Button>
            </div>
          )}
        </div>

        {hasError() === -1 && (
          <div className="max-w-[25rem] text-center">
            <span className="text-sm text-gray-500">
              Caso veja alguma informação errada, não prossiga com o cadastro e
              entre em contato com o gerente do planejamento.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
