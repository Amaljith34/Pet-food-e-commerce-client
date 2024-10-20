import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./User/Componet/Contexts/Contexts.jsx";
import { Provider } from "react-redux";
import {  storee } from "../Redux/Store/Store.js";
 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <Provider store={storee}>
        <App />
      </Provider>
    </CartProvider>
  </React.StrictMode>
);
