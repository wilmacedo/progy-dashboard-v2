import Button from '@/components/Button';
import { Planning } from '@/types/request';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { IoRocketOutline } from 'react-icons/io5';
import { TbAlertCircle } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';
import { OptionsMenu } from './options-menu';

export default function Loading() {
  return new Array(5).fill(0).map((_, index) => (
    <div
      key={index}
      className="min-w-[16.5rem] border border-border rounded-md gap-8"
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="h-[1rem] w-[8rem] bg-border rounded-md animate-pulse" />
            <div className="mt-0.5 h-[1rem] w-[4rem] bg-border rounded-md animate-pulse" />
          </div>

          <OptionsMenu planning={{} as Planning} />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <IoRocketOutline className="text-sm text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Progresso</span>
            </div>

            <div className="h-[1rem] w-[3rem] bg-border rounded-md animate-pulse" />
          </div>

          <div className="relative h-2 bg-border rounded-md">
            <div
              style={{ width: '0%' }}
              className={twMerge(`absolute h-2 left-0 bg-green-500 rounded-md`)}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="py-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 bg-border rounded-md">
              <span className="text-xs text-muted-foreground">
                {format(new Date(), 'dd MMM yyyy', {
                  locale: ptBR,
                })}
              </span>
            </div>

            <div
              data-count={false}
              className={twMerge(
                'group',
                'p-1.5 flex items-center justify-center gap-1 bg-border rounded-full',
                'data-[count=true]:bg-red-100',
              )}
            >
              <TbAlertCircle
                className={twMerge(
                  'text-muted-foreground',
                  'group-data-[count=true]:text-red-500',
                )}
              />
              <span
                className={twMerge(
                  'text-xs text-muted-foreground',
                  'group-data-[count=true]:text-red-500',
                )}
              >
                0
              </span>
            </div>
          </div>

          <Button disabled className="text-xs">
            Acessar
          </Button>
        </div>
      </div>
    </div>
  ));
}
