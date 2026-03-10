import { ActionButtonColorEnum } from "@/lib/Enums/ActionButtonColorEnum";
import type { BaseModel } from "@/lib/Interfaces/Globals/BaseModel";
import {
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import {
  Button,
  Popconfirm,
  type ButtonProps,
  type PopconfirmProps,
} from "antd";
import { Link } from "react-router-dom";

interface ActionButtonComponentProps<T extends BaseModel> {
  detailProps?: { buttonProps?: ButtonProps; link?: string };
  editProps?: { buttonProps?: ButtonProps; link?: string };
  deleteProps?: {
    buttonProps?: ButtonProps;
    popConfirmProps: PopconfirmProps;
  };
  record: T;
  additionalActionButtons?: React.ReactNode;
}

function ActionButtonComponent<T extends BaseModel>({
  detailProps,
  editProps,
  deleteProps,
  record,
  additionalActionButtons,
}: ActionButtonComponentProps<T>) {
  return (
    <>
      {!!detailProps && (
        <Link to={detailProps?.link || `./${record.id}`}>
          <Button
            type="text"
            icon={
              <FileTextOutlined
                style={{ color: ActionButtonColorEnum.DETAIL }}
              />
            }
            {...detailProps.buttonProps}
          />
        </Link>
      )}
      {editProps && (
        <Link to={editProps?.link || `./${record.id}/edit`}>
          <Button
            type="text"
            icon={
              <EditOutlined style={{ color: ActionButtonColorEnum.EDIT }} />
            }
            {...editProps.buttonProps}
          />
        </Link>
      )}
      {!!deleteProps && (
        <Popconfirm {...deleteProps?.popConfirmProps}>
          <Button
            type="text"
            icon={
              <DeleteOutlined style={{ color: ActionButtonColorEnum.DELETE }} />
            }
            {...deleteProps?.buttonProps}
          />
        </Popconfirm>
      )}
      {additionalActionButtons}
    </>
  );
}
export default ActionButtonComponent;
