import { App as AntdApp, ConfigProvider } from "antd";
import idID from "antd/es/locale/id_ID";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    locale={idID}
    theme={{
      token: {
        colorPrimary: "#002140",
      },
    }}
  >
    <AntdApp>
      <App />
    </AntdApp>
  </ConfigProvider>,
);
