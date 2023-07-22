import Button from '@/components/Button';
import Options from '@/components/Options';
import { ct } from '@/utils/style';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { IoRocketOutline } from 'react-icons/io5';
import { TbAlertCircle } from 'react-icons/tb';

export function CardSkeleton() {
  return (
    <div className="min-w-[16.5rem] border border-gray-100 rounded-md gap-8">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="h-[1rem] w-[8rem] bg-gray-100 rounded-md animate-pulse" />
            <div className="mt-0.5 h-[1rem] w-[4rem] bg-gray-100 rounded-md animate-pulse" />
          </div>

          <Options />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <IoRocketOutline className="text-sm text-gray-500" />
              <span className="text-xs text-gray-500">Progresso</span>
            </div>

            <div className="h-[1rem] w-[3rem] bg-gray-100 rounded-md animate-pulse" />
          </div>

          <div className="relative h-2 bg-gray-100 rounded-md">
            <div
              style={{ width: '0%' }}
              className={ct(`absolute h-2 left-0 bg-green-500 rounded-md`)}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="py-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 bg-gray-100 rounded-md">
              <span className="text-xs text-gray-500">
                {format(new Date(), 'dd MMM yyyy', {
                  locale: ptBR,
                })}
              </span>
            </div>

            <div
              data-count={false}
              className={ct(
                'group',
                'p-1.5 flex items-center justify-center gap-1 bg-gray-100 rounded-full',
                'data-[count=true]:bg-red-100',
              )}
            >
              <TbAlertCircle
                className={ct(
                  'text-gray-500',
                  'group-data-[count=true]:text-red-500',
                )}
              />
              <span
                className={ct(
                  'text-xs text-gray-500',
                  'group-data-[count=true]:text-red-500',
                )}
              >
                0
              </span>
            </div>
          </div>

          <Button disabled className="py-0 text-xs">
            Acessar
          </Button>
        </div>
      </div>
    </div>
  );
}
