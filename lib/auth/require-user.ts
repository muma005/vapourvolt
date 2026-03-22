import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/auth/env";
import { createSupabaseServerClient } from "@/lib/auth/supabase-server";

export async function requireUser() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
