import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./Store";   // ✅ Import store

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>   {/* ✅ Pass store here */}
      <App />
    </Provider>
  </StrictMode>
);

