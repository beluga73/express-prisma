import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import Home from "@/routes/home";
import SignUp from "@/routes/sign-up";
import SignIn from "@/routes/sign-in";
import { RootStore } from "@/stores/RootStore";
import { StoresContext } from "@/stores/StoresContext";
import { ThemeProvider } from "@/theme/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { GuestRoute } from "@/components/GuestRoute";
import { AppLoader } from "@/components/AppLoader";

// eslint-disable-next-line react-refresh/only-export-components
function Main() {
  const [rootStore] = useState(() => new RootStore());

  return (
    <StrictMode>
      <ThemeProvider>
        <StoresContext value={rootStore.getStores()}>
          <AppLoader>
            <BrowserRouter>
              <Routes>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sign-up"
                  element={
                    <GuestRoute>
                      <SignUp />
                    </GuestRoute>
                  }
                />
                <Route
                  path="/sign-in"
                  element={
                    <GuestRoute>
                      <SignIn />
                    </GuestRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </AppLoader>
        </StoresContext>
      </ThemeProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);
