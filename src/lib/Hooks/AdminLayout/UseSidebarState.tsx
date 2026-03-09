import { FindOpenKeys, FindSelectedKey } from "@/Navigations/NavigationUtils";
import type { ItemType } from "antd/es/menu/interface";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useSidebarState = (menuItems: ItemType[]) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarBroken, setIsSidebarBroken] = useState(false);
  const [menuOpenKeys, setMenuOpenKeys] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const selectedKeys = useMemo(() => {
    const segments = currentPath.split("/").filter(Boolean);
    if (!segments.length) return [""];
    const key = FindSelectedKey(menuItems, segments[0]);
    return key ? [key] : [];
  }, [currentPath, menuItems]);

  const calculatedOpenKeys = useMemo(() => {
    const segments = currentPath.split("/").filter(Boolean);
    if (!segments.length) return [];
    const key = FindSelectedKey(menuItems, segments[0]);
    return key ? FindOpenKeys(menuItems, key) : [];
  }, [currentPath, menuItems]);

  useEffect(() => {
    setMenuOpenKeys((prev) => {
      const merged = [...new Set([...prev, ...calculatedOpenKeys])];
      if (JSON.stringify(prev.sort()) === JSON.stringify(merged.sort()))
        return prev;
      return merged;
    });
  }, [calculatedOpenKeys]);

  const getSiderStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      overflow: "hidden",
      overflowY: "auto",
      scrollbarWidth: "thin",
      scrollbarGutter: "stable",
    };

    return isSidebarBroken
      ? {
          ...base,
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          zIndex: 1000,
          transform: collapsed ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.2s ease-in-out",
        }
      : { ...base, position: "sticky", top: 0, height: "100vh" };
  };

  const onMenuItemChange = (key?: string) => {
    if (key) navigate(key);
    if (isSidebarBroken && !collapsed) {
      setTimeout(() => setCollapsed(true), 200);
    }
  };

  const onOpenChange = (keys: string[]) => setMenuOpenKeys(keys);

  const onBreakpoint = (broken: boolean) => {
    setCollapsed(broken);
    setIsSidebarBroken(broken);
  };

  return {
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
  };
};
