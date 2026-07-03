import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const EditLecture: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const mockStudyPrograms = [
    { value: 1, label: "Teknik Informatika" },
    { value: 2, label: "Sistem Informasi" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("lecturers_data");
    const currentList: LectureTableItem[] = saved
      ? JSON.parse(saved)
      : initialLectureData;
    const match = currentList.find((l) => l.id.toString() === id?.toString());

    if (match) {
      form.setFieldsValue({
        nidn: match.nidn,
        name: match.name,
        email: match.email,
        phone: match.phone,
        studyProgramId: match.studyProgramId,
        expert: match.expert,
        functionalPosition: match.functionalPosition,
        lastEducation: match.lastEducation,
        gender: match.gender,
        birthday: match.birthday,
        address: match.address,
        status: match.status,
      });
    } else {
      message.error("Data dosen tidak ditemukan!");
      navigate("/lecturers");
    }
  }, [id, form, navigate]);

  const lectureFormFields: FormFieldComponent[] = [
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 8 },
      formItemProps: {
        name: "nidn",
        label: "NIDN (Nomor Induk Dosen Nasional)",
        rules: [{ required: true, message: "NIDN wajib diisi!" }],
      },
      inputProps: { className: "h-10", disabled: true }, // NIDN dikunci saat edit demi integritas data
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 16 },
      formItemProps: {
        name: "name",
        label: "Nama Lengkap & Gelar",
        rules: [{ required: true, message: "Nama wajib diisi!" }],
      },
      inputProps: { className: "h-10" },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "email",
        label: "Email Resmi Kampus",
        rules: [{ required: true, message: "Email wajib diisi!" }],
      },
      inputProps: { className: "h-10" },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: { name: "phone", label: "Nomor Handphone" },
      inputProps: { className: "h-10" },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "studyProgramId",
        label: "Homebase Program Studi",
        rules: [{ required: true, message: "Wajib diisi!" }],
      },
      selectProps: { className: "h-10", options: mockStudyPrograms },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: { name: "expert", label: "Bidang Kepakaran / Keahlian" },
      inputProps: { className: "h-10" },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 12, md: 6 },
      formItemProps: {
        name: "functionalPosition",
        label: "Jabatan Fungsional",
      },
      selectProps: {
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
      columnProps: { xs: 12, md: 6 },
      formItemProps: { name: "lastEducation", label: "Pendidikan Terakhir" },
      selectProps: {
        className: "h-10",
        options: [
          { value: PendidikanTerakhir.S2, label: "Magister (S2)" },
          { value: PendidikanTerakhir.S3, label: "Doktor (S3)" },
        ],
      },
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
      type: InputType.SELECT,
      columnProps: { xs: 12, md: 6 },
      formItemProps: { name: "status", label: "Status Keaktifan" },
      selectProps: {
        className: "h-10",
        options: [
          { value: DosenStatus.AKTIF, label: "Aktif" },
          { value: DosenStatus.NONAKTIF, label: "Non-Aktif" },
          { value: DosenStatus.CUTI, label: "Cuti" },
          { value: DosenStatus.PENSIUN, label: "Pensiun" },
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
      formItemProps: { name: "address", label: "Alamat Rumah Tinggal" },
      textAreaProps: { rows: 3 },
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
            name: values.name,
            email: values.email,
            phone: values.phone || undefined,
            birthday: values.birthday || undefined,
            address: values.address || undefined,
            gender: values.gender || undefined,
            functionalPosition: values.functionalPosition || undefined,
            lastEducation: values.lastEducation || undefined,
            expert: values.expert || undefined,
            status: values.status,
          };
        }
        return item;
      });

      localStorage.setItem("lecturers_data", JSON.stringify(updatedList));
      message.success("Berkas rekam medis profil dosen berhasil disesuaikan!");
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
          Ubah Berkas Profil Dosen
        </Title>
        <Text className="text-sm! text-[#475467]!">
          Mutasikan penugasan kepangkatan akademik dosen atau sesuaikan status
          operasional aktivitas dinas mengajar.
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

export default EditLecture;
