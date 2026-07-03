import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CreateStudent: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Mock Relasi Opsi Dropdown Data Master
  const mockStudyPrograms = [
    { value: 1, label: "Teknik Informatika" },
    { value: 2, label: "Sistem Informasi" },
  ];

  const mockClasses = [
    { value: 11, label: "IF-4A" },
    { value: 12, label: "IF-4B" },
  ];

  const studentFormFields: FormFieldComponent[] = [
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 8 },
      formItemProps: {
        name: "nim",
        label: "NIM (Nomor Induk Mahasiswa)",
        rules: [
          { required: true, message: "NIM wajib diisi!" },
          { max: 20, message: "Maksimal 20 karakter!" },
        ],
      },
      inputProps: { placeholder: "Contoh: 220101032", className: "h-10" },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 16 },
      formItemProps: {
        name: "name",
        label: "Nama Lengkap Mahasiswa",
        rules: [
          { required: true, message: "Nama lengkap wajib diisi!" },
          { max: 100, message: "Maksimal 100 karakter!" },
        ],
      },
      inputProps: {
        placeholder: "Masukkan nama sesuai KTP",
        className: "h-10",
      },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "email",
        label: "Email Institusi (@student.univ.ac.id)",
        rules: [
          { required: true, message: "Email wajib diisi!" },
          { type: "email", message: "Format email salah!" },
        ],
      },
      inputProps: {
        placeholder: "username@student.univ.ac.id",
        className: "h-10",
      },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: { name: "phone", label: "Nomor Handphone Kontak Aktif" },
      inputProps: { placeholder: "Contoh: 0812xxxxxxxx", className: "h-10" },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "studyProgramId",
        label: "Program Studi",
        rules: [{ required: true, message: "Program studi wajib dipilih!" }],
      },
      selectProps: {
        placeholder: "Pilih Program Studi",
        className: "h-10",
        options: mockStudyPrograms,
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "classId",
        label: "Alokasi Rombel Kelas Kelas (Opsional)",
      },
      selectProps: {
        placeholder: "Pilih Kelas",
        className: "h-10",
        options: mockClasses,
      },
    },
    {
      type: InputType.INPUT_NUMBER,
      columnProps: { xs: 12, md: 8 },
      formItemProps: {
        name: "angkatan",
        label: "Tahun Angkatan",
        rules: [{ required: true, message: "Tahun angkatan wajib diisi!" }],
      },
      inputNumberProps: {
        placeholder: "Contoh: 2022",
        className: "w-full h-10 flex items-center",
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 12, md: 8 },
      formItemProps: { name: "gender", label: "Jenis Kelamin" },
      selectProps: {
        placeholder: "Pilih Gender",
        className: "h-10",
        options: [
          { value: "Laki-laki", label: "Laki-laki" },
          { value: "Perempuan", label: "Perempuan" },
        ],
      },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 12, md: 8 },
      formItemProps: { name: "religion", label: "Agama" },
      inputProps: { placeholder: "Contoh: Islam", className: "h-10" },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 24 },
      formItemProps: {
        name: "birthday",
        label: "Tanggal Lahir (Format: YYYY-MM-DD)",
      },
      inputProps: { placeholder: "Contoh: 2005-03-07", className: "h-10" },
    },
    {
      type: InputType.TEXT_AREA,
      columnProps: { xs: 24, md: 24 },
      formItemProps: { name: "address", label: "Alamat Domisili Lengkap" },
      textAreaProps: {
        placeholder: "Masukkan alamat asal tempat tinggal...",
        rows: 3,
      },
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

      const newStudent: StudentTableItem = {
        id: Date.now(),
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
        nim: values.nim,
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        birthday: values.birthday || undefined,
        address: values.address || undefined,
        religion: values.religion || undefined,
        gender: values.gender || undefined,
        status: MahasiswaStatus.AKTIF,
        angkatan: Number(values.angkatan),
      };

      localStorage.setItem(
        "students_data",
        JSON.stringify([...currentList, newStudent]),
      );
      message.success("Pendaftaran berkas biodata mahasiswa berhasil!");
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
          Registrasi Mahasiswa Baru
        </Title>
        <Text className="text-sm! text-[#475467]!">
          Masukkan rincian data nomor induk kependidikan mahasiswa untuk
          dialokasikan ke dalam basis data akademik.
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

export default CreateStudent;
