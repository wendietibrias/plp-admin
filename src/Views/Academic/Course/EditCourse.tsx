import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const EditCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

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

  useEffect(() => {
    const saved = localStorage.getItem("courses_data");
    const currentList: CourseTableItem[] = saved
      ? JSON.parse(saved)
      : initialCourseData;
    const itemMatch = currentList.find(
      (c) => c.id.toString() === id?.toString(),
    );

    if (itemMatch) {
      form.setFieldsValue({
        code: itemMatch.code,
        name: itemMatch.name,
        studyProgramId: itemMatch.studyProgramId,
        lectureId: itemMatch.lectureId,
        credit: itemMatch.credit,
        semesterId: itemMatch.semesterId,
        daySequenceInAWeek: itemMatch.daySequenceInAWeek,
        startTime: itemMatch.startTime,
        endTime: itemMatch.endTime,
        type: itemMatch.type,
        status: itemMatch.status,
        description: itemMatch.description,
      });
    } else {
      message.error("Mata kuliah tidak valid atau tidak ditemukan!");
      navigate("/courses");
    }
  }, [id, form, navigate]);

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
        rules: [{ required: true, message: "Wajib dipilih!" }],
      },
      selectProps: { options: mockStudyPrograms, className: "h-10" },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: {
        name: "lectureId",
        label: "Dosen Pengampu",
        rules: [{ required: true, message: "Wajib dipilih!" }],
      },
      selectProps: {
        options: mockLecturers,
        className: "h-10",
        showSearch: true,
        optionFilterProp: "label",
      },
    },
    {
      type: InputType.INPUT_NUMBER,
      columnProps: { xs: 12, md: 8 },
      formItemProps: {
        name: "credit",
        label: "Bobot SKS",
        rules: [{ required: true, message: "SKS wajib diisi!" }],
      },
      inputNumberProps: {
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
        label: "Semester",
        rules: [{ required: true, message: "Semester wajib diisi!" }],
      },
      selectProps: { options: mockSemesters, className: "h-10" },
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
          { required: true, message: "Waktu wajib diisi!" },
          { pattern: /^([01]\d|2[0-3]):([0-5]\d)$/, message: "HH:mm" },
        ],
      },
      inputProps: {
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
          { required: true, message: "Waktu wajib diisi!" },
          { pattern: /^([01]\d|2[0-3]):([0-5]\d)$/, message: "HH:mm" },
        ],
      },
      inputProps: {
        className: "h-10",
        prefix: <ClockCircleOutlined className="text-[#98a2b3]!" />,
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: { name: "type", label: "Jenis Kelas" },
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
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 12 },
      formItemProps: { name: "status", label: "Status Mata Kuliah" },
      selectProps: {
        className: "h-10",
        options: [
          { value: CourseStatusEnum.ACTIVE, label: "ACTIVE" },
          { value: CourseStatusEnum.EXPIRED, label: "EXPIRED" },
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
      textAreaProps: { rows: 3 },
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

      const updatedList = currentList.map((item) => {
        if (item.id.toString() === id?.toString()) {
          return {
            ...item,
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
            status: values.status,
            startTime: values.startTime,
            endTime: values.endTime,
            type: values.type,
            description: values.description || undefined,
          };
        }
        return item;
      });

      localStorage.setItem("courses_data", JSON.stringify(updatedList));
      message.success("Detail kurikulum mata kuliah berhasil diubah!");
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
          Ubah Detail Mata Kuliah
        </Title>
        <Text className="text-sm! text-[#475467]!">
          Sesuaikan kembali bobot sks, ketersediaan kelas kurikulum, atau mutasi
          status operasional mata kuliah.
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

export default EditCourse;
