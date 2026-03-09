import type { OutletContextModel } from "@/lib/Contexts/OutletContextModel";
import type { NotificationModel } from "@/lib/Types/NotificationTypes";
import { App, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UseAuthStore from "../lib/Stores/UseAuthStore";

function AuthLayout() {
  const location = useLocation();
  const { isAuthenticated, userData } = UseAuthStore();
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const openNotification = (notificationDto: NotificationModel) => {
    const { type, title, message, duration = 4.5 } = notificationDto;
    notification?.[type]?.({
      title: title,
      description: message,
      duration: duration,
      placement: "bottomRight",
    });
  };

  useEffect(() => {
    if (isAuthenticated && userData) navigate("/");
  }, [isAuthenticated, userData]);

  return (
    <Layout className="w-full">
      <Content>
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
        >
          <Outlet
            context={
              {
                openNotification,
              } as OutletContextModel
            }
          />
        </motion.div>
      </Content>
    </Layout>
  );
}

export default AuthLayout;
