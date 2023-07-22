import { Switch } from '@/components/ui/switch';

export function OptionsSkeleton() {
  return (
    <div className="pt-7 pb-8 flex items-center border-b border-gray-100">
      <div className="w-[30rem]">
        <div className="mb-2 h-[1rem] w-[8rem] bg-gray-100 rounded-md animate-pulse" />
        <div className="h-[.85rem] w-[13rem] bg-gray-100 rounded-md animate-pulse" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <Switch disabled />
          <div className="h-[1rem] w-[8rem] bg-gray-100 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
}
