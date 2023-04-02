import Button from '@/components/Button';
import Options from '@/components/Options';
import { ct } from '@/utils/style';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ReactNode, Suspense } from 'react';
import { IoRocketOutline } from 'react-icons/io5';

interface ListLayoutProps {
  children: ReactNode;
}

export default async function ListLayout({ children }: ListLayoutProps) {
  return (
    <div>
      <div className="pb-4 border-b border-gray-100">
        <h1 className="mb-6 font-semibold text-3xl">Planejamentos</h1>
        <span className="text-md text-gray-500">
          Veja todos os planejamentos disponíveis aqui
        </span>
      </div>

      <Suspense
        fallback={
          <div
            className={ct(
              'mt-4 grid grid-flow-row gap-6',
              'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6',
            )}
          >
            {new Array(5).fill(0).map((_, index) => (
              <div
                className="border border-gray-100 rounded-md gap-8"
                key={index}
              >
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
                        className={ct(
                          `absolute h-2 left-0 bg-green-500 rounded-md`,
                        )}
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
                    </div>

                    <Button disabled className="py-0 text-xs">
                      Acessar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
