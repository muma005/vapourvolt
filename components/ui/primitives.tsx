"use client";

import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function buttonClasses(variant: "primary" | "secondary", className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-150",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(54,85,211,0.15)]",
    variant === "primary"
      ? "bg-[var(--color-primary)] text-white shadow-[0_10px_28px_rgba(54,85,211,0.22)] hover:translate-y-[-1px] hover:bg-[#2e49b9]"
      : "border border-[var(--color-border)] bg-white/75 text-[var(--color-text)] hover:border-[var(--color-border-strong)] hover:bg-white",
    className,
  );
}

function renderButton(
  variant: "primary" | "secondary",
  { children, href, className, type = "button", ...props }: ButtonProps,
) {
  const classes = buttonClasses(variant, className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

export function PrimaryButton(props: ButtonProps) {
  return renderButton("primary", props);
}

export function SecondaryButton(props: ButtonProps) {
  return renderButton("secondary", props);
}

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("surface-card", className)} {...props}>
      {children}
    </div>
  );
});

export function MetricCard({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <Card className={cn("p-5", className)}>
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-ink">{value}</p>
    </Card>
  );
}

export function IconTextCard({
  icon,
  title,
  body,
  className,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <Card className={cn("h-full p-6", className)}>
      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white/80">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
    </Card>
  );
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
}: {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <span className="eyebrow">{label}</span>
      <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{description}</p> : null}
    </div>
  );
}
