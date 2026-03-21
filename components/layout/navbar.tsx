import Link from "next/link";
import { PrimaryButton } from "@/components/ui/primitives";

const navLinks = [
  { label: "Product", href: "/#product" },
  { label: "Workflow", href: "/#workflow" },
  { label: "Trust", href: "/#trust" },
  { label: "FAQ", href: "/#faq" },
  { label: "Demo", href: "/demo" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(22,28,40,0.08)] bg-[rgba(245,244,239,0.82)] backdrop-blur-xl">
      <div className="site-shell flex items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-base font-semibold text-white">
            VV
          </span>
          <div>
            <p className="text-base font-semibold text-ink">VaporVault</p>
            <p className="text-xs text-muted">Lawful recovery workflow</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium text-muted transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <PrimaryButton href="/demo" className="hidden sm:inline-flex">
          Try Demo
        </PrimaryButton>
      </div>
    </header>
  );
}
