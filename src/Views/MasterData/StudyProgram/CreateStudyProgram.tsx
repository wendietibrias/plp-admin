import React, { useState } from "react";
import { Typography, Form, Row, Col } from "antd";
import {
  TagOutlined,
  BookOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import FormPageComponent from "@/Components/FormComponent/FormPageComponent";
import type { FormFieldComponent } from "@/lib/Interfaces/Globals/FormComponent";
import { InputType } from "@/lib/Enums/InputTypeEnum";

const { Title, Text } = Typography;

const CreateStudyProgram: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

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

  const renderFormSuffix = () => (
    <Row gutter={[24, 24]} style={{ margin: "8px 0 24px 0" }}>
      <Col span={24}>
        <div
          style={{
            backgroundColor: "#edf5ff",
            border: "1px solid #d6e4ff",
            borderRadius: "12px",
            padding: "16px 20px",
            display: "flex",
            gap: "12px",
          }}
        >
          <InfoCircleOutlined
            style={{ color: "#1677ff", fontSize: "18px", marginTop: "2px" }}
          />
          <div>
            <div
              style={{
                fontWeight: 700,
                color: "#004085",
                fontSize: "14px",
                marginBottom: "4px",
              }}
            >
              Aturan Kode Program Studi
            </div>
            <div
              style={{ color: "#2b5a9e", fontSize: "13px", lineHeight: "1.5" }}
            >
              Pastikan <strong>Kode Program Studi</strong> yang Anda masukkan
              sesuai dengan penomoran resmi penomoran kurikulum departemen. Kode
              unik prodi ini nantinya akan memengaruhi struktur awal pembuatan
              format otomatis <strong>Nomor Induk Mahasiswa (NIM)</strong>.
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );

  const handleFormSubmit = async () => {
    try {
      setLoading(true);

      // Validasi field antd form
      const values = await form.validateFields();

      const payload = {
        code: values.code.trim(),
        name: values.name.trim(),
      };

      console.log("Payload Program Studi Baru:", payload);

      // Simulasi request kirim data ke API backend
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Reset form field setelah berhasil disimpan
      form.resetFields();
    } catch (error) {
      console.error("Validasi gagal atau error API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "32px 32px 40px 32px" }}>
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
          Tambah Program Studi
        </Title>
        <Text type="secondary" style={{ color: "#475467", fontSize: "14px" }}>
          Buat master data departemen / program studi baru untuk keperluan
          manajemen kurikulum pendidikan.
        </Text>
      </div>

      {/* Form Page Component */}
      <FormPageComponent
        formFields={studyProgramFormFields}
        submitLoading={loading}
        onSubmit={handleFormSubmit}
        formSuffix={renderFormSuffix()}
        formProps={{ form }}
      />
    </div>
  );
};

export default CreateStudyProgram;
