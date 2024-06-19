// pages/index.tsx
import Link from 'next/link';


const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Welcome to Supabase Auth</h1>
      <nav className="mt-8">
        <ul className="flex space-x-4">
          <li>
            <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>  
          </li>
          <li>
            <Link href="/login" className="text-blue-500 hover:underline">Login</Link>  
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
