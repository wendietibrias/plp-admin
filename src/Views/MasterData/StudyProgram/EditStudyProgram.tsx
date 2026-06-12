import React, { useState, useEffect } from "react";
import { Typography, Spin, message, Layout, Form } from "antd";
import { TagOutlined, BookOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import FormPageComponent from "@/Components/FormComponent/FormPageComponent";
import type { FormFieldComponent } from "@/lib/Interfaces/Globals/FormComponent";
import { InputType } from "@/lib/Enums/InputTypeEnum";

const { Title, Text } = Typography;
const { Content } = Layout;

const EditStudyProgram: React.FC = () => {
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
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockDataFromBackend = {
          code: "INF",
          name: "Teknik Informatika",
        };

        setInitialData(mockDataFromBackend);

        form.setFieldsValue(mockDataFromBackend);
      } catch (error) {
        message.error("Gagal memuat data program studi");
      } finally {
        setLoadingFetch(false);
      }
    };

    if (id) fetchOldData();
  }, [id, form]);

  const studyProgramFormFields: FormFieldComponent[] = [
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "code",
        label: "Kode Program Studi (Program Code)",
        rules: [
          { required: true, message: "Kode program studi wajib diisi!" },
          {
            max: 50,
            message: "Kode program studi tidak boleh lebih dari 50 karakter",
          },
        ],
      },
      inputProps: {
        placeholder: "Contoh: INF atau SI",
        style: {
          width: "100%",
          height: "40px",
        },
        prefix: <TagOutlined style={{ color: "#98a2b3" }} />,
      },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "name",
        label: "Nama Program Studi (Program Name)",
        rules: [
          { required: true, message: "Nama program studi wajib diisi!" },
          {
            max: 100,
            message: "Nama program studi tidak boleh lebih dari 100 karakter",
          },
        ],
      },
      inputProps: {
        placeholder: "Contoh: Teknik Informatika",
        style: {
          width: "100%",
          height: "40px",
        },
        prefix: <BookOutlined style={{ color: "#98a2b3" }} />,
      },
    },
  ];

  const renderFormSuffix = () => <div></div>;

  const handleFormSubmit = async () => {
    try {
      setLoadingSubmit(true);

      const values = await form.validateFields();

      const payload = {
        code: values.code.trim(),
        name: values.name.trim(),
      };

      console.log(`Mengirim pembaruan program studi untuk ID ${id}:`, payload);

      setTimeout(() => {
        setLoadingSubmit(false);
        message.success("Data program studi berhasil diperbarui!");
        navigate("/study-programs"); // Kembali ke halaman utama daftar program studi
      }, 1200);
    } catch (error) {
      console.error("Validasi gagal:", error);
      setLoadingSubmit(false);
    }
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
        <Spin size="large" tip="Memuat data program studi..." />
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
          Edit Program Studi
        </Title>
        <Text type="secondary" style={{ color: "#475467", fontSize: "14px" }}>
          Ubah detail kode kurikulum departemen atau nama program studi untuk ID
          #{id}.
        </Text>
      </div>

      {/* Form Page Component */}
      <FormPageComponent
        formFields={studyProgramFormFields}
        submitLoading={loadingSubmit}
        onSubmit={handleFormSubmit}
        formSuffix={renderFormSuffix()}
        formProps={{
          initialValues: initialData,
          form,
        }}
      />
    </Content>
  );
};

export default EditStudyProgram;
