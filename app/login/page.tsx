import { AuthShell } from "@/components/auth/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell
      mode="login"
      label="Login"
      title="Access the VapourltAgent product workspace."
      description="Sign in to review saved cases, track readiness state, and manage recovery operations in one structured system."
      submitLabel="Log In"
      altLabel="New to VapourltAgent?"
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
