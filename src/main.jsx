import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Firebaseprovider from "./Context/Firebaseprovider.jsx";

createRoot(document.getElementById("root")).render(
  <Firebaseprovider>
    <App />
  </Firebaseprovider>,
);
