import { Navigate } from "react-router";
import { useStores } from "@/stores/StoresContext";
import type { ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { authStore } = useStores();

  if (!authStore.isAuthenticated()) {
    return <Navigate to="/sign-in"></Navigate>;
  }

  return <>{children}</>;
}
