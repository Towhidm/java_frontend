import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00BBA7", // changes all primary buttons
            colorTextBase: "#000000",
            colorBgBase: "#EBF5F4",
          },
        }}
      >
        {" "}
        <App />
      </ConfigProvider>
    </StrictMode>
  </BrowserRouter>,
);
