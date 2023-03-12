import { api } from '@/services/api/server';
import { DashboardInfo, Planning } from '@/types/request';
import { Cards } from './Cards';

async function getPlanningData() {
  const planningData = await api<Planning[]>({
    route: '/plannings',
    method: 'GET',
  });
  if (!planningData.data || planningData.error) return { planningData };

  const promises = planningData.data.map(async planning => {
    const metricsData = await api<DashboardInfo>({
      route: `/plannings/${planning.id}/dashboard`,
      method: 'GET',
    });

    return metricsData;
  });

  const metricsData = await Promise.all(promises);

  return { planningData, metricsData };
}

export default async function List() {
  const { planningData, metricsData } = await getPlanningData();

  return (
    <div>
      <Cards planningData={planningData} metricsData={metricsData} />
    </div>
  );
}
