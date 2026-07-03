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
  message,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Content } = Layout;
const { Title, Text } = Typography;

export const CourseType = {
  MANDATORY: "mandatory",
  ELECTIVE: "elective",
  PRACTICUM: "practicum",
} as const;
export type CourseType = (typeof CourseType)[keyof typeof CourseType];

export const CourseStatusEnum = {
  ACTIVE: "ACTIVE",
  EXPIRED: "EXPIRED",
} as const;
export type CourseStatusEnum =
  (typeof CourseStatusEnum)[keyof typeof CourseStatusEnum];

export interface CourseTableItem {
  id: number;
  programStudiId: number;
  studyProgramId: number;
  studyProgram: { name: string };
  lectureId: number;
  lecture: { name: string };
  code: string;
  name: string;
  credit: number;
  semesterId: number;
  semester: { name: string };
  daySequenceInAWeek: number;
  status: CourseStatusEnum;
  startTime: string;
  endTime: string;
  type: CourseType;
  description?: string;
}

// ─── INITIAL MOCK DATA ───────────────────────────────────────────────
export const initialCourseData: CourseTableItem[] = [
  {
    id: 1,
    programStudiId: 1,
    studyProgramId: 1,
    studyProgram: { name: "Teknik Informatika" },
    lectureId: 101,
    lecture: { name: "Dr. Eko Prasetyo, M.T." },
    code: "IF2604",
    name: "Pengembangan Kontrak Pintar Blockchain",
    credit: 3,
    semesterId: 4,
    semester: { name: "Semester 4" },
    daySequenceInAWeek: 1, // Senin
    status: CourseStatusEnum.ACTIVE,
    startTime: "08:00",
    endTime: "10:30",
    type: CourseType.MANDATORY,
    description:
      "Mata kuliah fokus pada pengembangan Solidity, ERC Standards, dan Multi-Signature Registry.",
  },
  {
    id: 2,
    programStudiId: 1,
    studyProgramId: 1,
    studyProgram: { name: "Teknik Informatika" },
    lectureId: 102,
    lecture: { name: "Rina Wijayanti, M.Cs." },
    code: "IF2608",
    name: "Praktikum Jaringan Komputer",
    credit: 2,
    semesterId: 4,
    semester: { name: "Semester 4" },
    daySequenceInAWeek: 3, // Rabu
    status: CourseStatusEnum.ACTIVE,
    startTime: "13:00",
    endTime: "15:30",
    type: CourseType.PRACTICUM,
  },
];

const getDayName = (seq: number): string => {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  return days[seq - 1] || "Tidak Diketahui";
};

const Course: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseTableItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");

  useEffect(() => {
    const saved = localStorage.getItem("courses_data");
    if (saved) {
      setCourses(JSON.parse(saved));
    } else {
      localStorage.setItem("courses_data", JSON.stringify(initialCourseData));
      setCourses(initialCourseData);
    }
  }, []);

  const handleDelete = (id: number) => {
    const updated = courses.filter((item) => item.id !== id);
    localStorage.setItem("courses_data", JSON.stringify(updated));
    setCourses(updated);
    message.success("Mata kuliah berhasil dihapus!");
  };

  const filteredData = courses.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.code.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = typeFilter === "ALL" || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const columns: ColumnsType<CourseTableItem> = [
    {
      title: "KODE & MATA KULIAH",
      key: "course_info",
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="font-mono! text-xs! font-bold! text-[#1677ff]! bg-[#e6f4ff]! px-1.5! py-0.5! rounded! w-max! mb-1!">
            {record.code}
          </span>
          <Text className="font-semibold! text-[#101828]! m-0!">
            {record.name}
          </Text>
          <Text className="text-xs! text-[#667085]!">
            {record.studyProgram.name}
          </Text>
        </div>
      ),
    },
    {
      title: "SKS / SEMESTER",
      key: "credit_info",
      render: (_, record) => (
        <div className="flex flex-col">
          <Text className="text-sm! text-[#344054]! font-medium!">
            {record.credit} SKS
          </Text>
          <Text className="text-xs! text-[#667085]!">
            {record.semester.name}
          </Text>
        </div>
      ),
    },
    {
      title: "DOSEN PENGAMPU",
      dataIndex: ["lecture", "name"],
      key: "lecture",
      render: (text) => (
        <Text className="text-sm! text-[#344054]!">{text}</Text>
      ),
    },
    {
      title: "JADWAL MINGGUAN",
      key: "schedule",
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="text-sm! text-[#344054]! font-medium!">
            {getDayName(record.daySequenceInAWeek)}
          </span>
          <span className="text-xs! text-[#667085]!">
            {record.startTime} - {record.endTime}
          </span>
        </div>
      ),
    },
    {
      title: "JENIS",
      dataIndex: "type",
      key: "type",
      render: (type: CourseType) => {
        const colors = {
          [CourseType.MANDATORY]: "blue",
          [CourseType.ELECTIVE]: "purple",
          [CourseType.PRACTICUM]: "orange",
        };
        return (
          <Tag
            color={colors[type]}
            className="uppercase! font-semibold! text-xs!"
          >
            {type}
          </Tag>
        );
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: CourseStatusEnum) => {
        const isActive = status === CourseStatusEnum.ACTIVE;
        return (
          <Tag
            className={`rounded-xl! font-medium! px-2.5! ${isActive ? "bg-[#ecfdf3]! text-[#12b76a]! border-[#abefc6]!" : "bg-[#f2f4f7]! text-[#344054]! border-[#d0d5dd]!"}`}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "AKSI",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button
            type="text"
            icon={<EditOutlined className="text-[#475467]!" />}
            onClick={() => navigate(`/courses/${record.id}/edit`)}
            className="hover:bg-[#f2f4f7]! flex items-center justify-center rounded-lg!"
          />
          <Popconfirm
            title="Hapus Mata Kuliah"
            description="Apakah Anda yakin ingin menghapus mata kuliah ini dari sistem?"
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
            Manajemen Mata Kuliah
          </Title>
          <Text className="text-sm! text-[#475467]!">
            Kelola kurikulum program studi, bobot SKS, alokasi semester, dan
            penugasan dosen pengampu.
          </Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/courses/create")}
          className="bg-[#1677ff]! h-10 font-medium! rounded-lg! flex items-center shadow-sm"
        >
          Tambah Mata Kuliah
        </Button>
      </div>

      {/* Filter Section */}
      <Card
        bordered={false}
        className="rounded-xl border border-[#eaecf0]! mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] [&_.ant-card-body]:p-4"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Input
              placeholder="Cari berdasarkan kode atau nama mata kuliah..."
              prefix={<SearchOutlined className="text-[#98a2b3]!" />}
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              className="h-10 rounded-lg"
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              className="w-full h-10"
              placeholder="Filter Jenis Kuliah"
              defaultValue="ALL"
              onChange={(value) => setTypeFilter(value)}
              options={[
                { value: "ALL", label: "Semua Jenis Mata Kuliah" },
                { value: CourseType.MANDATORY, label: "Wajib (Mandatory)" },
                { value: CourseType.ELECTIVE, label: "Pilihan (Elective)" },
                { value: CourseType.PRACTICUM, label: "Praktikum (Practicum)" },
              ]}
              suffixIcon={<FilterOutlined />}
            />
          </Col>
        </Row>
      </Card>

      {/* Main Table */}
      <Card
        bordered={false}
        className="rounded-xl border border-[#eaecf0]! overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] [&_.ant-card-body]:p-0"
      >
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            position: ["bottomRight"],
            showTotal: (total, range) => (
              <span className="text-[#475467]! text-sm!">
                Showing {range[0]} to {range[1]} of {total} entries
              </span>
            ),
          }}
        />
      </Card>
    </Content>
  );
};

export default Course;
