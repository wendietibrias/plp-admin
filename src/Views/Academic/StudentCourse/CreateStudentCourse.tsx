import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CreateStudentCourse: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Mock Master Data Pilihan Mahasiswa
  const mockStudents = [
    { value: 1, label: "220101032 - Aldo Rivaldi (Teknik Informatika)" },
    { value: 2, label: "220101045 - Rian Sanjaya (Teknik Informatika)" },
  ];

  // Mock Master Data Pilihan Mata Kuliah
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

  const studentCourseFormFields: FormFieldComponent[] = [
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 24 },
      formItemProps: {
        name: "studentId",
        label: "Pilih Mahasiswa Penerima",
        rules: [{ required: true, message: "Mahasiswa wajib dipilih!" }],
      },
      selectProps: {
        placeholder: "Cari berdasarkan NIM atau Nama Mahasiswa",
        className: "h-10",
        showSearch: true,
        options: mockStudents,
        optionFilterProp: "label",
      },
    },
    {
      type: InputType.SELECT,
      columnProps: { xs: 24, md: 24 },
      formItemProps: {
        name: "courseId",
        label: "Pilih Mata Kuliah untuk Diplotting",
        rules: [{ required: true, message: "Mata kuliah wajib ditentukan!" }],
      },
      selectProps: {
        placeholder: "Cari berdasarkan Kode atau Nama Mata Kuliah",
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

      // Cek duplikasi plotting (Mahasiswa tidak boleh mengambil matakuliah yang sama dua kali)
      const isDuplicate = currentList.some(
        (item) =>
          item.studentId === values.studentId &&
          item.courseId === values.courseId,
      );

      if (isDuplicate) {
        message.error(
          "Mahasiswa ini sudah terdaftar mengambil mata kuliah tersebut!",
        );
        setLoading(false);
        return;
      }

      const targetStudent = mockStudents.find(
        (s) => s.value === values.studentId,
      );
      const targetCourse = mockCourses.find((c) => c.value === values.courseId);

      // Ekstrak nama dan nim dari label
      const studentName = targetStudent
        ? targetStudent.label.split(" - ")[1].split(" (")[0]
        : "Unknown";
      const studentNim = targetStudent
        ? targetStudent.label.split(" - ")[0]
        : "000";

      const newStudentCourse: StudentCourseTableItem = {
        id: Date.now(),
        studentId: values.studentId,
        student: {
          nim: studentNim,
          name: studentName,
          angkatan: 2022,
        },
        courseId: values.courseId,
        course: {
          code: targetCourse?.code || "IF000",
          name: targetCourse?.name || "Unknown Course",
          sks: targetCourse?.sks || 3,
          type: targetCourse?.type || "mandatory",
        },
      };

      localStorage.setItem(
        "student_courses_data",
        JSON.stringify([...currentList, newStudentCourse]),
      );
      message.success("Plotting mata kuliah ke dalam KRS mahasiswa berhasil!");
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
          Alokasikan KRS Mahasiswa
        </Title>
        <Text className="text-sm! text-[#475467]!">
          Petakan pengambilan hak beban SKS mata kuliah reguler/pilihan kepada
          berkas kartu studi mahasiswa.
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

export default CreateStudentCourse;
