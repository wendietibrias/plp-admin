/**
 * ActionButtonColorEnum
 *
 * This enum defines the color codes for action buttons used in the index view of the application.
 * It provides a centralized way to manage the colors for different actions, ensuring consistency across the UI.
 *
 */
export const ActionButtonColorEnum = {
  DETAIL: "#1890ff",
  EDIT: "#faad14",
  DELETE: "#ff4d4f",

  // Disable
  DISABLED: "#8c8c8c",
};

export type ActionButtonColorEnumType =
  (typeof ActionButtonColorEnum)[keyof typeof ActionButtonColorEnum];
