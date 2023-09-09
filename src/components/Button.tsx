import { cn } from '@/lib/utils';
import { ct } from '@/utils/style';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import Spinner from './Spinner';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  loading?: boolean;
  className?: string;
}

export default function Button({
  children,
  loading,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      data-loading={loading}
      className={cn(
        'group',
        'py-2.5 px-3 flex items-center justify-center bg-blue-300 rounded-md text-sm text-white duration-200',
        'hover:brightness-125',
        'disabled:opacity-30 disabled:cursor-not-allowed',
        className,
      )}
      {...rest}
    >
      <Spinner className={ct('hidden', 'group-data-[loading=true]:block')} />
      <span className="group-data-[loading=true]:hidden">{children}</span>
    </button>
  );
}
