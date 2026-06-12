import React, { useState } from "react";
import { Typography, Form, Layout } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import FormPageComponent from "@/Components/FormComponent/FormPageComponent"; // Sesuaikan dengan path komponen tema Anda
import type { FormFieldComponent } from "@/lib/Interfaces/Globals/FormComponent";
import { InputType } from "@/lib/Enums/InputTypeEnum";

const { Title, Text } = Typography;
const { Content } = Layout;

const CreateSchoolYear: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const SemesterYearlyTypeEnum = {
    GANJIL: "Ganjil",
    GENAP: "Genap",
  } as const;

  const schoolYearFormFields: FormFieldComponent[] = [
    {
      type: InputType.INPUT_NUMBER,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "startYear",
        label: "Tahun Mulai (Start Year)",
        rules: [
          { required: true, message: "Tahun mulai wajib diisi!" },
          { type: "number", message: "Harus berupa angka tahun" },
        ],
      },
      inputNumberProps: {
        placeholder: "Contoh: 2023",
        min: 2020,
        max: 3000,
        style: {
          width: "100%",
          height: "40px",
          display: "flex",
          alignItems: "center",
        },
        prefix: <CalendarOutlined style={{ color: "#98a2b3" }} />,
      },
    },
    {
      type: InputType.INPUT_NUMBER,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "endYear",
        label: "Tahun Selesai (End Year)",
        rules: [
          { required: true, message: "Tahun selesai wajib diisi!" },
          { type: "number", message: "Harus berupa angka tahun" },
        ],
      },
      inputNumberProps: {
        placeholder: "Contoh: 2024",
        min: 2020,
        max: 3000,
        style: {
          width: "100%",
          height: "40px",
          display: "flex",
          alignItems: "center",
        },
        prefix: <CalendarOutlined style={{ color: "#98a2b3" }} />,
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 8 },
      formItemProps: {
        name: "semesterType",
        label: "Tipe Semester",
        rules: [{ required: true, message: "Tipe semester wajib dipilih!" }],
      },
      selectProps: {
        placeholder: "Pilih Semester",
        style: { height: "40px" },
        options: [
          { value: "GANJIL", label: SemesterYearlyTypeEnum.GANJIL },
          { value: "GENAP", label: SemesterYearlyTypeEnum.GENAP },
        ],
      },
    },
  ];

  const renderFormSuffix = () => <div></div>;

  const handleFormSubmit = async () => {
    setLoading(true);

    const values = await form.validateFields();

    const payload = {
      startYear: values.startYear,
      endYear: values.endYear,
      semesterType: values.semesterType,
    };

    console.log("Payload Tahun Baru:", payload);

    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  return (
    <Content style={{ padding: "32px 32px 40px 32px" }}>
      {/* Header Title */}
      <div style={{ marginBottom: "24px" }}>
        <Title
          level={2}
          style={{
            margin: 0,
            fontWeight: 700,
            fontSize: "24px",
            color: "#101828",
          }}
        >
          Tambah Tahun Ajaran
        </Title>
        <Text type="secondary" style={{ color: "#475467", fontSize: "14px" }}>
          Buat periode tahun akademik baru berdasarkan tahun mulai dan tahun
          selesai.
        </Text>
      </div>

      <FormPageComponent
        formFields={schoolYearFormFields}
        submitLoading={loading}
        onSubmit={handleFormSubmit}
        formSuffix={renderFormSuffix()}
        formProps={{ form }}
      />
    </Content>
  );
};

export default CreateSchoolYear;
