import { AuthShell } from "@/components/auth/auth-shell";

export default function SignupPage() {
  return (
    <AuthShell
      label="Sign up"
      title="Create a VaporVault workspace."
      description="Set up a new account for your operations, legal, or brand protection team and start structuring recovery cases in a single workflow."
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
