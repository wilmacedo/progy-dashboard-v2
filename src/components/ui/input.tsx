import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm duration-200 outline-1 outline-primary file:border-0 placeholder:text-muted-foreground dark:border-input dark:bg-background',
          'file:bg-transparent file:text-sm file:font-medium',
          'hover:bg-muted',
          'disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50',
          'invalid:border-red-500 invalid:text-red-500',
          'focus-visible:invalid:outline-red-500 focus-visible:invalid:text-red-500',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
