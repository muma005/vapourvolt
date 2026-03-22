import Link from "next/link";

const footerLinks = [
  { label: "Product", href: "/#product" },
  { label: "Workflow", href: "/#workflow" },
  { label: "Engine", href: "/#engine" },
  { label: "Demo", href: "/demo" },
  { label: "Log In", href: "/login" },
  { label: "Sign Up", href: "/signup" },
  { label: "Trust", href: "/#trust" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/contact#privacy" },
  { label: "Terms", href: "/contact#terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-[rgba(22,28,40,0.08)] bg-[rgba(255,253,248,0.72)]">
      <div className="site-shell grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold text-ink">VaporVault</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-muted">
            A system of record for digital asset recovery operations.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Links</p>
          <div className="mt-4 grid gap-3 text-sm">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-muted transition hover:text-ink">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Contact</p>
          <a
            href="mailto:hello@vaporvault.co"
            className="mt-4 inline-block text-sm text-ink transition hover:text-[var(--color-primary)]"
          >
            hello@vaporvault.co
          </a>
          <p className="mt-8 text-xs text-muted">(c) 2026 VaporVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
