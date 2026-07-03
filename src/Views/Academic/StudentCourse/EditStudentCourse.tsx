import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Typography, Form, message } from "antd";
import FormPageComponent from "@/Components/FormComponent/FormPageComponent";
import type { FormFieldComponent } from "@/lib/Interfaces/Globals/FormComponent";
import { InputType } from "@/lib/Enums/InputTypeEnum";
import {
  type StudentCourseTableItem,
  initialStudentCourseData,
} from "./StudentCourse";

const { Title, Text } = Typography;
const { Content } = Layout;

const EditStudentCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const mockStudents = [
    { value: 1, label: "220101032 - Aldo Rivaldi (Teknik Informatika)" },
    { value: 2, label: "220101045 - Rian Sanjaya (Teknik Informatika)" },
  ];

  const mockCourses = [
    {
      value: 201,
      label: "IF22401 - Pemrograman Blockchain & Smart Contract (3 SKS)",
      name: "Pemrograman Blockchain & Smart Contract",
      code: "IF22401",
      sks: 3,
      type: "mandatory",
    },
    {
      value: 202,
      label: "IF22402 - Keamanan Jaringan & Kriptografi (3 SKS)",
      name: "Keamanan Jaringan & Kriptografi",
      code: "IF22402",
      sks: 3,
      type: "elective",
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("student_courses_data");
    const currentList: StudentCourseTableItem[] = saved
      ? JSON.parse(saved)
      : initialStudentCourseData;
    const match = currentList.find((sc) => sc.id.toString() === id?.toString());

    if (match) {
      form.setFieldsValue({
        studentId: match.studentId,
        courseId: match.courseId,
      });
    } else {
      message.error("Data alokasi KRS tidak ditemukan!");
      navigate("/student-courses");
    }
  }, [id, form, navigate]);

  const studentCourseFormFields: FormFieldComponent[] = [
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 24 },
      formItemProps: { name: "studentId", label: "Nama Mahasiswa" },
      selectProps: { className: "h-10", options: mockStudents, disabled: true }, // Dikunci agar tidak merusak relasi nama mahasiswa induk
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 24 },
      formItemProps: {
        name: "courseId",
        label: "Ubah Pengambilan Mata Kuliah",
        rules: [
          {
            required: true,
            message: "Mata kuliah pemutakhiran wajib dipilih!",
          },
        ],
      },
      selectProps: {
        placeholder: "Pilih Struktur Mata Kuliah Pengganti",
        className: "h-10",
        showSearch: true,
        options: mockCourses,
        optionFilterProp: "label",
      },
    },
  ];

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const saved = localStorage.getItem("student_courses_data");
      const currentList: StudentCourseTableItem[] = saved
        ? JSON.parse(saved)
        : initialStudentCourseData;

      // Validasi duplikasi jika memindahkan ke matakuliah yang sudah diambil pada id transaksi lain
      const isDuplicate = currentList.some(
        (item) =>
          item.studentId === values.studentId &&
          item.courseId === values.courseId &&
          item.id.toString() !== id?.toString(),
      );

      if (isDuplicate) {
        message.error(
          "Mata kuliah pilihan pengganti sudah ada di dalam list KRS mahasiswa ini!",
        );
        setLoading(false);
        return;
      }

      const targetCourse = mockCourses.find((c) => c.value === values.courseId);

      const updatedList = currentList.map((item) => {
        if (item.id.toString() === id?.toString()) {
          return {
            ...item,
            courseId: values.courseId,
            course: {
              code: targetCourse?.code || "IF000",
              name: targetCourse?.name || "Unknown Course",
              sks: targetCourse?.sks || 3,
              type: targetCourse?.type || "mandatory",
            },
          };
        }
        return item;
      });

      localStorage.setItem("student_courses_data", JSON.stringify(updatedList));
      message.success("Berkas pengalihan mata kuliah mahasiswa diperbarui!");
      setTimeout(() => {
        setLoading(false);
        navigate("/student-courses");
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
          Modifikasi Alokasi Kelas KRS
        </Title>
        <Text className="text-sm! text-[#475467]!">
          Ganti atau sesuaikan entri pengambilan mata kuliah terpilih apabila
          terjadi kesalahan input rombel akademik.
        </Text>
      </div>

      <FormPageComponent
        formFields={studentCourseFormFields}
        submitLoading={loading}
        onSubmit={handleFormSubmit}
        formSuffix={<div />}
        formProps={{ form }}
      />
    </Content>
  );
};

export default EditStudentCourse;
