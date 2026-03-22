"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app/app-sidebar";
import { getCurrentSession } from "@/lib/product/workspace-store";
import type { ProductSession } from "@/lib/product/types";

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<ProductSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const nextSession = getCurrentSession();

    if (!nextSession) {
      router.replace("/login");
      return;
    }

    setSession(nextSession);
    setReady(true);
  }, [router]);

  if (!ready || !session) {
    return (
      <main className="min-h-screen bg-[rgba(245,244,239,0.65)]">
        <div className="site-shell py-16">
          <div className="rounded-[1.75rem] border border-[rgba(22,28,40,0.08)] bg-white/75 px-6 py-10 text-sm text-muted">
            Loading workspace...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[rgba(245,244,239,0.65)]">
      <div className="site-shell flex flex-col gap-6 py-6 lg:flex-row lg:items-start">
        <AppSidebar email={session.email} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </main>
  );
}
