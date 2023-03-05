'use client';

import { ct } from '@/utils/style';
import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';

interface CheckboxProps {
  onChange?: (checked: boolean) => void;
}

export function Checkbox({ onChange }: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    if (onChange) onChange(!checked);
    setChecked(!checked);
  };

  return (
    <div
      data-checked={checked}
      onClick={handleCheck}
      className={ct(
        'group',
        'w-[1.15rem] h-[1.15rem] flex items-center justify-center border border-gray-100 rounded-[.2rem] duration-100 cursor-pointer',
        'data-[checked=true]:bg-blue-300',
      )}
    >
      <FiCheck
        className={ct(
          'text-sm text-gray-100',
          'group-data-[checked=false]:opacity-0',
        )}
      />
    </div>
  );
}
