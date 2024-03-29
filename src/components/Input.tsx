import { cn } from '@/lib/utils';
import { ct } from '@/utils/style';
import { forwardRef, InputHTMLAttributes, Ref } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  loading?: boolean;
  disabled?: boolean;
}

export default forwardRef(function Input(
  { className, loading, ...rest }: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  if (loading) {
    return (
      <div className={ct('p-2.5 w-full max-w-lg rounded-md', className || '')}>
        <div className="h-full w-full bg-gray-100 rounded-md animate-pulse" />
      </div>
    );
  }

  return (
    <input
      {...rest}
      ref={ref}
      className={cn(
        'px-2.5 py-2.5 border border-gray-100 rounded outline-blue-300 duration-200 text-sm',
        'hover:bg-[#E7E9ED]',
        'disabled:bg-[#E7E9ED] disabled:cursor-not-allowed',
        'invalid:border-red-500 invalid:text-red-500',
        'focus:invalid:outline-red-500 focus:invalid:text-red-500',
        className,
      )}
    />
  );
});
