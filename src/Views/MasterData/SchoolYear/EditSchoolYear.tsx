import React, { useState, useEffect } from "react";
import { Typography, Spin, message, Layout, Form } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom"; // Atau Next.js router jika menggunakan Next
import FormPageComponent from "@/Components/FormComponent/FormPageComponent";
import type { FormFieldComponent } from "@/lib/Interfaces/Globals/FormComponent";
import { InputType } from "@/lib/Enums/InputTypeEnum";

const { Title, Text } = Typography;
const { Content } = Layout;

const SemesterYearlyTypeEnum = {
  GANJIL: "Ganjil",
  GENAP: "Genap",
} as const;

const EditSchoolYear: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loadingFetch, setLoadingFetch] = useState<boolean>(true);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<any>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchOldData = async () => {
      try {
        setLoadingFetch(true);
        // Simulasi request API (Misal: axios.get(`/api/school-years/${id}`))
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockDataFromBackend = {
          startYear: 2023,
          endYear: 2024,
          semesterType: "GANJIL",
        };

        setInitialData(mockDataFromBackend);
      } catch (error) {
        message.error("Gagal memuat data tahun ajaran");
      } finally {
        setLoadingFetch(false);
      }
    };

    if (id) fetchOldData();
  }, [id]);

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
        min: 2000,
        max: 2100,
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
        min: 2000,
        max: 2100,
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
    setLoadingSubmit(true);

    const values = await form.validateFields();

    const payload = {
      startYear: Number(values.startYear),
      endYear: Number(values.endYear),
      semesterType: values.semesterType,
    };

    console.log(`Mengirim pembaruan untuk ID ${id}:`, payload);

    setTimeout(() => {
      setLoadingSubmit(false);
      message.success("Tahun ajaran berhasil diperbarui!");
      navigate("/school-year");
    }, 1200);
  };

  if (loadingFetch) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <Spin size="large" tip="Memuat data tahun ajaran..." />
      </div>
    );
  }

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
          Edit Tahun Ajaran
        </Title>
        <Text type="secondary" style={{ color: "#475467", fontSize: "14px" }}>
          Ubah detail periode akademik untuk ID #{id}.
        </Text>
      </div>

      <FormPageComponent
        formFields={schoolYearFormFields}
        submitLoading={loadingSubmit}
        onSubmit={handleFormSubmit}
        formSuffix={renderFormSuffix()}
        formProps={{ initialValues: initialData, form }}
      />
    </Content>
  );
};

export default EditSchoolYear;
