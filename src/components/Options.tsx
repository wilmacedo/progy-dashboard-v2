'use client';

import { ct } from '@/utils/style';
import { RxDotsVertical } from 'react-icons/rx';

export default function Options() {
  function onClick() {
    // TODO: Create options menu
  }

  return (
    <div
      className={ct(
        'h-5 w-5 flex items-center justify-center border border-gray-100 rounded-full cursor-pointer duration-200',
        'hover:border-gray-500',
      )}
      onClick={onClick}
    >
      <RxDotsVertical className="text-[0.75rem]" />
    </div>
  );
}
