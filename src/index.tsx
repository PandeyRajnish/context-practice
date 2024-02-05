import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProfileFormProvider } from "./context/ProfileFormContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProfileFormProvider>
      <App />
    </ProfileFormProvider>
  </React.StrictMode>
);
