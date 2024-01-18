import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <PrimeReactProvider value={{ unstyled: false, pt: {} }}>
        <App />
      </PrimeReactProvider>
    </AuthProvider>
  </BrowserRouter>
);
