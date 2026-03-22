import { AuthShell } from "@/components/auth/auth-shell";

export default function SignupPage() {
  return (
    <AuthShell
      mode="signup"
      label="Sign up"
      title="Create a VaporVault workspace."
      description="Create an account for your operations, legal, or brand protection team and start running case intake, readiness scoring, and progression in one platform."
      submitLabel="Sign Up"
      altLabel="Already have an account?"
      altHref="/login"
      altLinkText="Log in"
      fields={[
        {
          label: "Full Name",
          name: "name",
          placeholder: "Jordan Lee",
        },
        {
          label: "Work Email",
          name: "email",
          type: "email",
          placeholder: "jordan@company.com",
        },
        {
          label: "Company",
          name: "company",
          placeholder: "Vapor Labs Ltd",
        },
        {
          label: "Password",
          name: "password",
          type: "password",
          placeholder: "Create a password",
        },
      ]}
    />
  );
}
