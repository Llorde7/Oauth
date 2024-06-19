"use client"
import Link from 'next/link';
import { signIn, signUp } from '../server-actions/actions';

export default function Login({
   searchParams,
  }: {
    searchParams: { message: string };
}) {
   return (
       <div className="flex flex-col items-center justify-center min-h-screen py-2">
         <h1 className="text-3xl font-bold">Sign In</h1>
         <div className="flex flex-col w-80 mt-4">
           <form>
             <input
               type="email"
               placeholder="Email"
               name="email"
               required
               className="p-2 mb-2 border rounded text-black"
             />
             <input
               type="password"
               placeholder="Password"
               name="password"
               required
               className="p-2 mb-2 border rounded text-black"
             />
             <button
               formAction={signIn}
               className="p-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-700"
             >
               Sign In 
             </button>
             <button
                formAction={signUp}
                className="p-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Sign Up 
              </button>
             <Link href="/forgot-password" className="text-blue-500 hover:underline mt-2">
               Forgot Password?
             </Link>
           </form>
         </div>
          {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
       </div>
     );
}

