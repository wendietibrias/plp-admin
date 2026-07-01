import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Space,
  Typography,
  Avatar,
  Alert,
  Input,
  message,
  Modal,
} from "antd";
import {
  BookOutlined,
  PlusOutlined,
  HistoryOutlined,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Content } = Layout;
const { Title, Text } = Typography;

// ─── ENUMS & TYPES ───────────────────────────────────────────────────
export const DayOfWeek = {
  MONDAY: "monday",
  TUESDAY: "tuesday",
  WEDNESDAY: "wednesday",
  THURSDAY: "thursday",
  FRIDAY: "friday",
  SATURDAY: "saturday",
  SUNDAY: "sunday",
} as const;
export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek];

export const ScheduleStatus = {
  ACTIVE: "active",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
} as const;
export type ScheduleStatus =
  (typeof ScheduleStatus)[keyof typeof ScheduleStatus];

export interface ClassScheduleTableItem {
  id: string;
  courseId: number;
  semesterId: number;
  lecturerId: number;
  classId: number;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  room: string;
  totalMeetings: number;
  status: ScheduleStatus;
  notes: string | null;
}

// ─── MOCK DATA LABELS ────────────────────────────────────────────────
export const dayLabels: Record<DayOfWeek, string> = {
  [DayOfWeek.MONDAY]: "Senin",
  [DayOfWeek.TUESDAY]: "Selasa",
  [DayOfWeek.WEDNESDAY]: "Rabu",
  [DayOfWeek.THURSDAY]: "Kamis",
  [DayOfWeek.FRIDAY]: "Jumat",
  [DayOfWeek.SATURDAY]: "Sabtu",
  [DayOfWeek.SUNDAY]: "Minggu",
};

export const mockCourses = [
  { value: 101, label: "Pemrograman Web Lanjut" },
  { value: 102, label: "Keamanan Jaringan & Kriptografi" },
  { value: 103, label: "Pengembangan Kontrak Pintar Blockchain" },
];

export const mockSemesters = [
  { value: 1, label: "2025/2026 - Genap" },
  { value: 2, label: "2026/2027 - Ganjil" },
];

export const mockLecturers = [
  { value: 1, label: "Dr. Eko Prasetyo, M.T." },
  { value: 2, label: "Rina Wijayanti, M.Cs." },
];

export const mockClasses = [
  { value: 11, label: "IF-4A" },
  { value: 12, label: "IF-4B" },
];

export const initialTableData: ClassScheduleTableItem[] = [
  {
    id: "1",
    courseId: 103,
    semesterId: 1,
    lecturerId: 1,
    classId: 11,
    day: DayOfWeek.MONDAY,
    startTime: "08:00",
    endTime: "11:20",
    room: "Lab Blockchain",
    totalMeetings: 16,
    status: ScheduleStatus.ACTIVE,
    notes: "Membawa laptop yang sudah terinstall Node.js",
  },
  {
    id: "2",
    courseId: 102,
    semesterId: 1,
    lecturerId: 2,
    classId: 12,
    day: DayOfWeek.WEDNESDAY,
    startTime: "13:00",
    endTime: "15:30",
    room: "Ruang R.3.2",
    totalMeetings: 16,
    status: ScheduleStatus.ACTIVE,
    notes: null,
  },
];

const ClassSchedule: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState<ClassScheduleTableItem[]>(() => {
    const saved = localStorage.getItem("class_schedules");
    return saved ? JSON.parse(saved) : initialTableData;
  });

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Hapus Jadwal Kuliah?",
      content:
        "Apakah Anda yakin ingin menghapus jadwal perkuliahan ini secara permanen?",
      okText: "Ya, Hapus",
      okType: "danger",
      cancelText: "Batal",
      onOk: () => {
        const newData = dataSource.filter((item) => item.id !== id);
        setDataSource(newData);
        localStorage.setItem("class_schedules", JSON.stringify(newData));
        message.success("Jadwal perkuliahan berhasil dihapus");
      },
    });
  };

  const filteredData = dataSource.filter((item) => {
    const course =
      mockCourses.find((c) => c.value === item.courseId)?.label || "";
    const lecturer =
      mockLecturers.find((l) => l.value === item.lecturerId)?.label || "";
    const room = item.room || "";
    return (
      course.toLowerCase().includes(searchText.toLowerCase()) ||
      lecturer.toLowerCase().includes(searchText.toLowerCase()) ||
      room.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const columns: ColumnsType<ClassScheduleTableItem> = [
    {
      title: "MATA KULIAH & KELAS",
      key: "course_detail",
      render: (_, record) => {
        const course = mockCourses.find(
          (c) => c.value === record.courseId,
        )?.label;
        const cls = mockClasses.find((c) => c.value === record.classId)?.label;
        return (
          <Space direction="vertical" size={2}>
            <Text className="font-semibold! text-[#1d2939]!">{course}</Text>
            <Text type="secondary" className="text-xs! flex items-center gap-1">
              <BookOutlined /> Kelas: {cls}
            </Text>
          </Space>
        );
      },
    },
    {
      title: "DOSEN PENGAMPU",
      key: "lecturer",
      render: (_, record) => {
        const lecturer = mockLecturers.find(
          (l) => l.value === record.lecturerId,
        )?.label;
        return <span className="text-[#475467]!">{lecturer}</span>;
      },
    },
    {
      title: "WAKTU PERKULIAHAN",
      key: "time_detail",
      render: (_, record) => (
        <span className="text-[#475467]! font-medium! flex items-center gap-1">
          <CalendarOutlined /> {dayLabels[record.day]}, {record.startTime} -{" "}
          {record.endTime}
        </span>
      ),
    },
    {
      title: "RUANGAN & SESI",
      key: "room_detail",
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Text className="text-[#475467]! flex items-center gap-1">
            <EnvironmentOutlined /> {record.room}
          </Text>
          <Text type="secondary" className="text-xs!">
            Total: {record.totalMeetings} Pertemuan
          </Text>
        </Space>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: ScheduleStatus) => {
        let badgeStatus: "success" | "error" | "processing" = "processing";
        let statusClasses = "text-[#175cd3]! bg-[#eff8ff]!";

        if (status === ScheduleStatus.CANCELLED) {
          badgeStatus = "error";
          statusClasses = "text-[#b42318]! bg-[#fef3f2]!";
        } else if (status === ScheduleStatus.COMPLETED) {
          badgeStatus = "success";
          statusClasses = "text-[#12b76a]! bg-[#ecfdf3]!";
        }

        return (
          <Badge
            status={badgeStatus}
            text={
              <span
                className={`py-1 px-3 rounded-2xl font-semibold! text-xs! capitalize! ${statusClasses}`}
              >
                {status}
              </span>
            }
          />
        );
      },
    },
    {
      title: "AKSI",
      key: "action",
      width: 110,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined className="text-[#98a2b3]!" />}
            onClick={() => navigate(`/class-schedules/${record.id}/edit`)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined className="text-[#98a2b3]!" />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Content className="p-8 pb-10">
      {/* Title & Top Action Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <Title
            level={2}
            className="m-0! font-bold! text-2xl! text-[#101828]!"
          >
            Manajemen Jadwal Kuliah
          </Title>
          <Text type="secondary" className="text-[#475467]! text-sm!">
            Kelola alokasi waktu perkuliahan, distribusi ruang kelas, dan
            penugasan dosen akademik.
          </Text>
        </div>
        <Link to="/class-schedules/create">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="h-10 rounded-lg font-medium! bg-[#1677ff]! shadow-[0_2px_4px_rgba(22,119,255,0.2)]"
          >
            Tambah Jadwal Baru
          </Button>
        </Link>
      </div>

      {/* Main Full-Width Table */}
      <Card
        bordered={false}
        className="rounded-xl border border-[#eaecf0]! overflow-hidden mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] [&_.ant-card-body]:p-0"
      >
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: false,
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

export default ClassSchedule;
