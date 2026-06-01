import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Firebaseprovider from "./Context/Firebaseprovider.jsx";
import ThemeProvider from "./Context/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <Firebaseprovider>
      <App />
    </Firebaseprovider>
  </ThemeProvider>,
);
