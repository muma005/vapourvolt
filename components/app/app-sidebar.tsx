"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/auth/supabase-browser";
import { PrimaryButton } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/app" },
  { label: "New Case", href: "/app/cases/new" },
];

export function AppSidebar({
  email,
}: {
  email: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="w-full rounded-[1.75rem] border border-[rgba(22,28,40,0.08)] bg-[rgba(255,253,248,0.88)] p-5 lg:w-[260px]">
      <div className="rounded-2xl bg-[var(--color-primary)] px-4 py-4 text-white">
        <p className="text-xs uppercase tracking-[0.18em] text-white/70">VaporVault</p>
        <p className="mt-2 text-lg font-semibold">Recovery operations platform</p>
      </div>

      <nav className="mt-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block rounded-2xl px-4 py-3 text-sm font-medium transition",
              pathname === item.href
                ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                : "text-muted hover:bg-white/80 hover:text-ink",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 rounded-2xl border border-[rgba(22,28,40,0.08)] bg-white/70 px-4 py-4">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Signed in</p>
        <p className="mt-2 text-sm font-medium text-ink">{email}</p>
      </div>

      <div className="mt-4">
        <PrimaryButton onClick={handleSignOut} className="w-full">
          Sign Out
        </PrimaryButton>
      </div>
    </aside>
  );
}
