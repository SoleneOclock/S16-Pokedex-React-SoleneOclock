// BrowserRouter est un composant de react-router-dom
// il doit "englober" tous nos composants : on le place autours de App
import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
