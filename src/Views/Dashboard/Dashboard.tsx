import UseAuthStore from "@/lib/Stores/UseAuthStore";
import {
  Card,
  Typography,
  Table,
  Layout,
  Row,
  Col,
  Button,
  Space,
  Avatar,
  Tag,
  Progress,
} from "antd";
import {
  CalendarOutlined,
  DownloadOutlined,
  DesktopOutlined,
  UsergroupAddOutlined,
  LineChartOutlined,
  IdcardOutlined,
  SlidersOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import "dayjs/locale/id";

const { Title, Text } = Typography;
const { Content } = Layout;

// Interface untuk data tabel Rekap Presensi
interface AttendanceRecord {
  id: string;
  courseName: string;
  courseCode: string;
  timeSlot: string;
  lecturerName: string;
  lecturerAvatar: string;
  room: string;
  status: "ONGOING" | "PENDING" | "COMPLETED";
  progress: number;
}

function Dashboard() {
  const { userData } = UseAuthStore();

  // Data tiruan berdasarkan screenshot UI Rekap Presensi Harian
  const mockAttendanceData: AttendanceRecord[] = [
    {
      id: "1",
      courseName: "Algoritma & Struktur Data",
      courseCode: "TIF-202",
      timeSlot: "08:00 - 10:30",
      lecturerName: "Budi Santoso, M.Kom",
      lecturerAvatar: "BS",
      room: "Lab Komputer A",
      status: "ONGOING",
      progress: 85,
    },
    {
      id: "2",
      courseName: "Kecerdasan Buatan",
      courseCode: "TIF-301",
      timeSlot: "10:45 - 13:15",
      lecturerName: "Laila Husna, Ph.D",
      lecturerAvatar: "LH",
      room: "Ruang Kuliah 402",
      status: "PENDING",
      progress: 0,
    },
    {
      id: "3",
      courseName: "Basis Data Terdistribusi",
      courseCode: "TIF-204",
      timeSlot: "08:00 - 10:30",
      lecturerName: "Ahmad Rifai, M.T",
      lecturerAvatar: "AR",
      room: "Lab Komputer C",
      status: "COMPLETED",
      progress: 98,
    },
  ];

  // Definisi Kolom Tabel Presensi Harian
  const columns: ColumnsType<AttendanceRecord> = [
    {
      title: "MATA KULIAH",
      key: "course",
      width: "30%",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text style={{ fontWeight: 700, color: "#101828", fontSize: "14px" }}>
            {record.courseName}
          </Text>
          <Text
            type="secondary"
            style={{ fontSize: "12px", color: "#667085", marginTop: "2px" }}
          >
            {record.courseCode} • {record.timeSlot}
          </Text>
        </div>
      ),
    },
    {
      title: "DOSEN PENGAMPU",
      key: "lecturer",
      width: "25%",
      render: (_, record) => (
        <Space size="middle">
          <Avatar
            style={{
              backgroundColor: "#edf5ff",
              color: "#1677ff",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #d6e4ff",
            }}
          >
            {record.lecturerAvatar}
          </Avatar>
          <Text style={{ color: "#344054", fontWeight: 500 }}>
            {record.lecturerName}
          </Text>
        </Space>
      ),
    },
    {
      title: "RUANGAN",
      dataIndex: "room",
      key: "room",
      width: "15%",
      render: (room: string) => (
        <span style={{ color: "#475467" }}>{room}</span>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status: string) => {
        let config = { color: "default", text: "PENDING", style: {} };
        if (status === "ONGOING") {
          config = {
            color: "success",
            text: "ONGOING",
            style: {
              backgroundColor: "#ecfdf3",
              color: "#027a48",
              border: "none",
              fontWeight: 600,
            },
          };
        } else if (status === "COMPLETED") {
          config = {
            color: "processing",
            text: "COMPLETED",
            style: {
              backgroundColor: "#f0f5ff",
              color: "#1d4ed8",
              border: "none",
              fontWeight: 600,
            },
          };
        } else {
          config = {
            color: "default",
            text: "PENDING",
            style: {
              backgroundColor: "#f2f4f7",
              color: "#344054",
              border: "none",
              fontWeight: 600,
            },
          };
        }
        return (
          <Tag
            style={{
              borderRadius: "16px",
              padding: "2px 10px",
              ...config.style,
            }}
          >
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: "PROGRESS",
      dataIndex: "progress",
      key: "progress",
      width: "15%",
      render: (progress: number) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontWeight: 600,
              fontSize: "13px",
              color: "#344054",
              minWidth: "28px",
            }}
          >
            {progress}%
          </span>
          <Progress
            percent={progress}
            showInfo={false}
            strokeColor={progress > 90 ? "#1677ff" : "#111827"}
            trailColor="#eaecf0"
            strokeWidth={6}
            style={{ margin: 0 }}
          />
        </div>
      ),
    },
  ];

  return (
    <Content
      style={{ padding: "32px 32px 40px 32px", backgroundColor: "#fcfcfd" }}
    >
      {/* 1. Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "between",
          alignItems: "center",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ flex: 1 }}>
          <Title
            level={2}
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: "28px",
              color: "#101828",
            }}
          >
            Dashboard Overview
          </Title>
          <Text type="secondary" style={{ color: "#475467", fontSize: "14px" }}>
            Real-time academic insights and monitoring. Selamat datang kembali,{" "}
            {userData?.username || "Administrator"}!
          </Text>
        </div>

        {/* Right Action Controls */}
        <Space size="middle">
          <Button
            icon={<CalendarOutlined style={{ color: "#475467" }} />}
            style={{
              height: "40px",
              borderRadius: "8px",
              fontWeight: 500,
              color: "#344054",
            }}
          >
            Today: {dayjs().locale("id").format("D MMM YYYY")}
          </Button>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            style={{
              height: "40px",
              borderRadius: "8px",
              fontWeight: 500,
              backgroundColor: "#1677ff",
              boxShadow: "0 2px 4px rgba(22, 119, 255, 0.2)",
            }}
          >
            Export Report
          </Button>
        </Space>
      </div>

      {/* 2. Top Analytics Summary Cards Row */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        {/* Card 1: Active Classes */}
        <Col xs={24} sm={12} xl={6}>
          <Card
            bordered
            style={{
              borderRadius: "12px",
              border: "1px solid #eaecf0",
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#667085",
                    letterSpacing: "0.5px",
                  }}
                >
                  ACTIVE CLASSES
                </Text>
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#101828",
                    margin: "8px 0",
                  }}
                >
                  42
                </div>
                <Text
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#027a48",
                  }}
                >
                  +5%{" "}
                  <span style={{ color: "#667085", fontWeight: 400 }}>
                    vs last hour
                  </span>
                </Text>
              </div>
              <Avatar
                size={40}
                src=""
                style={{ backgroundColor: "#eff8ff", borderRadius: "8px" }}
                icon={<DesktopOutlined style={{ color: "#175cd3" }} />}
              />
            </div>
          </Card>
        </Col>

        {/* Card 2: Total Students */}
        <Col xs={24} sm={12} xl={6}>
          <Card
            bordered
            style={{
              borderRadius: "12px",
              border: "1px solid #eaecf0",
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#667085",
                    letterSpacing: "0.5px",
                  }}
                >
                  TOTAL STUDENTS
                </Text>
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#101828",
                    margin: "8px 0",
                  }}
                >
                  1,240
                </div>
                <Text
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#b42318",
                  }}
                >
                  -2%{" "}
                  <span style={{ color: "#667085", fontWeight: 400 }}>
                    drop from yesterday
                  </span>
                </Text>
              </div>
              <Avatar
                size={40}
                style={{ backgroundColor: "#ecfdf3", borderRadius: "8px" }}
                icon={<UsergroupAddOutlined style={{ color: "#027a48" }} />}
              />
            </div>
          </Card>
        </Col>

        {/* Card 3: Attendance Rate */}
        <Col xs={24} sm={12} xl={6}>
          <Card
            bordered
            style={{
              borderRadius: "12px",
              border: "1px solid #eaecf0",
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#667085",
                    letterSpacing: "0.5px",
                  }}
                >
                  ATTENDANCE RATE
                </Text>
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#101828",
                    margin: "8px 0",
                  }}
                >
                  92.4%
                </div>
                <Text
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#027a48",
                  }}
                >
                  +1.2%{" "}
                  <span style={{ color: "#667085", fontWeight: 400 }}>
                    from prev. month
                  </span>
                </Text>
              </div>
              <Avatar
                size={40}
                style={{ backgroundColor: "#f0f5ff", borderRadius: "8px" }}
                icon={<LineChartOutlined style={{ color: "#1d4ed8" }} />}
              />
            </div>
          </Card>
        </Col>

        {/* Card 4: Active Faculty */}
        <Col xs={24} sm={12} xl={6}>
          <Card
            bordered
            style={{
              borderRadius: "12px",
              border: "1px solid #eaecf0",
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#667085",
                    letterSpacing: "0.5px",
                  }}
                >
                  ACTIVE FACULTY
                </Text>
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#101828",
                    margin: "8px 0",
                  }}
                >
                  156
                </div>
                <Text
                  style={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#667085",
                  }}
                >
                  Currently on campus
                </Text>
              </div>
              <Avatar
                size={40}
                style={{ backgroundColor: "#fff7ed", borderRadius: "8px" }}
                icon={<IdcardOutlined style={{ color: "#c4320a" }} />}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* 3. Main Data Section: Rekap Presensi Harian Card Wrapped Table */}
      <Card
        style={{
          borderRadius: "12px",
          border: "1px solid #eaecf0",
          boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        }}
        bodyStyle={{ padding: "0px" }}
      >
        {/* Table Header Controls Section */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #eaecf0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: 700, fontSize: "16px", color: "#101828" }}>
            Rekap Presensi Harian
          </Text>
          <Space size="small">
            <Button
              type="text"
              icon={<SlidersOutlined style={{ color: "#667085" }} />}
            />
            <Button
              type="text"
              icon={<MoreOutlined style={{ color: "#667085" }} />}
            />
          </Space>
        </div>

        {/* AntD Table Component */}
        <Table
          columns={columns}
          dataSource={mockAttendanceData}
          rowKey="id"
          pagination={{
            total: mockAttendanceData.length,
            pageSize: 5,
            showSizeChanger: false,
            style: { paddingRight: "24px", paddingBottom: "16px" },
          }}
          locale={{
            emptyText: "Tidak ada jadwal perkuliahan hari ini",
          }}
        />
      </Card>
    </Content>
  );
}

export default Dashboard;
