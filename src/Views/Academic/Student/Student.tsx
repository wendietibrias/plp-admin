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
  Avatar,
  message,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  FilterOutlined,
  IdcardOutlined,
  MailOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Content } = Layout;
const { Title, Text } = Typography;

// ─── ENUMS & INTERFACES (Aman untuk erasableSyntaxOnly) ───────────────
export const MahasiswaStatus = {
  AKTIF: "aktif",
  CUTI: "cuti",
  LULUS: "lulus",
  DROP_OUT: "drop out",
  MANGKIR: "mangkir",
} as const;
export type MahasiswaStatus =
  (typeof MahasiswaStatus)[keyof typeof MahasiswaStatus];

export interface StudentTableItem {
  id: number;
  studyProgramId: number;
  studyProgram: { name: string };
  classId?: number;
  class?: { name: string };
  nim: string;
  name: string;
  email: string;
  phone?: string;
  birthday?: string;
  address?: string;
  religion?: string;
  gender?: string;
  status: MahasiswaStatus;
  angkatan: number;
  picture?: string;
}

// ─── INITIAL MOCK DATA ───────────────────────────────────────────────
export const initialStudentData: StudentTableItem[] = [
  {
    id: 1,
    studyProgramId: 1,
    studyProgram: { name: "Teknik Informatika" },
    classId: 11,
    class: { name: "IF-4A" },
    nim: "220101032",
    name: "Aldo Rivaldi",
    email: "aldo.rivaldi@student.univ.ac.id",
    phone: "081298765432",
    birthday: "2005-03-07",
    address: "Pontianak, Kalimantan Barat",
    religion: "Islam",
    gender: "Laki-laki",
    status: MahasiswaStatus.AKTIF,
    angkatan: 2022,
  },
  {
    id: 2,
    studyProgramId: 1,
    studyProgram: { name: "Teknik Informatika" },
    classId: 12,
    class: { name: "IF-4B" },
    nim: "220101045",
    name: "Rian Sanjaya",
    email: "rian.sanjaya@student.univ.ac.id",
    phone: "085645321098",
    birthday: "2004-11-23",
    address: "Kota Bandung, Jawa Barat",
    religion: "Kristen",
    gender: "Laki-laki",
    status: MahasiswaStatus.AKTIF,
    angkatan: 2022,
  },
];

const Student: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentTableItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    const saved = localStorage.getItem("students_data");
    if (saved) {
      setStudents(JSON.parse(saved));
    } else {
      localStorage.setItem("students_data", JSON.stringify(initialStudentData));
      setStudents(initialStudentData);
    }
  }, []);

  const handleDelete = (id: number) => {
    const updated = students.filter((item) => item.id !== id);
    localStorage.setItem("students_data", JSON.stringify(updated));
    setStudents(updated);
    message.success("Data mahasiswa berhasil dihapus!");
  };

  const filteredData = students.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.nim.includes(searchText) ||
      item.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: ColumnsType<StudentTableItem> = [
    {
      title: "MAHASISWA",
      key: "student_profile",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            size={40}
            src={record.picture}
            icon={<UserOutlined />}
            className="bg-[#1677ff]! flex items-center justify-center shrink-0!"
          />
          <div className="flex flex-col">
            <Text className="font-semibold! text-[#101828]! m-0!">
              {record.name}
            </Text>
            <span className="text-xs! text-[#1677ff]! font-mono! font-medium! flex items-center gap-1">
              <IdcardOutlined /> {record.nim}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "PRODI & KELAS",
      key: "academic_info",
      render: (_, record) => (
        <div className="flex flex-col">
          <Text className="text-sm! text-[#344054]! font-medium!">
            {record.studyProgram.name}
          </Text>
          <span className="text-xs! text-[#667085]!">
            Kelas:{" "}
            <b className="text-[#344054]!">{record.class?.name || "-"}</b> •
            Angkatan {record.angkatan}
          </span>
        </div>
      ),
    },
    {
      title: "KONTAK",
      key: "contact_info",
      render: (_, record) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-xs! text-[#475467]! flex items-center gap-1">
            <MailOutlined className="text-[#98a2b3]!" /> {record.email}
          </span>
          {record.phone && (
            <span className="text-xs! text-[#667085]! pl-4">
              {record.phone}
            </span>
          )}
        </div>
      ),
    },
    {
      title: "STATUS AKADEMIK",
      dataIndex: "status",
      key: "status",
      render: (status: MahasiswaStatus) => {
        const colorMap = {
          [MahasiswaStatus.AKTIF]:
            "bg-[#ecfdf3]! text-[#12b76a]! border-[#abefc6]!",
          [MahasiswaStatus.CUTI]:
            "bg-[#fffaeb]! text-[#f79009]! border-[#feedd0]!",
          [MahasiswaStatus.LULUS]:
            "bg-[#eff8ff]! text-[#175cd3]! border-[#b2ddff]!",
          [MahasiswaStatus.DROP_OUT]:
            "bg-[#fef3f2]! text-[#f04438]! border-[#fee4e2]!",
          [MahasiswaStatus.MANGKIR]:
            "bg-[#f8f9fa]! text-[#344054]! border-[#d0d5dd]!",
        };
        return (
          <Tag
            className={`rounded-xl! font-semibold! text-xs! px-2.5! py-0.5! uppercase! ${colorMap[status]}`}
          >
            {status}
          </Tag>
        );
      },
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
            onClick={() => navigate(`/students/${record.id}/edit`)}
            className="hover:bg-[#f2f4f7]! flex items-center justify-center rounded-lg!"
          />
          <Popconfirm
            title="Hapus Data Mahasiswa"
            description="Apakah Anda yakin ingin menghapus data mahasiswa ini?"
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
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <Title
            level={2}
            className="m-0! font-bold! text-2xl! text-[#101828]!"
          >
            Manajemen Data Mahasiswa
          </Title>
          <Text className="text-sm! text-[#475467]!">
            Pantau dan kelola berkas registrasi mahasiswa, status keaktifan KRS,
            serta administrasi kelas reguler.
          </Text>
        </div>
        <Link to="/students/create">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-[#1677ff]! h-10 font-medium! rounded-lg! flex items-center shadow-sm"
          >
            Tambah Mahasiswa
          </Button>
        </Link>
      </div>

      {/* Filter Options */}
      <Card
        bordered={false}
        className="rounded-xl border border-[#eaecf0]! mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] [&_.ant-card-body]:p-4"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Input
              placeholder="Cari mahasiswa berdasarkan NIM, nama lengkap, atau email domain..."
              prefix={<SearchOutlined className="text-[#98a2b3]!" />}
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              className="h-10 rounded-lg"
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              className="w-full h-10"
              placeholder="Filter Status Mahasiswa"
              defaultValue="ALL"
              onChange={(value) => setStatusFilter(value)}
              options={[
                { value: "ALL", label: "Semua Status Akademik" },
                { value: MahasiswaStatus.AKTIF, label: "Aktif (Active)" },
                { value: MahasiswaStatus.CUTI, label: "Cuti (On Leave)" },
                { value: MahasiswaStatus.LULUS, label: "Lulus (Graduated)" },
                { value: MahasiswaStatus.DROP_OUT, label: "Drop Out" },
                { value: MahasiswaStatus.MANGKIR, label: "Mangkir" },
              ]}
              suffixIcon={<FilterOutlined />}
            />
          </Col>
        </Row>
      </Card>

      {/* Main Table View */}
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

export default Student;
