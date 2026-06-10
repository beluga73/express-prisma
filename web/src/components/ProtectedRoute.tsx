import { Navigate } from "react-router";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/StoresContext";
import type { ReactNode } from "react";

export const ProtectedRoute = observer(
  ({ children }: { children: ReactNode }) => {
    const { authStore } = useStores();

    if (!authStore.isAuthenticated()) {
      return <Navigate to="/sign-in"></Navigate>;
    }

    return <>{children}</>;
  },
);
