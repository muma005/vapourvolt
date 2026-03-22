import Link from "next/link";
import { Card, PrimaryButton } from "@/components/ui/primitives";

export function SetupNotice() {
  return (
    <div className="mx-auto max-w-3xl">
      <Card className="p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Setup required</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-ink">
          Supabase credentials are needed to run the real SaaS product loop.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, apply the SQL in
          `supabase/schema.sql`, and the protected app routes will become fully operational.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryButton href="/demo">View Product Preview</PrimaryButton>
          <Link href="/" className="inline-flex items-center rounded-full border border-[var(--color-border)] px-5 py-3 text-sm font-semibold text-ink">
            Return Home
          </Link>
        </div>
      </Card>
    </div>
  );
}
