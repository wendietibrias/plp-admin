import React, { useState } from "react";
import {
  Layout,
  Card,
  Table,
  Badge,
  Typography,
  Input,
  Select,
  Row,
  Col,
  Avatar,
  Tag,
} from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Content } = Layout;
const { Title, Text } = Typography;

// ─── ENUMS & TYPES (Menyesuaikan Entity TypeORM Anda) ────────────────
export const CourseAttedanceStatusEnum = {
  LATE: "LATE",
  ON_TIME: "ON TIME",
} as const;
export type CourseAttedanceStatusEnum =
  (typeof CourseAttedanceStatusEnum)[keyof typeof CourseAttedanceStatusEnum];

// Interface untuk Mock Relasi Entity
interface StudentModel {
  id: number;
  nim: string;
  name: string;
  avatarUrl?: string;
}

interface CourseSessionModel {
  id: number;
  sessionNumber: number;
  topic: string;
  courseName: string;
}

export interface CourseAttendanceTableItem {
  id: number; // Dari BaseModel
  scanTime: string;
  scanDate: Date;
  status: CourseAttedanceStatusEnum;
  studentId: number;
  student: StudentModel;
  courseSessionQrId: number;
  courseSessionId: number;
  courseSession: CourseSessionModel;
}

// ─── MOCK DATA ───────────────────────────────────────────────────────
const mockAttendanceData: CourseAttendanceTableItem[] = [
  {
    id: 1,
    scanTime: "07:52:11",
    scanDate: new Date("2026-07-03"),
    status: CourseAttedanceStatusEnum.ON_TIME,
    studentId: 2001,
    student: {
      id: 2001,
      nim: "220101032",
      name: "Aldo Rivaldi",
    },
    courseSessionQrId: 10,
    courseSessionId: 101,
    courseSession: {
      id: 101,
      sessionNumber: 4,
      topic: "Implementasi Multi-Signature Smart Contract",
      courseName: "Pengembangan Kontrak Pintar Blockchain",
    },
  },
  {
    id: 2,
    scanTime: "08:15:34",
    scanDate: new Date("2026-07-03"),
    status: CourseAttedanceStatusEnum.LATE,
    studentId: 2002,
    student: {
      id: 2002,
      nim: "220101045",
      name: "Rian Sanjaya",
    },
    courseSessionQrId: 10,
    courseSessionId: 101,
    courseSession: {
      id: 101,
      sessionNumber: 4,
      topic: "Implementasi Multi-Signature Smart Contract",
      courseName: "Pengembangan Kontrak Pintar Blockchain",
    },
  },
  {
    id: 3,
    scanTime: "07:58:02",
    scanDate: new Date("2026-07-03"),
    status: CourseAttedanceStatusEnum.ON_TIME,
    studentId: 2003,
    student: {
      id: 2003,
      nim: "220101012",
      name: "Gita Permata",
    },
    courseSessionQrId: 10,
    courseSessionId: 101,
    courseSession: {
      id: 101,
      sessionNumber: 4,
      topic: "Implementasi Multi-Signature Smart Contract",
      courseName: "Pengembangan Kontrak Pintar Blockchain",
    },
  },
];

const CourseAttendance: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Filter Logika Data
  const filteredData = mockAttendanceData.filter((item) => {
    const matchesSearch =
      item.student.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.student.nim.includes(searchText) ||
      item.courseSession.courseName
        .toLowerCase()
        .includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Hitung Statistik Ringkas
  const totalRecords = filteredData.length;
  const onTimeCount = filteredData.filter(
    (d) => d.status === CourseAttedanceStatusEnum.ON_TIME,
  ).length;
  const lateCount = filteredData.filter(
    (d) => d.status === CourseAttedanceStatusEnum.LATE,
  ).length;

  // Definisi Kolom Tabel
  const columns: ColumnsType<CourseAttendanceTableItem> = [
    {
      title: "MAHASISWA",
      key: "student_info",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar className="bg-[#1677ff]! flex items-center justify-center">
            {record.student.name.charAt(0)}
          </Avatar>
          <div className="flex flex-col">
            <Text className="font-semibold! text-[#101828]! m-0!">
              {record.student.name}
            </Text>
            <Text className="text-xs! text-[#667085]!">
              NIM: {record.student.nim}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "MATA KULIAH / SESI",
      key: "session_info",
      render: (_, record) => (
        <div className="flex flex-col max-w-70">
          <Text className="font-medium! text-[#344054]! truncate!">
            {record.courseSession.courseName}
          </Text>
          <Text className="text-xs! text-[#667085]! truncate!">
            Sesi {record.courseSession.sessionNumber}:{" "}
            {record.courseSession.topic}
          </Text>
        </div>
      ),
    },
    {
      title: "WAKTU SCAN",
      key: "scan_time_detail",
      render: (_, record) => {
        const formattedDate = record.scanDate.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        return (
          <div className="flex flex-col">
            <span className="text-[#344054]! font-medium! flex items-center gap-1 text-sm!">
              <ClockCircleOutlined className="text-[#98a2b3]!" />{" "}
              {record.scanTime}
            </span>
            <span className="text-xs! text-[#667085]! pl-5">
              {formattedDate}
            </span>
          </div>
        );
      },
    },
    {
      title: "ID QR REF",
      key: "qr_id",
      render: (_, record) => (
        <Tag
          icon={<QrcodeOutlined />}
          className="bg-[#f2f4f7]! text-[#344054]! border-[#d0d5dd]! px-2! py-0.5! rounded-md!"
        >
          QR-{record.courseSessionQrId}
        </Tag>
      ),
    },
    {
      title: "STATUS PRESENSI",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status: CourseAttedanceStatusEnum) => {
        const isOnTime = status === CourseAttedanceStatusEnum.ON_TIME;
        const badgeStatus = isOnTime ? "success" : "warning";
        const statusClasses = isOnTime
          ? "text-[#12b76a]! bg-[#ecfdf3]!"
          : "text-[#f79009]! bg-[#fffaeb]!";

        return (
          <Badge
            status={badgeStatus}
            text={
              <span
                className={`py-1 px-3 rounded-2xl font-semibold! text-xs! whitespace-nowrap! ${statusClasses}`}
              >
                {status}
              </span>
            }
          />
        );
      },
    },
  ];

  return (
    <Content className="p-8 pb-10">
      {/* Top Header Section */}
      <div className="mb-6">
        <Title level={2} className="m-0! font-bold! text-2xl! text-[#101828]!">
          Log Presensi Kehadiran Mahasiswa
        </Title>
        <Text className="text-sm! text-[#475467]!">
          Memantau data riwayat pemindaian QR Code presensi kelas perkuliahan
          secara langsung dari sistem.
        </Text>
      </div>

      {/* Metric Cards Section */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card
            bordered={false}
            className="rounded-xl border border-[#eaecf0]! shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center gap-4">
              <Avatar
                size={48}
                icon={<UserOutlined />}
                className="bg-[#f2f4f7]! text-[#475467]! rounded-lg!"
              />
              <div>
                <div className="text-[#475467]! text-[13px]! font-medium!">
                  Total Pemindaian
                </div>
                <div className="text-xl! font-bold! text-[#101828]! mt-0.5!">
                  {totalRecords} Log Masuk
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            bordered={false}
            className="rounded-xl border border-[#eaecf0]! shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center gap-4">
              <Avatar
                size={48}
                icon={<CheckCircleOutlined />}
                className="bg-[#ecfdf3]! text-[#12b76a]! rounded-lg!"
              />
              <div>
                <div className="text-[#475467]! text-[13px]! font-medium!">
                  Tepat Waktu (On Time)
                </div>
                <div className="text-xl! font-bold! text-[#12b76a]! mt-0.5!">
                  {onTimeCount} Mahasiswa
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            bordered={false}
            className="rounded-xl border border-[#eaecf0]! shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center gap-4">
              <Avatar
                size={48}
                icon={<ClockCircleOutlined />}
                className="bg-[#fffaeb]! text-[#f79009]! rounded-lg!"
              />
              <div>
                <div className="text-[#475467]! text-[13px]! font-medium!">
                  Terlambat (Late)
                </div>
                <div className="text-xl! font-bold! text-[#f79009]! mt-0.5!">
                  {lateCount} Mahasiswa
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Filter & Search Controls */}
      <Card
        bordered={false}
        className="rounded-xl border border-[#eaecf0]! mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] [&_.ant-card-body]:p-4"
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={16}>
            <Input
              placeholder="Cari berdasarkan nama, NIM mahasiswa, atau mata kuliah..."
              prefix={<SearchOutlined className="text-[#98a2b3]!" />}
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              className="h-10 rounded-lg"
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              className="w-full h-10"
              placeholder="Filter Status Kehadiran"
              defaultValue="ALL"
              onChange={(value) => setStatusFilter(value)}
              options={[
                { value: "ALL", label: "Semua Status Presensi" },
                {
                  value: CourseAttedanceStatusEnum.ON_TIME,
                  label: "Tepat Waktu (ON TIME)",
                },
                {
                  value: CourseAttedanceStatusEnum.LATE,
                  label: "Terlambat (LATE)",
                },
              ]}
              suffixIcon={<FilterOutlined />}
            />
          </Col>
        </Row>
      </Card>

      {/* Main Table Log Attendance */}
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
            pageSizeOptions: ["10", "20", "50"],
            position: ["bottomRight"],
            showTotal: (total, range) => (
              <span className="text-[#475467]! text-sm!">
                Showing {range[0]} to {range[1]} of {total} entries
              </span>
            ),
          }}
          className="bg-white"
        />
      </Card>
    </Content>
  );
};

export default CourseAttendance;
