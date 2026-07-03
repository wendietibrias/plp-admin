import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Typography, Form, message } from "antd";
import FormPageComponent from "@/Components/FormComponent/FormPageComponent";
import type { FormFieldComponent } from "@/lib/Interfaces/Globals/FormComponent";
import { InputType } from "@/lib/Enums/InputTypeEnum";
import {
  MahasiswaStatus,
  type StudentTableItem,
  initialStudentData,
} from "./Student";

const { Title, Text } = Typography;
const { Content } = Layout;

const EditStudent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const mockStudyPrograms = [
    { value: 1, label: "Teknik Informatika" },
    { value: 2, label: "Sistem Informasi" },
  ];

  const mockClasses = [
    { value: 11, label: "IF-4A" },
    { value: 12, label: "IF-4B" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("students_data");
    const currentList: StudentTableItem[] = saved
      ? JSON.parse(saved)
      : initialStudentData;
    const match = currentList.find((s) => s.id.toString() === id?.toString());

    if (match) {
      form.setFieldsValue({
        nim: match.nim,
        name: match.name,
        email: match.email,
        phone: match.phone,
        studyProgramId: match.studyProgramId,
        classId: match.classId,
        angkatan: match.angkatan,
        gender: match.gender,
        religion: match.religion,
        birthday: match.birthday,
        address: match.address,
        status: match.status,
      });
    } else {
      message.error("Data profil mahasiswa tidak ditemukan!");
      navigate("/students");
    }
  }, [id, form, navigate]);

  const studentFormFields: FormFieldComponent[] = [
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 8 },
      formItemProps: { name: "nim", label: "NIM (Nomor Induk Mahasiswa)" },
      inputProps: { className: "h-10", disabled: true }, // NIM dikunci untuk menjaga konsistensi relasi data backend
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 16 },
      formItemProps: {
        name: "name",
        label: "Nama Lengkap Mahasiswa",
        rules: [{ required: true, message: "Nama lengkap wajib diisi!" }],
      },
      inputProps: { className: "h-10" },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "email",
        label: "Email Institusi Resmi",
        rules: [{ required: true, message: "Email wajib diisi!" }],
      },
      inputProps: { className: "h-10" },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: { name: "phone", label: "Nomor Kontak Handphone" },
      inputProps: { className: "h-10" },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "studyProgramId",
        label: "Program Studi",
        rules: [{ required: true, message: "Wajib diisi!" }],
      },
      selectProps: { className: "h-10", options: mockStudyPrograms },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: { name: "classId", label: "Rombel Kelas Kelas" },
      selectProps: { className: "h-10", options: mockClasses },
    },
    {
      type: InputType.INPUT_NUMBER,
      columnProps: { xs: 12, md: 6 },
      formItemProps: {
        name: "angkatan",
        label: "Tahun Angkatan",
        rules: [{ required: true, message: "Wajib diisi!" }],
      },
      inputNumberProps: { className: "w-full h-10 flex items-center" },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 12, md: 6 },
      formItemProps: { name: "gender", label: "Jenis Kelamin" },
      selectProps: {
        className: "h-10",
        options: [
          { value: "Laki-laki", label: "Laki-laki" },
          { value: "Perempuan", label: "Perempuan" },
        ],
      },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 12, md: 6 },
      formItemProps: { name: "religion", label: "Agama" },
      inputProps: { className: "h-10" },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 12, md: 6 },
      formItemProps: { name: "status", label: "Status Keaktifan" },
      selectProps: {
        className: "h-10",
        options: [
          { value: MahasiswaStatus.AKTIF, label: "AKTIF" },
          { value: MahasiswaStatus.CUTI, label: "CUTI" },
          { value: MahasiswaStatus.LULUS, label: "LULUS" },
          { value: MahasiswaStatus.DROP_OUT, label: "DROP OUT" },
          { value: MahasiswaStatus.MANGKIR, label: "MANGKIR" },
        ],
      },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 24 },
      formItemProps: {
        name: "birthday",
        label: "Tanggal Lahir (Format: YYYY-MM-DD)",
      },
      inputProps: { className: "h-10" },
    },
    {
      type: InputType.TEXT_AREA,
      columnProps: { xs: 24, md: 24 },
      formItemProps: {
        name: "address",
        label: "Alamat Lengkap Rumah Tempat Tinggal",
      },
      textAreaProps: { rows: 3 },
    },
  ];

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const saved = localStorage.getItem("students_data");
      const currentList: StudentTableItem[] = saved
        ? JSON.parse(saved)
        : initialStudentData;

      const updatedList = currentList.map((item) => {
        if (item.id.toString() === id?.toString()) {
          return {
            ...item,
            studyProgramId: values.studyProgramId,
            studyProgram: {
              name:
                values.studyProgramId === 1
                  ? "Teknik Informatika"
                  : "Sistem Informasi",
            },
            classId: values.classId || undefined,
            class: values.classId
              ? { name: values.classId === 11 ? "IF-4A" : "IF-4B" }
              : undefined,
            name: values.name,
            email: values.email,
            phone: values.phone || undefined,
            birthday: values.birthday || undefined,
            address: values.address || undefined,
            religion: values.religion || undefined,
            gender: values.gender || undefined,
            status: values.status,
            angkatan: Number(values.angkatan),
          };
        }
        return item;
      });

      localStorage.setItem("students_data", JSON.stringify(updatedList));
      message.success("Pembaruan data profil mahasiswa berhasil disesuaikan!");
      setTimeout(() => {
        setLoading(false);
        navigate("/students");
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
          Ubah Profil Mahasiswa
        </Title>
        <Text className="text-sm! text-[#475467]!">
          Sesuaikan mutasi status keaktifan akademik mahasiswa atau lakukan
          penyesuaian kelas kelompok rombel belajar.
        </Text>
      </div>

      <FormPageComponent
        formFields={studentFormFields}
        submitLoading={loading}
        onSubmit={handleFormSubmit}
        formSuffix={<div />}
        formProps={{ form }}
      />
    </Content>
  );
};

export default EditStudent;
