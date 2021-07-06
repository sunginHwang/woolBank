import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { IAccountBookStatistic } from '@models/accountBook/statistic/IAccountBookStatistic';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface IProps {
  accountBookStatistics: IAccountBookStatistic[];
}

function StatisticChart({ accountBookStatistics }: IProps) {
  const data = accountBookStatistics.map(({ categoryName, amount }) => {
    return { name: categoryName, value: amount };
  });

  const renderLabel = ({ percent, index }: any) => {
    const name = data[index].name;
    const value = `${name}: ${(percent * 100).toFixed(0)}%`;
    return value;
  };

  return (
    <div style={{ height: '300px' }}>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            labelLine
            label={renderLabel}
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatisticChart;
