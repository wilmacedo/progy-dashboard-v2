'use client';

import { ct } from '@/utils/style';
import { Ref, forwardRef, useState } from 'react';
import { FiCheck } from 'react-icons/fi';

interface CheckboxProps {
  onChange?: (checked: boolean) => void;
  value?: boolean;
}

export const Checkbox = forwardRef(function Checkbox(
  { onChange }: CheckboxProps,
  ref: Ref<HTMLButtonElement>,
) {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    if (onChange) onChange(!checked);
    setChecked(!checked);
  };

  return (
    <button
      ref={ref}
      type="button"
      data-checked={checked}
      onClick={handleCheck}
      className={ct(
        'group',
        'w-4 h-4 flex items-center justify-center border border-input ring-offset-white rounded-md duration-100',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[checked=true]:bg-primary data-[checked=true]:text-white dark:data-[checked=true]:bg-primary dark:data-[checked=true]:text-background',
        'dark:border-input dark:ring-offset-background',
      )}
    >
      <FiCheck
        className={ct(
          'text-sm text-white',
          'group-data-[checked=false]:opacity-0',
        )}
      />
    </button>
  );
});
