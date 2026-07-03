import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Layout,
  Card,
  Table,
  Button,
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
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  FilterOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Content } = Layout;
const { Title, Text } = Typography;

// ─── ENUMS & INTERFACES (Aman untuk erasableSyntaxOnly) ───────────────
export const SemesterYearlyTypeEnum = {
  GANJIL: "GANJIL",
  GENAP: "GENAP",
  ANTARA: "ANTARA",
} as const;
export type SemesterYearlyTypeEnum =
  (typeof SemesterYearlyTypeEnum)[keyof typeof SemesterYearlyTypeEnum];

export interface SemesterTableItem {
  id: string;
  jenis: SemesterYearlyTypeEnum;
  tanggalMulai: string; // Format: YYYY-MM-DD
  tanggalSelesai: string; // Format: YYYY-MM-DD
  schoolYearId: string;
  schoolYear?: { name: string };
}

// ─── INITIAL MOCK DATA ───────────────────────────────────────────────
export const initialSemesterData: SemesterTableItem[] = [
  {
    id: "sem-01",
    jenis: SemesterYearlyTypeEnum.GANJIL,
    tanggalMulai: "2025-09-01",
    tanggalSelesai: "2026-01-31",
    schoolYearId: "sy-2526",
    schoolYear: { name: "2025/2026" },
  },
  {
    id: "sem-02",
    jenis: SemesterYearlyTypeEnum.GENAP,
    tanggalMulai: "2026-02-15",
    tanggalSelesai: "2026-07-10",
    schoolYearId: "sy-2526",
    schoolYear: { name: "2025/2026" },
  },
];

const Semester: React.FC = () => {
  const navigate = useNavigate();
  const [semesters, setSemesters] = useState<SemesterTableItem[]>([]);
  const [yearFilter, setYearFilter] = useState<string>("ALL");

  useEffect(() => {
    const saved = localStorage.getItem("semesters_data");
    if (saved) {
      setSemesters(JSON.parse(saved));
    } else {
      localStorage.setItem(
        "semesters_data",
        JSON.stringify(initialSemesterData),
      );
      setSemesters(initialSemesterData);
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = semesters.filter((item) => item.id !== id);
    localStorage.setItem("semesters_data", JSON.stringify(updated));
    setSemesters(updated);
    message.success("Periode perkuliahan semester berhasil dihapus!");
  };

  const filteredData = semesters.filter((item) => {
    return yearFilter === "ALL" || item.schoolYearId === yearFilter;
  });

  const columns: ColumnsType<SemesterTableItem> = [
    {
      title: "TAHUN AJARAN / AKADEMIK",
      key: "school_year",
      render: (_, record) => (
        <div className="flex items-center gap-2.5">
          <CalendarOutlined className="text-[#1677ff]! text-lg!" />
          <Text className="font-semibold! text-[#101828]! m-0!">
            Tahun Akademik {record.schoolYear?.name || "Tidak Terikat"}
          </Text>
        </div>
      ),
    },
    {
      title: "JENIS SEMESTER",
      dataIndex: "jenis",
      key: "jenis",
      render: (jenis: SemesterYearlyTypeEnum) => {
        const typeStyles = {
          [SemesterYearlyTypeEnum.GANJIL]:
            "bg-[#eff8ff]! text-[#175cd3]! border-[#b2ddff]!",
          [SemesterYearlyTypeEnum.GENAP]:
            "bg-[#fcefec]! text-[#b93815]! border-[#fecdca]!",
          [SemesterYearlyTypeEnum.ANTARA]:
            "bg-[#f9f5ff]! text-[#6941c6]! border-[#e9d7fe]!",
        };
        return (
          <Tag
            className={`rounded-md! font-bold! text-xs! px-2.5! py-0.5! uppercase! ${typeStyles[jenis]}`}
          >
            Semester {jenis}
          </Tag>
        );
      },
    },
    {
      title: "DURASI PERIODE KALENDER AKADEMIK",
      key: "duration_range",
      render: (_, record) => (
        <div className="flex items-center gap-2 text-sm! text-[#344054]! font-mono!">
          <span className="bg-[#f2f4f7]! px-2! py-1! rounded-md! border border-[#e4e7ec]!">
            {record.tanggalMulai}
          </span>
          <ArrowRightOutlined className="text-[#98a2b3]! text-xs!" />
          <span className="bg-[#f2f4f7]! px-2! py-1! rounded-md! border border-[#e4e7ec]!">
            {record.tanggalSelesai}
          </span>
        </div>
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
            onClick={() => navigate(`/semesters/${record.id}/edit`)}
            className="hover:bg-[#f2f4f7]! flex items-center justify-center rounded-lg!"
          />
          <Popconfirm
            title="Hapus Pengaturan Semester"
            description="Langkah ini berisiko mematikan relasi jadwal kuliah KRS. Hapus?"
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
            Konfigurasi Periode Semester
          </Title>
          <Text className="text-sm! text-[#475467]!">
            Atur timeline aktif perkuliahan ganjil, genap, maupun semester
            antara yang diikat dalam kalender akademik tahunan.
          </Text>
        </div>
        <Link to="/semesters/create">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-[#1677ff]! h-10 font-medium! rounded-lg! flex items-center shadow-sm"
          >
            Buka Semester Baru
          </Button>
        </Link>
      </div>

      <Card
        bordered={false}
        className="rounded-xl border border-[#eaecf0]! mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] [&_.ant-card-body]:p-4"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Select
              className="w-full h-10"
              placeholder="Filter Berdasarkan Tahun Ajaran"
              defaultValue="ALL"
              onChange={(value) => setYearFilter(value)}
              options={[
                { value: "ALL", label: "Semua Tahun Akademik" },
                { value: "sy-2425", label: "Tahun Ajaran 2024/2025" },
                { value: "sy-2526", label: "Tahun Ajaran 2025/2026" },
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
          pagination={false}
        />
      </Card>
    </Content>
  );
};

export default Semester;
