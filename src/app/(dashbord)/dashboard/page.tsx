import Options from '@/components/Options';
import roles from '@/constants/roles';
import { api } from '@/services/api/server';
import { DashboardInfo } from '@/types/request';
import { getAuthCookieData } from '@/utils/auth';
import { ct } from '@/utils/style';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { toast } from 'react-toastify';
import { cards, mockedMetrics } from './config';

interface DashboardProps {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

async function getMetrics({
  searchParams,
}: DashboardProps): Promise<DashboardInfo> {
  if (!searchParams || typeof searchParams !== 'object' || !searchParams.id) {
    notFound();
  }

  const id = Number(searchParams.id);
  if (isNaN(id)) {
    notFound();
  }

  let { data, error, code } = await api<DashboardInfo>({
    route: `/plannings/${id}/dashboard`,
    method: 'GET',
  });
  if (error) {
    toast.error(`(${code}) Houve um erro ao carregar as métricas do dashboard`);
    return mockedMetrics;
  }

  if (!data) data = mockedMetrics;

  return data;
}

export default async function Dashboard(props: DashboardProps) {
  const metrics = await getMetrics(props);
  const cookies = getAuthCookieData();
  const roleId = cookies?.role_id || 0;

  return (
    <div>
      <div className="mb-6 flex gap-2 items-center">
        {roles.high.includes(roleId) && (
          <Link href="/">
            <IoIosArrowBack
              className={ct(
                'text-2xl duration-200 cursor-pointer',
                'hover:opacity-70',
              )}
            />
          </Link>
        )}
        <h1 className="font-semibold text-3xl">{metrics.title}</h1>
      </div>

      <div
        className={ct(
          'mt-4 grid grid-flow-row gap-6',
          'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6',
        )}
      >
        {cards.map((card, index) => (
          <div
            className="p-4 border border-gray-100 rounded-md shadow-sm"
            key={index}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <div
                  style={{ backgroundColor: card.bgColor }}
                  className={ct(
                    'w-fit p-2 items-center justify-center gap-1 rounded-full',
                  )}
                >
                  <card.Icon
                    style={{ color: card.textColor }}
                    className="text-lg"
                  />
                </div>
                <span>{card.title}</span>
              </div>

              <Options />
            </div>

            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold">
                {String(metrics[card.key])}
              </span>

              {card.redirect && (
                <Link href={card.redirect}>
                  <span
                    className={ct(
                      'text-xs font-bold text-blue-300 duration-100 cursor-pointer text-end',
                      'hover:brightness-125',
                    )}
                  >
                    Visualizar
                  </span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
