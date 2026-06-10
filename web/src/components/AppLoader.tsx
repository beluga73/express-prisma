import { useEffect, type ReactNode } from "react";
import { observer } from "mobx-react-lite";
import { Box, CircularProgress } from "@mui/material";
import { useStores } from "@/stores/StoresContext";

export const AppLoader = observer(({ children }: { children: ReactNode }) => {
  const { authStore } = useStores();

  useEffect(() => {
    authStore.refreshSession();
  }, [authStore]);

  if (authStore.refreshState.loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
});
