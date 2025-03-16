import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AppContentProvider } from "./content/AppContent.jsx";
import { CartProvider } from "./Fertilizers/FerCart.jsx"; // ✅ Add this import
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <CartProvider> {/* ✅ Wrap everything inside CartProvider */}
      <AppContentProvider>
        <App />
      </AppContentProvider>
    </CartProvider>
  </BrowserRouter>
);
