import { NewCaseFlow } from "@/components/app/new-case-flow";
import { hasSupabaseEnv } from "@/lib/auth/env";

export default function NewCasePage() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  return <NewCaseFlow />;
}
