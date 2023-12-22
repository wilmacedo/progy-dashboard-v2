'use client';

import Spinner from '@/components/Spinner';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getRoleEnum, roleAlias } from '@/constants/roles';
import { Institution } from '@/types/request';
import { ct } from '@/utils/style';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ErrorType, errorMessages } from './config';
import { InviteData } from './page';

interface InviteProps {
  data: InviteData;
  institution: Institution;
}

const inviteFormSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(6),
  institution_id: z.number(),
  role: z.enum(getRoleEnum()),
});

type InviteFormValues = z.infer<typeof inviteFormSchema>;

export default function InvitePage({ data, institution }: InviteProps) {
  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      email: data.email,
      institution_id: data.institution_id,
      role: data.role,
    },
  });

  function getRoleName() {
    const targetRole = roleAlias.find(role => role.current === data.role);
    if (!targetRole) {
      return 'N/A';
    }

    return targetRole.name;
  }

  const hasError = () => {
    if (!data) return ErrorType.MISSING_DATA;

    // const expiration = data.expiration || 0;
    // if (expiration < new Date().getTime()) {
    //   return ErrorType.EXPIRED;
    // }

    const dataSchema = z.object({
      email: z.string().email(),
      institution_id: z.number(),
      role: z.enum(getRoleEnum()),
    });

    const parsedData = dataSchema.safeParse(data);
    if (!parsedData.success) {
      console.log(parsedData.error);
      return ErrorType.MISSING_DATA;
    }

    return -1;
  };

  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: InviteFormValues) {
    console.log({ data });
  }

  // const handleSubmit = async () => {
  //   if (loading) return;

  //   setLoading(true);

  //   const { code } = await api({
  //     method: 'POST',
  //     route: '/email/invite/create',
  //     body: {
  //       // TODO: Add create body
  //     },
  //   });

  //   if (code) {
  //     let message;
  //     switch (code) {
  //       case 'E1000':
  //         message = 'Uma ou mais informações estão faltando.';
  //         break;
  //       case 'E3001':
  //         message = 'O token do convite está inválido';
  //         break;
  //       default:
  //         message = 'Houve um erro em processar sua solicitação.';
  //     }

  //     toast({ variant: 'destructive', title: message });

  //     setLoading(false);
  //     return;
  //   }

  //   router.push(redirectUrl);
  // };

  return (
    <div className="min-h-[100vh] flex justify-center bg-accent">
      <div className="mt-12 flex flex-col gap-10">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8" />

          <span className="font-bold text-md tracking-widest whitespace-nowrap">
            PROGY
          </span>
        </div>

        <div className="flex flex-col">
          <h1 className="font-medium text-2xl">Cadastro via convite</h1>
          <span className="text-sm text-muted-foreground">
            Finalize seu cadastro
          </span>
        </div>

        <form
          className="w-[25rem] p-7 flex flex-col bg-[#fff] rounded-lg shadow-md"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
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
                <Input
                  type="email"
                  disabled
                  readOnly
                  {...form.register('email')}
                />
              </div>

              <div className="mb-6 flex flex-col gap-1">
                <span className="text-sm">Nome</span>
                <Input
                  type="text"
                  placeholder="Digite seu nome"
                  minLength={3}
                  {...form.register('name')}
                />
              </div>

              <div className="mb-6 flex flex-col gap-1">
                <span className="text-sm">Senha</span>
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  minLength={6}
                  {...form.register('password')}
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
                    value={institution.name}
                  />
                </div>
                <div>
                  <span className="text-sm">Cargo</span>
                  <Input
                    className="w-full truncate"
                    type="text"
                    disabled
                    readOnly
                    value={getRoleName()}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!form.formState.isValid}
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
        </form>

        {hasError() === -1 && (
          <div className="mb-4 max-w-[25rem] text-center">
            <span className="text-sm text-muted-foreground">
              Caso note alguma inconsistencia nas informações, entre em contato
              com o gerente do planejamento.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
