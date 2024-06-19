// components/MetricsGraph.tsx

import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

interface MetricsGraphProps {
  filter: string;
}

const MetricsGraph: React.FC<MetricsGraphProps> = ({ filter }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const milkRes = await fetch(`/api/milk-delivery?filter=${filter}`);
      const milkData = await milkRes.json();

      const paymentRes = await fetch(`/api/payment?filter=${filter}`);
      const paymentData = await paymentRes.json();

      const graphData = milkData.data.map((milkEntry: any, index: number) => ({
        date: milkEntry.delivery_date,
        milk: milkEntry.amount,
        payment: paymentData.data[index]?.amount || 0,
      }));

      setData(graphData);
    };

    fetchData();
  }, [filter]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="milk" fill="#8884d8" />
        <LineChart data={data}>
          <Line type="monotone" dataKey="payment" stroke="#ff7300" />
        </LineChart>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MetricsGraph;
