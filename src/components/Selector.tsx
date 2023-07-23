import { cn } from '@/lib/utils';
import { Check, LucideIcon } from 'lucide-react';

interface SelectorProps {
  name: string;
  description: string;
  Icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
}

export function Selector({
  name,
  description,
  Icon,
  isSelected,
  onClick,
}: SelectorProps) {
  return (
    <div className="group" data-selected={isSelected}>
      <div
        className={cn(
          'p-4 relative flex items-center gap-4 border border-gray-100 rounded-md cursor-pointer transition-all',
          'hover:border-blue-300 hover:bg-blue-300 hover:bg-opacity-10',
          'group-data-[selected=true]:border-blue-300 group-data-[selected=true]:bg-blue-300 group-data-[selected=true]:bg-opacity-10',
        )}
        onClick={onClick}
      >
        <Icon
          className={cn(
            'text-black',
            'group-hover:text-blue-800',
            'group-data-[selected=true]:text-blue-800',
          )}
          strokeWidth={1.25}
        />

        <div className="mr-12 flex flex-col">
          <span
            className={cn(
              'text-sm font-semibold',
              'group-hover:text-blue-800',
              'group-data-[selected=true]:text-blue-800',
            )}
          >
            {name}
          </span>
          <p
            className={cn(
              'text-xs font-medium text-gray-500',
              'group-data-[selected=true]:text-blue-500',
            )}
          >
            {description}
          </p>
        </div>

        <div
          className={cn(
            'w-5 h-5 absolute top-2 right-2 bg-transparent flex items-center justify-center rounded-full border border-gray-100',
            'group-data-[selected=true]:bg-blue-300',
          )}
        >
          {isSelected && <Check className="text-white" size={12} />}
        </div>
      </div>
    </div>
  );
}
