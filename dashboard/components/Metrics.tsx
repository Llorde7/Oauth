// components/Metrics.tsx

import { useState, useEffect } from 'react';

interface MetricsProps {
  filter: string;
}

const Metrics: React.FC<MetricsProps> = ({ filter }) => {
  const [milk, setMilk] = useState<number | null>(null);
  const [payment, setPayment] = useState<number | null>(null);
  const [expense, setExpense] = useState<number | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const milkRes = await fetch(`/api/milk-delivery?filter=${filter}`);
      const milkData = await milkRes.json();
      setMilk(milkData.totalMilk);

      const paymentRes = await fetch(`/api/payment?filter=${filter}`);
      const paymentData = await paymentRes.json();
      setPayment(paymentData.totalPayment);

      const expenseRes = await fetch(`/api/expense?filter=${filter}`);
      const expenseData = await expenseRes.json();
      setExpense(expenseData.totalExpense);
    };

    fetchMetrics();
  }, [filter]);

  return (
    <div>
      <h2>Metrics</h2>
      <p>Total Milk Delivered: {milk}</p>
      <p>Total Payment Received: {payment}</p>
      <p>Total Expense on Agrovet: {expense}</p>
    </div>
  );
};

export default Metrics;
