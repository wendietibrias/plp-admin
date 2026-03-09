import type { NotificationModel } from "../Types/NotificationTypes";

export type OutletContextModel = {
  openNotification: (notificationDto: NotificationModel) => void;
};
