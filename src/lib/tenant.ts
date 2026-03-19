import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "./prisma";

export async function getTenantId(): Promise<string> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.tenantId) {
    throw new Error("Non authentifié");
  }
  return session.user.tenantId;
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }
  return session.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Non authentifié");
  }
  return user;
}

export async function requireRole(roles: string[]) {
  const user = await requireAuth();
  if (!roles.includes(user.role)) {
    throw new Error("Accès non autorisé");
  }
  return user;
}
