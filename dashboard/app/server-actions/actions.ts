"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from 'next/headers'
import { createClient } from "@/utils/supabase/server";

export async function signIn(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }

  //revalidatePath("/", "layout");
  redirect("/dashboard?message=Login successful");
}

export async function signUp(formData: FormData){
  const origin = headers().get("origin");
  const email = formData.get('email') as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
  });

  if(error){
    return redirect("/signup?message=Could not create user");
  }

  return redirect("/login?message=Check email to continue sign in process");
}

export async function SignOut(){
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if(!error){
    return redirect("/login?message=Logout successful");
  }
}

export async function signInWithGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect(data.url);
}
