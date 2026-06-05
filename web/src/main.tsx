import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { RootStore } from "./stores/RootStore";
import { StoresContext } from "./stores/StoresContext";
import { ThemeProvider } from "@/theme/ThemeContext";

// eslint-disable-next-line react-refresh/only-export-components
function Main() {
  const [rootStore] = useState(() => new RootStore());

  return (
    <StrictMode>
      <ThemeProvider>
        <StoresContext value={rootStore.getStores()}>
          <App />
        </StoresContext>
      </ThemeProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);
