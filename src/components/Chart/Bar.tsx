'use client';

import { Chart, registerables, TooltipItem } from 'chart.js';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import { Bar } from 'react-chartjs-2';
import { BarChartProps } from '.';

Chart.register(...registerables);

type BarChartComponentProps = BarChartProps & ComponentProps<'div'>;

export default function BarChart({
  labels,
  values,
  route,
  ...rest
}: BarChartComponentProps) {
  const router = useRouter();

  let config = {};
  if (values[0] && typeof values[0] === 'object') {
    config = {
      parsing: {
        xAxisKey: 'id',
        yAxisKey: 'value',
      },
    };
  }

  return (
    <div {...rest}>
      <Bar
        data={{
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: '#3E6BF7',
              borderRadius: 3,
              barThickness: 20,
              minBarLength: 10,
            },
          ],
        }}
        options={{
          ...config,
          onClick: (event, elements) => {
            if (event.type !== 'click') return;
            if (elements.length === 0) return;

            const element = elements[0].element;
            if (!element) return;

            const context = (element as any).$context;
            if (!context) return;

            const raw = context.raw;
            if (!raw || !raw.id) return;

            router.push(`${route}?id=${raw.id}`);
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (item: TooltipItem<'bar'>) => {
                  return `Quantidade: ${item.formattedValue}`;
                },
                footer: () => {
                  return 'Clique parar ver detalhes';
                },
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
              footerFont: {
                style: 'italic',
                weight: '400',
              },
              footerColor: '#6C82A9',
              displayColors: false,
              padding: 10,
            },
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              grid: {
                drawTicks: false,
              },
              border: {
                dash: [8, 4],
                width: 0,
              },
              ticks: {
                padding: 10,
              },
            },
          },
        }}
      />
    </div>
  );
}
