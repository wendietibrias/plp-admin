import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Content } = Layout;
const { Title, Text } = Typography;

// ─── ENUMS & INTERFACES (Safe for erasableSyntaxOnly) ────────────────
export const JabatanFungsional = {
  ASISTEN_AHLI: "asisten_ahli",
  LEKTOR: "lektor",
  LEKTOR_KEPALA: "lektor_kepala",
  GURU_BESAR: "guru_besar",
} as const;
export type JabatanFungsional =
  (typeof JabatanFungsional)[keyof typeof JabatanFungsional];

export const PendidikanTerakhir = {
  S2: "S2",
  S3: "S3",
} as const;
export type PendidikanTerakhir =
  (typeof PendidikanTerakhir)[keyof typeof PendidikanTerakhir];

export const DosenStatus = {
  AKTIF: "aktif",
  NONAKTIF: "nonaktif",
  CUTI: "cuti",
  PENSIUN: "pensiun",
} as const;
export type DosenStatus = (typeof DosenStatus)[keyof typeof DosenStatus];

export interface LectureTableItem {
  id: number;
  studyProgramId: number;
  studyProgram: { name: string };
  nidn: string;
  name: string;
  email: string;
  phone?: string;
  birthday?: string; // Di simpan string yyyy-MM-dd di localStorage mock
  address?: string;
  gender?: string;
  functionalPosition?: JabatanFungsional;
  lastEducation?: PendidikanTerakhir;
  expert?: string;
  status: DosenStatus;
  picture?: string;
}

// ─── INITIAL MOCK DATA ───────────────────────────────────────────────
export const initialLectureData: LectureTableItem[] = [
  {
    id: 101,
    studyProgramId: 1,
    studyProgram: { name: "Teknik Informatika" },
    nidn: "0407038501",
    name: "Dr. Eko Prasetyo, M.T.",
    email: "eko.prasetyo@univ.ac.id",
    phone: "081234567890",
    birthday: "1985-03-07",
    address: "Jl. Blockchain No. 12, Kota Pemrograman",
    gender: "Laki-laki",
    functionalPosition: JabatanFungsional.LEKTOR_KEPALA,
    lastEducation: PendidikanTerakhir.S3,
    expert: "Blockchain Security & Smart Contracts",
    status: DosenStatus.AKTIF,
  },
  {
    id: 102,
    studyProgramId: 1,
    studyProgram: { name: "Teknik Informatika" },
    nidn: "0412098902",
    name: "Rina Wijayanti, M.Cs.",
    email: "rina.w@univ.ac.id",
    phone: "085712345678",
    birthday: "1989-09-12",
    address: "Komp. Kriptografi Blok C, Jawa Barat",
    gender: "Perempuan",
    functionalPosition: JabatanFungsional.LEKTOR,
    lastEducation: PendidikanTerakhir.S2,
    expert: "Computer Network & Web Development",
    status: DosenStatus.AKTIF,
  },
];

const Lecture: React.FC = () => {
  const navigate = useNavigate();
  const [lecturers, setLecturers] = useState<LectureTableItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    const saved = localStorage.getItem("lecturers_data");
    if (saved) {
      setLecturers(JSON.parse(saved));
    } else {
      localStorage.setItem(
        "lecturers_data",
        JSON.stringify(initialLectureData),
      );
      setLecturers(initialLectureData);
    }
  }, []);

  const handleDelete = (id: number) => {
    const updated = lecturers.filter((item) => item.id !== id);
    localStorage.setItem("lecturers_data", JSON.stringify(updated));
    setLecturers(updated);
    message.success("Data dosen berhasil dihapus!");
  };

  const filteredData = lecturers.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.nidn.includes(searchText) ||
      item.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: ColumnsType<LectureTableItem> = [
    {
      title: "NAMA & NIDN DOSEN",
      key: "lecture_profile",
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
            <span className="text-xs! text-[#667085]! font-mono!">
              NIDN: {record.nidn}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "PRODI & KEAHLIAN",
      key: "prodi_expert",
      render: (_, record) => (
        <div className="flex flex-col max-w-[220px]">
          <Text className="text-sm! text-[#344054]! font-medium!">
            {record.studyProgram.name}
          </Text>
          <Text
            className="text-xs! text-[#667085]! truncate!"
            title={record.expert}
          >
            {record.expert || "-"}
          </Text>
        </div>
      ),
    },
    {
      title: "KONTAK",
      key: "contacts",
      render: (_, record) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-xs! text-[#475467]! flex items-center gap-1">
            <MailOutlined className="text-[#98a2b3]!" /> {record.email}
          </span>
          {record.phone && (
            <span className="text-xs! text-[#667085]! flex items-center gap-1">
              <PhoneOutlined className="text-[#98a2b3]!" /> {record.phone}
            </span>
          )}
        </div>
      ),
    },
    {
      title: "JABATAN & EDU",
      key: "functional",
      render: (_, record) => (
        <div className="flex flex-col">
          <Tag className="bg-[#f2f4f7]! text-[#344054]! border-[#d0d5dd]! capitalize! w-max! text-xs! font-medium!">
            {record.functionalPosition?.replace("_", " ") || "-"}
          </Tag>
          <span className="text-xs! text-[#667085]! mt-1 pl-1">
            Pendidikan: <b>{record.lastEducation || "-"}</b>
          </span>
        </div>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: DosenStatus) => {
        const colorMap = {
          [DosenStatus.AKTIF]:
            "bg-[#ecfdf3]! text-[#12b76a]! border-[#abefc6]!",
          [DosenStatus.NONAKTIF]:
            "bg-[#f2f4f7]! text-[#344054]! border-[#d0d5dd]!",
          [DosenStatus.CUTI]: "bg-[#fffaeb]! text-[#f79009]! border-[#feedd0]!",
          [DosenStatus.PENSIUN]:
            "bg-[#fef3f2]! text-[#f04438]! border-[#fee4e2]!",
        };
        return (
          <Tag
            className={`rounded-[12px]! font-semibold! text-xs! px-2.5! py-0.5! uppercase! ${colorMap[status]}`}
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
            onClick={() => navigate(`/lecturers/${record.id}/edit`)}
            className="hover:bg-[#f2f4f7]! flex items-center justify-center rounded-lg!"
          />
          <Popconfirm
            title="Hapus Data Dosen"
            description="Apakah Anda yakin ingin menghapus data dosen ini?"
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
            Manajemen Data Dosen
          </Title>
          <Text className="text-sm! text-[#475467]!">
            Kelola berkas profil dosen pengampu, nomor induk, bidang kepakaran,
            dan status penugasan fungsional.
          </Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/lecturers/create")}
          className="bg-[#1677ff]! h-10 font-medium! rounded-lg! flex items-center shadow-sm"
        >
          Tambah Dosen
        </Button>
      </div>

      <Card
        bordered={false}
        className="rounded-xl border border-[#eaecf0]! mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] [&_.ant-card-body]:p-4"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Input
              placeholder="Cari dosen berdasarkan NIDN, nama, atau email resmi..."
              prefix={<SearchOutlined className="text-[#98a2b3]!" />}
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              className="h-10 rounded-lg"
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              className="w-full h-10"
              placeholder="Filter Status Aktivitas"
              defaultValue="ALL"
              onChange={(value) => setStatusFilter(value)}
              options={[
                { value: "ALL", label: "Semua Status Kerja" },
                { value: DosenStatus.AKTIF, label: "Aktif" },
                { value: DosenStatus.NONAKTIF, label: "Non-Aktif" },
                { value: DosenStatus.CUTI, label: "Cuti Akademik" },
                { value: DosenStatus.PENSIUN, label: "Pensiun" },
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

export default Lecture;
