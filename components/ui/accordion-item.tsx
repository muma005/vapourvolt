"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function AccordionItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="surface-card overflow-hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="text-base font-semibold text-ink">{question}</span>
        <span
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] text-lg transition",
            open && "rotate-45",
          )}
        >
          +
        </span>
      </button>
      {open ? <div className="border-t hairline px-6 pb-6 pt-4 text-sm leading-7 text-muted">{answer}</div> : null}
    </div>
  );
}
