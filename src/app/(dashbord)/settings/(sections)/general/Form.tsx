'use client';

import Input from '@/components/Input';
import { roleAlias } from '@/constants/roles';
import { User } from '@/types/user';
import { ct } from '@/utils/style';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FieldProp, fields } from './config';
import { GeneralResponse } from './page';

export interface GeneralProps extends GeneralResponse {
  loading: boolean;
}

export function Form({ user, error, loading }: GeneralProps) {
  const [tempData, setTempData] = useState(user);

  useEffect(() => {
    if (!error) return;

    toast.error(error);
  }, [error]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: FieldProp,
  ) => {
    const { value } = event.target;
    if (typeof value === 'undefined') return;

    setTempData(prev => ({ ...prev, [field.key]: value }));
  };

  const getData = (key: keyof User) => {
    if (key === 'role_id') {
      return roleAlias.find(role => role.current === tempData.role_id)?.name;
    }

    return tempData[key];
  };

  return (
    <div>
      <ToastContainer autoClose={2500} />
      {fields.map((field, index) => (
        <div
          className={ct(
            'pt-8 pb-8 flex items-center border-b border-gray-100',
            'last:bg-red',
          )}
          key={index}
        >
          <div className="w-[30rem]">
            <span>{field.label}</span>
            <p className="max-w-[13rem] text-sm text-gray-500">
              {field.description}
            </p>
          </div>
          <Input
            className="w-full max-w-lg h-12"
            placeholder="Digite seu nome"
            defaultValue={getData(field.key)}
            loading={loading}
            disabled={field.disabled}
            onChange={event => handleChange(event, field)}
          />
        </div>
      ))}
    </div>
  );
}
