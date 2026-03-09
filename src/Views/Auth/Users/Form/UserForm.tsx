import FormPageComponent from "@/Components/FormComponent/FormPageComponent";
import useUserFormController from "./UserFormController";

function UserForm() {
  const { UserFormFields, form, handleSubmit } = useUserFormController();

  return (
    <FormPageComponent
      formProps={{
        form,
        layout: "vertical",
      }}
      formFields={UserFormFields}
      onSubmit={() => handleSubmit()}
    />
  );
}

export default UserForm;
