import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Card, PrimaryButton, SecondaryButton } from "@/components/ui/primitives";

type AuthShellProps = {
  label: string;
  title: string;
  description: string;
  submitLabel: string;
  altLabel: string;
  altHref: string;
  altLinkText: string;
  fields: Array<{
    label: string;
    name: string;
    type?: string;
    placeholder: string;
  }>;
};

export function AuthShell({
  label,
  title,
  description,
  submitLabel,
  altLabel,
  altHref,
  altLinkText,
  fields,
}: AuthShellProps) {
  return (
    <>
      <Navbar />
      <main className="section-pad">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-center">
            <span className="eyebrow">{label}</span>
            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-ink sm:text-5xl">{title}</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted sm:text-lg">{description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Secure case access",
                "Team-ready workflows",
                "Audit-friendly reporting",
                "Human-reviewed recovery paths",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[rgba(22,28,40,0.08)] bg-white/70 px-4 py-4 text-sm font-medium text-ink"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <Card className="p-8 sm:p-10">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">{submitLabel}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                This v1 page is UI-only for now, but it is designed to feel like the real access flow.
              </p>
            </div>

            <form className="mt-8 space-y-5">
              {fields.map((field) => (
                <label key={field.name} className="block">
                  <span className="field-label">{field.label}</span>
                  <input
                    className="field mt-2"
                    name={field.name}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                  />
                </label>
              ))}

              <div className="flex items-center justify-between rounded-2xl border border-[rgba(22,28,40,0.08)] bg-[rgba(240,237,229,0.72)] px-4 py-3">
                <label className="flex items-center gap-3 text-sm text-ink">
                  <input type="checkbox" className="h-4 w-4 rounded border-[var(--color-border)]" />
                  Keep me signed in
                </label>
                <Link href="/contact" className="text-sm font-medium text-[var(--color-primary)]">
                  Need access?
                </Link>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <PrimaryButton type="button">{submitLabel}</PrimaryButton>
                <SecondaryButton href="/demo">Preview Demo</SecondaryButton>
              </div>
            </form>

            <div className="mt-8 border-t border-[var(--color-border)] pt-6 text-sm text-muted">
              {altLabel}{" "}
              <Link href={altHref} className="font-semibold text-[var(--color-primary)]">
                {altLinkText}
              </Link>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
