import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RootStore } from "./stores/root.ts";
import { StoresContext } from "./stores/rootContext.tsx";

function Main() {
  const [rootStore] = useState(() => new RootStore());

  return (
    <StrictMode>
      <StoresContext value={rootStore.getStores()}>
        <App />
      </StoresContext>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);
