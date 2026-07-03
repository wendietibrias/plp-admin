import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CreateSemester: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const mockSchoolYears = [
    { value: "sy-2425", label: "2024/2025" },
    { value: "sy-2526", label: "2025/2026" },
  ];

  const semesterFormFields: FormFieldComponent[] = [
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "schoolYearId",
        label: "Hubungkan Ke Tahun Ajaran (School Year)",
        rules: [
          { required: true, message: "Kaitan Tahun Ajaran wajib dipilih!" },
        ],
      },
      selectProps: {
        placeholder: "Pilih Tahun Ajaran Induk",
        className: "h-10",
        options: mockSchoolYears,
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "jenis",
        label: "Jenis Klasifikasi Semester",
        rules: [
          { required: true, message: "Jenis semester wajib ditentukan!" },
        ],
      },
      selectProps: {
        placeholder: "Pilih Jenis Semester",
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
        label: "Tanggal Mulai Efektif Perkuliahan",
        rules: [
          { required: true, message: "Batas tanggal mulai wajib diisi!" },
        ],
      },
      inputProps: {
        placeholder: "Format: YYYY-MM-DD (Contoh: 2026-02-15)",
        className: "h-10",
      },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "tanggalSelesai",
        label: "Tanggal Berakhir/Selesai Semester",
        rules: [
          { required: true, message: "Batas tanggal selesai wajib diisi!" },
        ],
      },
      inputProps: {
        placeholder: "Format: YYYY-MM-DD (Contoh: 2026-07-10)",
        className: "h-10",
      },
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

      const newSemester: SemesterTableItem = {
        id: "sem-" + Date.now(),
        jenis: values.jenis,
        tanggalMulai: values.tanggalMulai,
        tanggalSelesai: values.tanggalSelesai,
        schoolYearId: values.schoolYearId,
        schoolYear: { name: selectedYear ? selectedYear.label : "Custom Year" },
      };

      localStorage.setItem(
        "semesters_data",
        JSON.stringify([...currentList, newSemester]),
      );
      message.success(
        "Konfigurasi kalender semester baru berhasil diaktifkan!",
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
          Buka Periode Semester Baru
        </Title>
        <Text className="text-sm! text-[#475467]!">
          Petakan durasi tanggal pelaksanaan operasional perkuliahan mengacu
          pada pedoman kalender akademik kampus.
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

export default CreateSemester;
