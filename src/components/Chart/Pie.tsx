'use client';

import { Chart, registerables, TooltipItem } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { PieChartProps, PieChartType } from '.';

Chart.register(...registerables);

export default function PieChart({ labels, values, type }: PieChartProps) {
  const labelCallback = (item: TooltipItem<'pie'>) => {
    if (type === PieChartType.VALUE) return `Quantidade: ${item.parsed}`;

    const value = Number(item.parsed);
    if (isNaN(value)) return `R$ ${item.formattedValue}`;

    const total = item.dataset.data.reduce((acc, curr) => acc + curr, 0);
    const percent = (value / total) * 100;

    const formatter = new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      style: 'currency',
    });

    return [formatter.format(value), percent.toFixed(2) + '%'];
  };

  return (
    <div className="max-h-[10rem]">
      <Pie
        data={{
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: ['#3E6BF7', '#64B7E3'],
            },
          ],
        }}
        options={{
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: labelCallback,
              },
              backgroundColor: '#062256',
              titleFont: {
                size: 14,
                weight: '400',
              },
              titleColor: '#8098BF',
              bodyFont: {
                size: 14,
                weight: '500',
              },
              bodyColor: '#FFF',
              displayColors: false,
              padding: 10,
            },
          },
        }}
      />
    </div>
  );
}
