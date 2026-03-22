"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Card, PrimaryButton, SecondaryButton } from "@/components/ui/primitives";
import { getCurrentSession, loginUser, signUpUser } from "@/lib/product/workspace-store";

type AuthShellProps = {
  mode: "login" | "signup";
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
  mode,
  label,
  title,
  description,
  submitLabel,
  altLabel,
  altHref,
  altLinkText,
  fields,
}: AuthShellProps) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(
    () => Object.fromEntries(fields.map((field) => [field.name, ""])) as Record<string, string>,
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const helperCopy =
    mode === "signup"
      ? "Create an email/password account to enter the VapourltAgent product workspace and save recovery cases."
      : "Sign in to access your saved cases, readiness assessments, and case progression workspace.";

  useEffect(() => {
    if (getCurrentSession()) {
      router.replace("/app");
    }
  }, [router]);

  function updateValue(name: string, value: string) {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const result =
        mode === "signup"
          ? signUpUser({
              name: values.name ?? "",
              company: values.company ?? "",
              email: values.email ?? "",
              password: values.password ?? "",
            })
          : loginUser({
              email: values.email ?? "",
              password: values.password ?? "",
            });

      if (!result.ok) {
        throw new Error(result.error);
      }

      setSuccess(mode === "signup" ? "Workspace created. Redirecting to the product..." : "Signed in. Redirecting to the product...");
      router.push("/app");
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to complete authentication.");
      setIsSubmitting(false);
      return;
    }
  }

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
                "Protected product access",
                "Saved case records",
                "Structured decisioning",
                "Audit-friendly assessments",
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
              <p className="mt-3 text-sm leading-7 text-muted">{helperCopy}</p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {fields.map((field) => (
                <label key={field.name} className="block">
                  <span className="field-label">{field.label}</span>
                  <input
                    className="field mt-2"
                    name={field.name}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    value={values[field.name] ?? ""}
                    onChange={(event) => updateValue(field.name, event.target.value)}
                  />
                </label>
              ))}

              {error ? (
                <div className="rounded-2xl border border-[rgba(142,75,75,0.18)] bg-[rgba(142,75,75,0.08)] px-4 py-3 text-sm text-[var(--color-danger)]">
                  {error}
                </div>
              ) : null}

              {success ? (
                <div className="rounded-2xl border border-[rgba(63,120,86,0.18)] bg-[rgba(63,120,86,0.1)] px-4 py-3 text-sm text-[var(--color-success)]">
                  {success}
                </div>
              ) : null}

              <div className="flex items-center justify-between rounded-2xl border border-[rgba(22,28,40,0.08)] bg-[rgba(240,237,229,0.72)] px-4 py-3">
                <p className="text-sm text-ink">
                  Email/password access with protected routes and saved case records in this browser workspace.
                </p>
                <Link href="/contact" className="text-sm font-medium text-[var(--color-primary)]">
                  Need help?
                </Link>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <PrimaryButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Please wait" : submitLabel}
                </PrimaryButton>
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
