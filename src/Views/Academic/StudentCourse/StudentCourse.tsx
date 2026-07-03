import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Layout,
  Card,
  Table,
  Button,
  Input,
  Select,
  Row,
  Col,
  Typography,
  Tag,
  Popconfirm,
  message,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  BookOutlined,
  UserOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Content } = Layout;
const { Title, Text } = Typography;

// ─── INTERFACES (Safe for erasableSyntaxOnly) ────────────────────────
export interface StudentCourseTableItem {
  id: number;
  studentId: number;
  student: {
    nim: string;
    name: string;
    angkatan: number;
  };
  courseId: number;
  course: {
    code: string;
    name: string;
    sks: number;
    type: string; // mandatory / elective
  };
}

// ─── INITIAL MOCK DATA ───────────────────────────────────────────────
export const initialStudentCourseData: StudentCourseTableItem[] = [
  {
    id: 1,
    studentId: 1,
    student: {
      nim: "220101032",
      name: "Aldo Rivaldi",
      angkatan: 2022,
    },
    courseId: 201,
    course: {
      code: "IF22401",
      name: "Pemrograman Blockchain & Smart Contract",
      sks: 3,
      type: "mandatory",
    },
  },
  {
    id: 2,
    studentId: 1,
    student: {
      nim: "220101032",
      name: "Aldo Rivaldi",
      angkatan: 2022,
    },
    courseId: 202,
    course: {
      code: "IF22402",
      name: "Keamanan Jaringan & Kriptografi",
      sks: 3,
      type: "elective",
    },
  },
  {
    id: 3,
    studentId: 2,
    student: {
      nim: "220101045",
      name: "Rian Sanjaya",
      angkatan: 2022,
    },
    courseId: 201,
    course: {
      code: "IF22401",
      name: "Pemrograman Blockchain & Smart Contract",
      sks: 3,
      type: "mandatory",
    },
  },
];

const StudentCourse: React.FC = () => {
  const navigate = useNavigate();
  const [studentCourses, setStudentCourses] = useState<
    StudentCourseTableItem[]
  >([]);
  const [searchText, setSearchText] = useState("");
  const [courseFilter, setCourseFilter] = useState<string>("ALL");

  useEffect(() => {
    const saved = localStorage.getItem("student_courses_data");
    if (saved) {
      setStudentCourses(JSON.parse(saved));
    } else {
      localStorage.setItem(
        "student_courses_data",
        JSON.stringify(initialStudentCourseData),
      );
      setStudentCourses(initialStudentCourseData);
    }
  }, []);

  const handleDelete = (id: number) => {
    const updated = studentCourses.filter((item) => item.id !== id);
    localStorage.setItem("student_courses_data", JSON.stringify(updated));
    setStudentCourses(updated);
    message.success("Plotting mata kuliah mahasiswa berhasil dihapus!");
  };

  const filteredData = studentCourses.filter((item) => {
    const matchesSearch =
      item.student.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.student.nim.includes(searchText) ||
      item.course.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.course.code.toLowerCase().includes(searchText.toLowerCase());

    const matchesCourse =
      courseFilter === "ALL" || item.courseId.toString() === courseFilter;
    return matchesSearch && matchesCourse;
  });

  // Ambil opsi mata kuliah unik untuk filter dropdown
  const uniqueCourses = Array.from(
    new Map(
      studentCourses.map((item) => [item.courseId, item.course]),
    ).entries(),
  );

  const columns: ColumnsType<StudentCourseTableItem> = [
    {
      title: "MAHASISWA (NIM)",
      key: "student_info",
      render: (_, record) => (
        <div className="flex items-center gap-2.5">
          <UserOutlined className="text-[#1677ff]! text-base! bg-[#e6f4ff]! p-2! rounded-lg!" />
          <div className="flex flex-col">
            <Text className="font-semibold! text-[#101828]! m-0!">
              {record.student.name}
            </Text>
            <span className="text-xs! text-[#667085]! font-mono!">
              NIM: {record.student.nim} (Angkat. {record.student.angkatan})
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "MATA KULIAH DIALOKASIKAN",
      key: "course_info",
      render: (_, record) => (
        <div className="flex items-center gap-2.5">
          <BookOutlined className="text-[#6941c6]! text-base! bg-[#f9f5ff]! p-2! rounded-lg!" />
          <div className="flex flex-col">
            <Text className="font-medium! text-[#344054]! m-0!">
              {record.course.name}
            </Text>
            <span className="text-xs! text-[#667085]! font-mono!">
              Kode: {record.course.code} • <b>{record.course.sks} SKS</b>
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "SIFAT MATKUL",
      dataIndex: ["course", "type"],
      key: "course_type",
      width: 140,
      render: (type: string) => (
        <Tag
          className={`rounded-md! font-medium! text-xs! px-2.5! py-0.5! uppercase! ${
            type === "mandatory"
              ? "bg-[#eff8ff]! text-[#175cd3]! border-[#b2ddff]!"
              : "bg-[#f9f5ff]! text-[#6941c6]! border-[#e9d7fe]!"
          }`}
        >
          {type === "mandatory" ? "Wajib" : "Pilihan"}
        </Tag>
      ),
    },
    {
      title: "AKSI",
      key: "actions",
      width: 110,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button
            type="text"
            icon={<EditOutlined className="text-[#475467]!" />}
            onClick={() => navigate(`/student-courses/${record.id}/edit`)}
            className="hover:bg-[#f2f4f7]! flex items-center justify-center rounded-lg!"
          />
          <Popconfirm
            title="Batalkan Plotting Kelas"
            description="Apakah Anda yakin ingin menghapus matakuliah ini dari KRS mahasiswa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Ya, Hapus"
            cancelText="Batal"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              className="hover:bg-[#fef3f2]! flex items-center justify-center rounded-lg!"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Content className="p-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <Title
            level={2}
            className="m-0! font-bold! text-2xl! text-[#101828]!"
          >
            Kontrol KRS / Plotting Mata Kuliah
          </Title>
          <Text className="text-sm! text-[#475467]!">
            Kelola pendaftaran Rencana Studi (KRS) mahasiswa serta penempatan
            plotting kelas mata kuliah per semester.
          </Text>
        </div>
        <Link to="/student-courses/create">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-[#1677ff]! h-10 font-medium! rounded-lg! flex items-center shadow-sm"
          >
            Plotting KRS Baru
          </Button>
        </Link>
      </div>

      <Card
        bordered={false}
        className="rounded-xl border border-[#eaecf0]! mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] [&_.ant-card-body]:p-4"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={14}>
            <Input
              placeholder="Cari berdasarkan NIM, nama mahasiswa, atau nama mata kuliah..."
              prefix={<SearchOutlined className="text-[#98a2b3]!" />}
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              className="h-10 rounded-lg"
            />
          </Col>
          <Col xs={24} md={10}>
            <Select
              className="w-full h-10"
              placeholder="Filter Spesifik Mata Kuliah"
              defaultValue="ALL"
              onChange={(value) => setCourseFilter(value)}
              options={[
                { value: "ALL", label: "Semua Distribusi Matakuliah" },
                ...uniqueCourses.map(([id, course]) => ({
                  value: id.toString(),
                  label: `${course.code} - ${course.name}`,
                })),
              ]}
              suffixIcon={<FilterOutlined />}
            />
          </Col>
        </Row>
      </Card>

      <Card
        bordered={false}
        className="rounded-xl border border-[#eaecf0]! overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] [&_.ant-card-body]:p-0"
      >
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        />
      </Card>
    </Content>
  );
};

export default StudentCourse;
