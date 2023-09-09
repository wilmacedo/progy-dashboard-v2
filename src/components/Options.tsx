import { ct } from '@/utils/style';
import { ReactNode } from 'react';
import { RxDotsVertical } from 'react-icons/rx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface OptionsProps {
  children?: ReactNode;
}

export default function Options({ children }: OptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className={ct(
            'h-5 w-5 flex items-center justify-center border border-border rounded-full cursor-pointer duration-200',
            'hover:border-muted-foreground',
          )}
        >
          <RxDotsVertical className="text-[0.75rem]" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}
