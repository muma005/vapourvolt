import { cn } from "@/lib/utils";

function inferTone(value: string) {
  const normalized = value.toLowerCase();

  if (
    normalized.includes("strong") ||
    normalized.includes("ready") ||
    normalized.includes("low") ||
    normalized.includes("blocked")
  ) {
    return "success";
  }

  if (
    normalized.includes("partial") ||
    normalized.includes("moderate") ||
    normalized.includes("awaiting") ||
    normalized.includes("medium") ||
    normalized.includes("progress")
  ) {
    return "warning";
  }

  if (normalized.includes("none") || normalized.includes("high") || normalized.includes("needs")) {
    return "danger";
  }

  return "neutral";
}

export function StatusBadge({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const tone = inferTone(value);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        tone === "success" && "bg-[var(--color-success-soft)] text-[var(--color-success)]",
        tone === "warning" && "bg-[var(--color-warning-soft)] text-[var(--color-warning)]",
        tone === "danger" && "bg-[var(--color-danger-soft)] text-[var(--color-danger)]",
        tone === "neutral" && "bg-[rgba(22,28,40,0.08)] text-[var(--color-text)]",
        className,
      )}
    >
      {value}
    </span>
  );
}
