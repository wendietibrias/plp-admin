import FormPageComponent from "@/Components/FormComponent/FormPageComponent";
import { Card, Checkbox, Collapse } from "antd";
import useRoleFormController from "./RoleFormController";

function RoleForm() {
  const {
    RoleFormFields,
    form,
    isPermissionsDataFetching,
    PermissionCheckboxCollapseItems,
    handlePermissionChange,
    handleSubmit,
    selectedPermissionIds,
  } = useRoleFormController();
  return (
    <FormPageComponent
      formProps={{ form }}
      formFields={RoleFormFields}
      onSubmit={handleSubmit}
      formSuffix={
        <Card title="Permissions" loading={isPermissionsDataFetching}>
          <Checkbox.Group
            style={{ width: "100%" }}
            value={selectedPermissionIds}
            onChange={handlePermissionChange}
          >
            <Collapse
              className="w-full"
              items={PermissionCheckboxCollapseItems()}
            />
          </Checkbox.Group>
        </Card>
      }
    />
  );
}

export default RoleForm;
