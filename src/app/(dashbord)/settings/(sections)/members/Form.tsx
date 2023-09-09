'use client';

import Button from '@/components/Button';
import Dropdown, { DropdownData } from '@/components/Dropdown';
import Input from '@/components/Input';
import { toast } from '@/components/ui/use-toast';
import { api } from '@/services/api/client';
import { Institution, Role } from '@/types/request';
import { ct } from '@/utils/style';
import { ChangeEvent, useState } from 'react';
import { SingleValue } from 'react-select';

interface MembersFormProps {
  institutions: Institution[];
  roles: Role[];
}

interface Invite {
  email: string;
  institutionId: number;
  roleId: number;
}

export default function MembersForm({ institutions, roles }: MembersFormProps) {
  const [invite, setInvite] = useState<Invite | undefined>();

  const formatData = (data: (Institution | Role)[]): DropdownData[] =>
    data.map(item => ({
      value: item.id,
      label: item.name,
    }));

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (typeof value === 'undefined') return;

    setInvite(prev => ({
      ...(prev || ({} as Invite)),
      email: value,
    }));
  };

  const handleDropdownChange = (
    data: SingleValue<DropdownData>,
    field: string,
  ) => {
    setInvite(prev => ({
      ...(prev || ({} as Invite)),
      [`${field}Id`]: data?.value,
    }));
  };

  const validateInvite = () => {
    if (!invite) return false;
    const { email, institutionId, roleId } = invite;

    if (!email || !email.match('[a-z0-9]+@[a-z]+.[a-z]{2,3}')) return false;

    if (isNaN(institutionId) || institutionId <= 0) return false;
    if (isNaN(roleId) || roleId <= 0) return false;

    return true;
  };

  const handleInvite = async () => {
    const body = {
      ...invite,
      institution_id: invite?.institutionId,
      role_id: invite?.roleId,
    };

    const { code } = await api({
      method: 'POST',
      route: '/users/invite',
      body,
    });
    if (code) {
      let message;
      switch (code) {
        case 'E1000':
          message = 'Um ou mais campos estão vazios';
          break;
        case 'E1002':
          message = 'O e-mail informado já pertence à um usuário ativo';
          break;
        default:
          message = code;
      }

      toast({ variant: 'destructive', title: message });
      return;
    }

    toast({ title: 'Convite enviado com sucesso!' });
    // TODO: Clear all inputs after success
  };

  return (
    <div>
      <div
        className={ct(
          'pt-8 pb-8 flex items-center border-b border-gray-100',
          'last:bg-red',
        )}
      >
        <div className="w-[30rem]">
          <span>Convidar membro da equipe</span>
          <p className="max-w-[13rem] text-sm text-gray-500">
            Convide um membro do planejamento para acessar o painel de controle
          </p>
        </div>
        <div className="flex flex-col items-end w-full">
          <div className="flex gap-2 items-center w-full h-12">
            <Input
              type="email"
              className="w-full"
              placeholder="exemplo@email.com"
              onChange={handleEmailChange}
            />
            <Dropdown
              className="w-full"
              placeholder="Instituição"
              options={formatData(institutions)}
              onChange={data => handleDropdownChange(data, 'institution')}
            />
            <Dropdown
              className="w-full"
              placeholder="Cargo"
              options={formatData(roles)}
              onChange={data => handleDropdownChange(data, 'role')}
            />
          </div>

          <Button onClick={handleInvite} disabled={!validateInvite()}>
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
