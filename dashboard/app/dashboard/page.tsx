// app/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Metrics from '@/components/Metrics';
import MetricsGraph from '@/components/MetricsGraph';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server'

const Dashboard = () => {
  const [filter, setFilter] = useState('weekly');
  const supabase = createClient();
  const [loading,setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: {user}, error} = await supabase.auth.getUser();
      if(error || !user){
        return redirect('/login');
      }
      setLoading(false);
    };
    if (typeof window !== 'undefined'){
      checkUser();
    }
  },[]);

  if (loading) return <div className="flex justify-center items-center h-screen">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div> 
      </div>
    </div>
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Dairy Cooperative Dashboard</h1>
      <div className="mb-8">
        <button
          onClick={() => setFilter('weekly')}
          className={`px-4 py-2 mr-2 ${filter === 'weekly' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} rounded border border-blue-500`}
        >
          Weekly
        </button>
        <button
          onClick={() => setFilter('monthly')}
          className={`px-4 py-2 mr-2 ${filter === 'monthly' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} rounded border border-blue-500`}
        >
          Monthly
        </button>
        <button
          onClick={() => setFilter('yearly')}
          className={`px-4 py-2 ${filter === 'yearly' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} rounded border border-blue-500`}
        >
          Yearly
        </button>
      </div>
      <Metrics filter={filter} />
      <MetricsGraph filter={filter} />
    </div>
  );
};

export default Dashboard;
