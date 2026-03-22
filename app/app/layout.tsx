import { AppSidebar } from "@/components/app/app-sidebar";
import { SetupNotice } from "@/components/app/setup-notice";
import { hasSupabaseEnv } from "@/lib/auth/env";
import { requireUser } from "@/lib/auth/require-user";

export default async function ProtectedAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!hasSupabaseEnv()) {
    return (
      <main className="section-pad">
        <div className="site-shell">
          <SetupNotice />
        </div>
      </main>
    );
  }

  const user = await requireUser();

  return (
    <main className="min-h-screen bg-[rgba(245,244,239,0.65)]">
      <div className="site-shell flex flex-col gap-6 py-6 lg:flex-row lg:items-start">
        <AppSidebar email={user?.email ?? "Signed in"} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </main>
  );
}
