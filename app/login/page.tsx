import { AuthShell } from "@/components/auth/auth-shell";
import { getCurrentUser } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/app");
  }

  return (
    <AuthShell
      mode="login"
      label="Login"
      title="Access the VaporVault product workspace."
      description="Sign in to review saved cases, track readiness state, and manage recovery operations in one structured system."
      submitLabel="Log In"
      altLabel="New to VaporVault?"
      altHref="/signup"
      altLinkText="Create an account"
      fields={[
        {
          label: "Work Email",
          name: "email",
          type: "email",
          placeholder: "jordan@company.com",
        },
        {
          label: "Password",
          name: "password",
          type: "password",
          placeholder: "Enter your password",
        },
      ]}
    />
  );
}
