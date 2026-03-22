import { AuthShell } from "@/components/auth/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell
      label="Login"
      title="Access your recovery workspace."
      description="Sign in to review case assessments, continue documentation work, and track lawful recovery workflows across your team."
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
