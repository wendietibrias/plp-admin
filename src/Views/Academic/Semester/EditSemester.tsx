import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Typography, Form, message } from "antd";
import FormPageComponent from "@/Components/FormComponent/FormPageComponent";
import type { FormFieldComponent } from "@/lib/Interfaces/Globals/FormComponent";
import { InputType } from "@/lib/Enums/InputTypeEnum";
import {
  SemesterYearlyTypeEnum,
  type SemesterTableItem,
  initialSemesterData,
} from "./Semester";

const { Title, Text } = Typography;
const { Content } = Layout;

const EditSemester: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const mockSchoolYears = [
    { value: "sy-2425", label: "2024/2025" },
    { value: "sy-2526", label: "2025/2026" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("semesters_data");
    const currentList: SemesterTableItem[] = saved
      ? JSON.parse(saved)
      : initialSemesterData;
    const match = currentList.find((s) => s.id === id);

    if (match) {
      form.setFieldsValue({
        schoolYearId: match.schoolYearId,
        jenis: match.jenis,
        tanggalMulai: match.tanggalMulai,
        tanggalSelesai: match.tanggalSelesai,
      });
    } else {
      message.error("Data parameter semester tidak ditemukan!");
      navigate("/semesters");
    }
  }, [id, form, navigate]);

  const semesterFormFields: FormFieldComponent[] = [
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "schoolYearId",
        label: "Hubungkan Ke Tahun Ajaran (School Year)",
        rules: [{ required: true, message: "Wajib diisi!" }],
      },
      selectProps: { className: "h-10", options: mockSchoolYears },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "jenis",
        label: "Jenis Klasifikasi Semester",
        rules: [{ required: true, message: "Wajib ditentukan!" }],
      },
      selectProps: {
        className: "h-10",
        options: [
          { value: SemesterYearlyTypeEnum.GANJIL, label: "Semester Ganjil" },
          { value: SemesterYearlyTypeEnum.GENAP, label: "Semester Genap" },
          {
            value: SemesterYearlyTypeEnum.ANTARA,
            label: "Semester Antara (Pendek)",
          },
        ],
      },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "tanggalMulai",
        label: "Tanggal Mulai Efektif",
        rules: [{ required: true, message: "Wajib diisi!" }],
      },
      inputProps: { className: "h-10" },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "tanggalSelesai",
        label: "Tanggal Berakhir/Selesai",
        rules: [{ required: true, message: "Wajib diisi!" }],
      },
      inputProps: { className: "h-10" },
    },
  ];

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const saved = localStorage.getItem("semesters_data");
      const currentList: SemesterTableItem[] = saved
        ? JSON.parse(saved)
        : initialSemesterData;

      const selectedYear = mockSchoolYears.find(
        (y) => y.value === values.schoolYearId,
      );

      const updatedList = currentList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            jenis: values.jenis,
            tanggalMulai: values.tanggalMulai,
            tanggalSelesai: values.tanggalSelesai,
            schoolYearId: values.schoolYearId,
            schoolYear: {
              name: selectedYear ? selectedYear.label : "Custom Year",
            },
          };
        }
        return item;
      });

      localStorage.setItem("semesters_data", JSON.stringify(updatedList));
      message.success(
        "Pembaruan kalender akademik jangka waktu semester berhasil disimpan!",
      );
      setTimeout(() => {
        setLoading(false);
        navigate("/semesters");
      }, 600);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Content className="p-8 pb-10">
      <div className="mb-6">
        <Title level={2} className="m-0! font-bold! text-2xl! text-[#101828]!">
          Ubah Batas Kalender Semester
        </Title>
        <Text className="text-sm! text-[#475467]!">
          Sesuaikan durasi cut-off perpanjangan jadwal kuliah atau masa
          pengisian KRS mahasiswa reguler.
        </Text>
      </div>

      <FormPageComponent
        formFields={semesterFormFields}
        submitLoading={loading}
        onSubmit={handleFormSubmit}
        formSuffix={<div />}
        formProps={{ form }}
      />
    </Content>
  );
};

export default EditSemester;
