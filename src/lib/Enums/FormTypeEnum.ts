export const FormType = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  DETAIL: "DETAIL",
};

export type FormType = (typeof FormType)[keyof typeof FormType];
