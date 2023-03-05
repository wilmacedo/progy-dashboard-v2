import { ct } from '@/utils/style';
import { HTMLAttributes } from 'react';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
}

export default function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={ct(
        'px-2.5 py-2.5 border border-gray-100 rounded outline-blue-300 duration-200 text-sm',
        'hover:bg-[#E7E9ED]',
        className || '',
      )}
      {...rest}
    />
  );
}
