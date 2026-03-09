import { HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  NavigationKeyEnum,
  type NavigationKeyEnumType,
} from "./NavigationEnum";

export const GetCurrentNavigationName = (path: string): string => {
  const segment: NavigationKeyEnumType = path.split("/").filter(Boolean)[0];
  return (
    NavigationKeyEnum[segment as keyof typeof NavigationKeyEnum] || "Dashboard"
  );
};

export const FindSelectedKey = (
  items: MenuProps["items"],
  targetSegment: string,
): string | null => {
  if (!items) return null;

  for (const item of items) {
    if (!item || typeof item !== "object" || "type" in item) continue;

    const menuItem = item as any;

    // Direct match
    if (
      menuItem.key === targetSegment ||
      menuItem.key === `/${targetSegment}`
    ) {
      return menuItem.key;
    }

    // Search in children
    if (menuItem.children) {
      const found = FindSelectedKey(menuItem.children, targetSegment);
      if (found) return found;
    }
  }

  return null;
};

// Recursively find all parent keys for a selected item
export const FindOpenKeys = (
  items: MenuProps["items"],
  targetKey: string,
  parentKeys: string[] = [],
): string[] => {
  if (!items) return [];

  for (const item of items) {
    if (!item || typeof item !== "object" || "type" in item) continue;

    const menuItem = item as any;

    // Found the target
    if (menuItem.key === targetKey) {
      return parentKeys;
    }

    // Search in children
    if (menuItem.children) {
      const result = FindOpenKeys(menuItem.children, targetKey, [
        ...parentKeys,
        menuItem.key,
      ]);

      if (result.length > 0) {
        return result;
      }

      // Check if any direct child matches
      const hasDirectChild = menuItem.children.some(
        (child: any) => child && child.key === targetKey,
      );

      if (hasDirectChild) {
        return [...parentKeys, menuItem.key];
      }
    }
  }

  return [];
};

export const GenerateBreadcrumbs = (path: string) => {
  const segments = path.split("/").filter(Boolean);
  const crumbs = [
    {
      title: (
        <Link to="/">
          <HomeOutlined />
        </Link>
      ),
    },
  ];

  let built = "";
  segments.forEach((segment, index) => {
    built += `/${segment}`;
    const isLast = index === segments.length - 1;
    crumbs.push({
      title: (
        <Link to={isLast ? "#" : built}>
          {segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ")}
        </Link>
      ),
    });
  });

  return crumbs;
};

export const MenuItemHasChildren = (
  key: string,
  items: MenuProps["items"],
): boolean => {
  if (!items) return false;
  for (const item of items) {
    if (!item || ("type" in item && item.type === "divider")) continue;
    const m = item as any;
    if (m.key === key) return !!m.children?.length;
    if (m.children && MenuItemHasChildren(key, m.children)) return true;
  }
  return false;
};
