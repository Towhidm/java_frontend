import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import "./index.css";
import App from "./App.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollToTop />
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00BBA7",
          colorTextBase: "#000000",
          colorBgBase: "#EBF5F4",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </BrowserRouter>,
);
