import { LogoutAxiosConfig } from "@/lib/Axios/Auth/AuthAxiosConfig";
import { AbilityContext } from "@/lib/Contexts/AbilityContext";
import type { OutletContextModel } from "@/lib/Contexts/OutletContextModel";
import { ActionButtonColorEnum } from "@/lib/Enums/ActionButtonColorEnum";
import { useMenuItems } from "@/lib/Hooks/AdminLayout/UseMenuItems";
import { useSidebarState } from "@/lib/Hooks/AdminLayout/UseSidebarState";
import UseAuthStore from "@/lib/Stores/UseAuthStore";
import type { NotificationModel } from "@/lib/Types/NotificationTypes";
import {
  GenerateBreadcrumbs,
  GetCurrentNavigationName,
  MenuItemHasChildren,
} from "@/Navigations/NavigationUtils";

import {
  ExclamationCircleOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { Ability } from "@casl/ability";
import { useAbility } from "@casl/react";
import {
  App,
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Dropdown,
  Layout,
  Menu,
  Modal,
  Row,
  theme,
  type MenuProps,
} from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function AdminLayout() {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { isAuthenticated, setUserData, userData } = UseAuthStore();
  const ability: Ability = useAbility(AbilityContext);

  const menuItems = useMenuItems(ability);
  const {
    collapsed,
    setCollapsed,
    isSidebarBroken,
    menuOpenKeys,
    currentPath,
    selectedKeys,
    getSiderStyle,
    onMenuItemChange,
    onOpenChange,
    onBreakpoint,
  } = useSidebarState(menuItems);

  const { notification } = App.useApp();

  const handleLogout = async () => {
    Modal.confirm({
      okText: "Ya",
      cancelText: "Tidak",
      okType: "danger",
      centered: true,
      icon: null,

      content: (
        <Row className="flex flex-col gap-1 py-2" gutter={[0, 20]}>
          <Col
            md={24}
            className="justify-center"
            style={{
              display: "flex",
            }}
          >
            <ExclamationCircleOutlined
              style={{
                color: ActionButtonColorEnum.DELETE,
                fontSize: "50px",
              }}
            />
          </Col>
          <Col md={24}>
            <p className=" text-md">
              Sesi Anda akan diakhiri dan Anda akan diarahkan ke halaman login.
            </p>
            <p className=" text-sm">
              Pastikan semua pekerjaan Anda telah tersimpan sebelum keluar.
            </p>
          </Col>
        </Row>
      ),
      footer: (
        <div className="flex flex-col justify-end gap-2">
          <Button onClick={() => Modal.destroyAll()}>Tidak</Button>
          <Button
            type="primary"
            danger
            onClick={async () => {
              Modal.destroyAll();
              await axios(LogoutAxiosConfig);
              setUserData(undefined);
              navigate("/auth/login", { replace: true });
            }}
          >
            Ya, Keluar
          </Button>
        </div>
      ),
    });
  };

  const handleMenuClick = (e: { key: string }) => {
    if (!MenuItemHasChildren(e.key, menuItems)) {
      onMenuItemChange(e.key);
    }
  };

  const UserMenuItems: MenuProps["items"] = [
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const openNotification = (notificationDto: NotificationModel) => {
    const { type, title, message, duration = 4.5 } = notificationDto;
    notification?.[type]?.({
      title: title,
      description: message,
      duration: duration,
      placement: "bottomRight",
    });
  };

  // useEffect(() => {
  //   if (isAuthenticated && !userData) navigate("/auth/login");
  // }, [isAuthenticated, userData]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsed={!isSidebarBroken && collapsed}
        onBreakpoint={onBreakpoint}
        style={getSiderStyle()}
        breakpoint="lg"
        collapsedWidth="0"
        width={220}
      >
        <div className="my-5">
          <h4 className="text-center">{import.meta.env.VITE_APP_NAME}</h4>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          onClick={handleMenuClick}
          selectedKeys={selectedKeys}
          openKeys={menuOpenKeys}
          onOpenChange={onOpenChange}
          style={{
            height: "calc(100vh - 80px)",
            overflowY: "auto",
            border: "none",
          }}
        />
      </Sider>

      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            position: isSidebarBroken ? "sticky" : "static",
            top: 0,
            zIndex: 999,
            boxShadow: isSidebarBroken ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed((prev) => !prev)}
            style={{ fontSize: "16px", width: 64, height: 64, zIndex: 1001 }}
          />
          <div style={{ flex: 1, paddingRight: 24 }}>
            <Title level={4} style={{ margin: 0, color: "#1f2937" }}>
              {GetCurrentNavigationName(currentPath)}
            </Title>
          </div>
          <div style={{ paddingRight: 24 }}>
            <Dropdown
              menu={{ items: UserMenuItems }}
              placement="bottomRight"
              arrow
              trigger={["click"]}
            >
              <div className="flex items-center cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  style={{ marginRight: 8 }}
                />
                <span style={{ color: "#1f2937", fontSize: "14px" }}>
                  {userData?.name || userData?.username || "User"}
                </span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <div
          style={{
            padding: "0 24px 16px 24px",
            background: colorBgContainer,
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Breadcrumb
            items={GenerateBreadcrumbs(currentPath)}
            style={{ fontSize: "14px" }}
          />
        </div>

        <Content
          onClick={() => {
            if (isSidebarBroken && !collapsed) setCollapsed(true);
          }}
          style={{ padding: 12, minHeight: "calc(100vh - 140px)", flex: 1 }}
        >
          <Outlet
            context={
              {
                openNotification,
              } as OutletContextModel
            }
          />
        </Content>
      </Layout>

      {isSidebarBroken && !collapsed && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
            zIndex: 999,
          }}
          onClick={() => setCollapsed(true)}
        />
      )}
    </Layout>
  );
}

export default AdminLayout;
