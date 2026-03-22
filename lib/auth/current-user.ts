import { getSessionPayload } from "@/lib/auth/session";
import { findUserById } from "@/lib/db/users";

export async function getCurrentUser() {
  const session = await getSessionPayload();

  if (!session) {
    return null;
  }

  return findUserById(session.userId);
}
