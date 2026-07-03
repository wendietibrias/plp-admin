import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Typography, Form, message } from "antd";
import FormPageComponent from "@/Components/FormComponent/FormPageComponent";
import type { FormFieldComponent } from "@/lib/Interfaces/Globals/FormComponent";
import { InputType } from "@/lib/Enums/InputTypeEnum";
import {
  JabatanFungsional,
  PendidikanTerakhir,
  DosenStatus,
  type LectureTableItem,
  initialLectureData,
} from "./Lecture";

const { Title, Text } = Typography;
const { Content } = Layout;

const CreateLecture: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const mockStudyPrograms = [
    { value: 1, label: "Teknik Informatika" },
    { value: 2, label: "Sistem Informasi" },
  ];

  const lectureFormFields: FormFieldComponent[] = [
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 8 },
      formItemProps: {
        name: "nidn",
        label: "NIDN (Nomor Induk Dosen Nasional)",
        rules: [
          { required: true, message: "NIDN wajib diisi!" },
          { max: 20, message: "Maksimal 20 karakter!" },
        ],
      },
      inputProps: { placeholder: "Masukkan NIDN", className: "h-10" },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 16 },
      formItemProps: {
        name: "name",
        label: "Nama Lengkap & Gelar",
        rules: [
          { required: true, message: "Nama lengkap wajib diisi!" },
          { max: 100, message: "Maksimal 100 karakter!" },
        ],
      },
      inputProps: {
        placeholder: "Contoh: Dr. Aldo Rivaldi, M.T.",
        className: "h-10",
      },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "email",
        label: "Email Resmi Kampus",
        rules: [
          { required: true, message: "Email wajib diisi!" },
          { type: "email", message: "Format email tidak valid!" },
        ],
      },
      inputProps: { placeholder: "username@univ.ac.id", className: "h-10" },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: { name: "phone", label: "Nomor Handphone (WhatsApp)" },
      inputProps: { placeholder: "Contoh: 0812xxxx", className: "h-10" },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "studyProgramId",
        label: "Homebase Program Studi",
        rules: [{ required: true, message: "Program studi wajib dipilih!" }],
      },
      selectProps: {
        placeholder: "Pilih Program Studi",
        className: "h-10",
        options: mockStudyPrograms,
      },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: { name: "expert", label: "Bidang Kepakaran / Keahlian" },
      inputProps: {
        placeholder: "Contoh: Kriptografi, Cloud Computing",
        className: "h-10",
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 12, md: 8 },
      formItemProps: {
        name: "functionalPosition",
        label: "Jabatan Fungsional",
      },
      selectProps: {
        placeholder: "Pilih Jabatan",
        className: "h-10",
        options: [
          { value: JabatanFungsional.ASISTEN_AHLI, label: "Asisten Ahli" },
          { value: JabatanFungsional.LEKTOR, label: "Lektor" },
          { value: JabatanFungsional.LEKTOR_KEPALA, label: "Lektor Kepala" },
          { value: JabatanFungsional.GURU_BESAR, label: "Guru Besar" },
        ],
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 12, md: 8 },
      formItemProps: { name: "lastEducation", label: "Pendidikan Terakhir" },
      selectProps: {
        placeholder: "Pilih Strata",
        className: "h-10",
        options: [
          { value: PendidikanTerakhir.S2, label: "Magister (S2)" },
          { value: PendidikanTerakhir.S3, label: "Doktor (S3)" },
        ],
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 8 },
      formItemProps: { name: "gender", label: "Jenis Kelamin" },
      selectProps: {
        placeholder: "Pilih Jenis Kelamin",
        className: "h-10",
        options: [
          { value: "Laki-laki", label: "Laki-laki" },
          { value: "Perempuan", label: "Perempuan" },
        ],
      },
    },
    {
      type: InputType.INPUT, // Diganti input string biasa demi kestabilan sinkronisasi state format lokal
      columnProps: { xs: 24, md: 24 },
      formItemProps: {
        name: "birthday",
        label: "Tanggal Lahir (Format: YYYY-MM-DD)",
      },
      inputProps: { placeholder: "Contoh: 1988-05-14", className: "h-10" },
    },
    {
      type: InputType.TEXT_AREA,
      columnProps: { xs: 24, md: 24 },
      formItemProps: { name: "address", label: "Alamat Rumah Tinggal" },
      textAreaProps: {
        placeholder: "Tulis alamat domisili lengkap saat ini...",
        rows: 3,
      },
    },
  ];

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const saved = localStorage.getItem("lecturers_data");
      const currentList: LectureTableItem[] = saved
        ? JSON.parse(saved)
        : initialLectureData;

      const newLecture: LectureTableItem = {
        id: Date.now(),
        studyProgramId: values.studyProgramId,
        studyProgram: {
          name:
            values.studyProgramId === 1
              ? "Teknik Informatika"
              : "Sistem Informasi",
        },
        nidn: values.nidn,
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        birthday: values.birthday || undefined,
        address: values.address || undefined,
        gender: values.gender || undefined,
        functionalPosition: values.functionalPosition || undefined,
        lastEducation: values.lastEducation || undefined,
        expert: values.expert || undefined,
        status: DosenStatus.AKTIF,
      };

      localStorage.setItem(
        "lecturers_data",
        JSON.stringify([...currentList, newLecture]),
      );
      message.success("Profil dosen baru berhasil disimpan ke sistem!");
      setTimeout(() => {
        setLoading(false);
        navigate("/lecturers");
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
          Registrasi Profil Dosen Baru
        </Title>
        <Text className="text-sm! text-[#475467]!">
          Daftarkan entri NIDN dan kualifikasi fungsional berkas kepegawaian
          dosen pengampu.
        </Text>
      </div>

      <FormPageComponent
        formFields={lectureFormFields}
        submitLoading={loading}
        onSubmit={handleFormSubmit}
        formSuffix={<div />}
        formProps={{ form }}
      />
    </Content>
  );
};

export default CreateLecture;
