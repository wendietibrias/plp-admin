import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Typography, Form, message } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import FormPageComponent from "@/Components/FormComponent/FormPageComponent";
import type { FormFieldComponent } from "@/lib/Interfaces/Globals/FormComponent";
import { InputType } from "@/lib/Enums/InputTypeEnum";
import {
  CourseType,
  CourseStatusEnum,
  type CourseTableItem,
  initialCourseData,
} from "./Course";

const { Title, Text } = Typography;
const { Content } = Layout;

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Mock relasi untuk Select list data
  const mockStudyPrograms = [
    { value: 1, label: "Teknik Informatika" },
    { value: 2, label: "Sistem Informasi" },
  ];
  const mockLecturers = [
    { value: 101, label: "Dr. Eko Prasetyo, M.T." },
    { value: 102, label: "Rina Wijayanti, M.Cs." },
  ];
  const mockSemesters = [
    { value: 4, label: "Semester 4" },
    { value: 5, label: "Semester 5" },
  ];

  const courseFormFields: FormFieldComponent[] = [
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 8 },
      formItemProps: {
        name: "code",
        label: "Kode Mata Kuliah",
        rules: [
          { required: true, message: "Kode wajib diisi!" },
          { max: 20, message: "Maksimal 20 karakter!" },
        ],
      },
      inputProps: { placeholder: "Contoh: IF2604", className: "h-10" },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 24, md: 16 },
      formItemProps: {
        name: "name",
        label: "Nama Mata Kuliah",
        rules: [
          { required: true, message: "Nama wajib diisi!" },
          { max: 150, message: "Maksimal 150 karakter!" },
        ],
      },
      inputProps: {
        placeholder: "Contoh: Pemrograman Blockchain",
        className: "h-10",
      },
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
        name: "lectureId",
        label: "Dosen Pengampu",
        rules: [{ required: true, message: "Dosen pengampu wajib dipilih!" }],
      },
      selectProps: {
        placeholder: "Pilih Dosen Pengampu",
        className: "h-10",
        options: mockLecturers,
        showSearch: true,
        optionFilterProp: "label",
      },
    },
    {
      type: InputType.INPUT_NUMBER,
      columnProps: { xs: 12, md: 8 },
      formItemProps: {
        name: "credit",
        label: "Bobot SKS (Credit)",
        rules: [{ required: true, message: "SKS wajib diisi!" }],
      },
      inputNumberProps: {
        placeholder: "Min: 1",
        min: 1,
        max: 6,
        className: "w-full h-10 flex items-center",
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 12, md: 8 },
      formItemProps: {
        name: "semesterId",
        label: "Semester Penempatan",
        rules: [{ required: true, message: "Semester wajib diisi!" }],
      },
      selectProps: {
        placeholder: "Pilih Semester",
        className: "h-10",
        options: mockSemesters,
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 8 },
      formItemProps: {
        name: "daySequenceInAWeek",
        label: "Hari Kuliah",
        rules: [{ required: true, message: "Hari wajib diisi!" }],
      },
      selectProps: {
        placeholder: "Pilih Hari",
        className: "h-10",
        options: [
          { value: 1, label: "Senin" },
          { value: 2, label: "Selasa" },
          { value: 3, label: "Rabu" },
          { value: 4, label: "Kamis" },
          { value: 5, label: "Jumat" },
          { value: 6, label: "Sabtu" },
          { value: 7, label: "Minggu" },
        ],
      },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 12, md: 6 },
      formItemProps: {
        name: "startTime",
        label: "Jam Mulai",
        rules: [
          { required: true, message: "Waktu mulai wajib diisi!" },
          { pattern: /^([01]\d|2[0-3]):([0-5]\d)$/, message: "Format HH:mm" },
        ],
      },
      inputProps: {
        placeholder: "08:00",
        className: "h-10",
        prefix: <ClockCircleOutlined className="text-[#98a2b3]!" />,
      },
    },
    {
      type: InputType.INPUT,
      columnProps: { xs: 12, md: 6 },
      formItemProps: {
        name: "endTime",
        label: "Jam Selesai",
        rules: [
          { required: true, message: "Waktu selesai wajib diisi!" },
          { pattern: /^([01]\d|2[0-3]):([0-5]\d)$/, message: "Format HH:mm" },
        ],
      },
      inputProps: {
        placeholder: "10:30",
        className: "h-10",
        prefix: <ClockCircleOutlined className="text-[#98a2b3]!" />,
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "type",
        label: "Jenis Kelas (Course Type)",
        initialValue: CourseType.MANDATORY,
      },
      selectProps: {
        className: "h-10",
        options: [
          { value: CourseType.MANDATORY, label: "Wajib (Mandatory)" },
          { value: CourseType.ELECTIVE, label: "Pilihan (Elective)" },
          { value: CourseType.PRACTICUM, label: "Praktikum (Practicum)" },
        ],
      },
    },
    {
      type: InputType.TEXT_AREA,
      columnProps: { xs: 24, md: 24 },
      formItemProps: {
        name: "description",
        label: "Silabus Singkat / Deskripsi (Opsional)",
      },
      textAreaProps: {
        placeholder: "Masukkan deskripsi singkat luaran mata kuliah...",
        rows: 3,
      },
    },
  ];

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const saved = localStorage.getItem("courses_data");
      const currentList: CourseTableItem[] = saved
        ? JSON.parse(saved)
        : initialCourseData;

      const newCourse: CourseTableItem = {
        id: Date.now(),
        programStudiId: values.studyProgramId,
        studyProgramId: values.studyProgramId,
        studyProgram: {
          name:
            values.studyProgramId === 1
              ? "Teknik Informatika"
              : "Sistem Informasi",
        },
        lectureId: values.lectureId,
        lecture: {
          name:
            values.lectureId === 101
              ? "Dr. Eko Prasetyo, M.T."
              : "Rina Wijayanti, M.Cs.",
        },
        code: values.code,
        name: values.name,
        credit: Number(values.credit),
        semesterId: values.semesterId,
        semester: { name: `Semester ${values.semesterId}` },
        daySequenceInAWeek: values.daySequenceInAWeek,
        status: CourseStatusEnum.ACTIVE,
        startTime: values.startTime,
        endTime: values.endTime,
        type: values.type,
        description: values.description || undefined,
      };

      localStorage.setItem(
        "courses_data",
        JSON.stringify([...currentList, newCourse]),
      );
      message.success("Mata kuliah baru berhasil didaftarkan!");
      setTimeout(() => {
        setLoading(false);
        navigate("/courses");
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
          Tambah Mata Kuliah Baru
        </Title>
        <Text className="text-sm! text-[#475467]!">
          Alokasikan entri kode kurikulum baru untuk disinkronkan ke dalam
          rancangan kelas akademik.
        </Text>
      </div>

      <FormPageComponent
        formFields={courseFormFields}
        submitLoading={loading}
        onSubmit={handleFormSubmit}
        formSuffix={<div />}
        formProps={{ form }}
      />
    </Content>
  );
};

export default CreateCourse;
