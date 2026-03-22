import { LocalAppShell } from "@/components/app/local-app-shell";

export default async function ProtectedAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LocalAppShell>{children}</LocalAppShell>
  );
}
