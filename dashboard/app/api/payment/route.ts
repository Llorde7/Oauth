import { NextResponse } from 'next/server';
import { createClient } from "@/utils/supabase/server"
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const {data: {session}} = await supabase.auth.getSession();
  const user = session?.user;

  if (!user){
    console.log('user is not logged in')
  }
  


  let fromDate;
  switch (filter) {
    case 'weekly':
      fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - 7);
      break;
    case 'monthly':
      fromDate = new Date();
      fromDate.setMonth(fromDate.getMonth() - 1);
      break;
    case 'yearly':
      fromDate = new Date();
      fromDate.setFullYear(fromDate.getFullYear() - 1);
      break;
    default:
      fromDate = new Date(0); // all time
  }

  const { data, error } = await supabase
    .from('payments')
    .select('amount, payment_date')
    .gte('payment_date', fromDate.toISOString());

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const totalPayment = data.reduce((acc, curr) => acc + curr.amount, 0);
  return NextResponse.json({ totalPayment, data });
}