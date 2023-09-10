import { cn } from '@/lib/utils';
import { Check, LucideIcon } from 'lucide-react';
import { ComponentProps } from 'react';

interface SelectorProps extends ComponentProps<'button'> {
  name: string;
  description: string;
  Icon: LucideIcon;
  isSelected: boolean;
}

export function Selector({
  name,
  description,
  Icon,
  isSelected,
  ...rest
}: SelectorProps) {
  return (
    <button className="group select-none" data-selected={isSelected} {...rest}>
      <div
        className={cn(
          'p-4 relative flex items-center gap-4 border border-border rounded-md cursor-pointer transition-all',
          'hover:border-primary hover:bg-primary/10',
          'group-data-[selected=true]:border-primary group-data-[selected=true]:bg-primary/10',
        )}
      >
        <Icon className={cn('text-foreground')} strokeWidth={1.25} />

        <div className="mr-12 flex flex-col">
          <span className={cn('text-sm font-semibold text-foreground')}>
            {name}
          </span>
          <p className={cn('text-xs font-medium text-muted-foreground')}>
            {description}
          </p>
        </div>

        <div
          className={cn(
            'w-5 h-5 absolute top-2 right-2 bg-transparent flex items-center justify-center rounded-full border border-border',
            'group-data-[selected=true]:bg-primary',
          )}
        >
          {isSelected && <Check className="text-white" size={12} />}
        </div>
      </div>
    </button>
  );
}
