type NotificationType = "success" | "info" | "warning" | "error";

export type NotificationModel = {
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
};
