import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "antd";
import {
  CalendarOutlined,
  PlusOutlined,
  HistoryOutlined,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Content } = Layout;
const { Title, Text } = Typography;

// Enum matching backend logic
export const SemesterYearlyTypeEnum = {
  GANJIL: "Ganjil",
  GENAP: "Genap",
} as const;

export type SemesterYearlyTypeEnum =
  (typeof SemesterYearlyTypeEnum)[keyof typeof SemesterYearlyTypeEnum];

interface SchoolYearRecord {
  key: string;
  startYear: number;
  endYear: number;
  semesterType: SemesterYearlyTypeEnum;
  startDate: string;
  endDate: string;
  status: "Aktif" | "Nonaktif";
}

const SchoolYear: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  // Mock data matching the screenshot exactly, using startYear and endYear
  const rawData: SchoolYearRecord[] = [
    {
      key: "1",
      startYear: 2023,
      endYear: 2024,
      semesterType: SemesterYearlyTypeEnum.GANJIL,
      startDate: "01 Sep 2023",
      endDate: "31 Jan 2024",
      status: "Aktif",
    },
    {
      key: "2",
      startYear: 2023,
      endYear: 2024,
      semesterType: SemesterYearlyTypeEnum.GENAP,
      startDate: "01 Feb 2024",
      endDate: "30 Jun 2024",
      status: "Nonaktif",
    },
    {
      key: "3",
      startYear: 2022,
      endYear: 2023,
      semesterType: SemesterYearlyTypeEnum.GANJIL,
      startDate: "01 Sep 2022",
      endDate: "31 Jan 2023",
      status: "Nonaktif",
    },
    {
      key: "4",
      startYear: 2022,
      endYear: 2023,
      semesterType: SemesterYearlyTypeEnum.GENAP,
      startDate: "01 Feb 2023",
      endDate: "30 Jun 2023",
      status: "Nonaktif",
    },
  ];

  const filteredData = rawData.filter((item) => {
    const combinedYear = `${item.startYear}/${item.endYear}`;
    return (
      combinedYear.toLowerCase().includes(searchText.toLowerCase()) ||
      item.semesterType.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const columns: ColumnsType<SchoolYearRecord> = [
    {
      title: "TAHUN AJARAN",
      dataIndex: "year",
      key: "year",
      render: (_, record) => (
        <span style={{ fontWeight: 600, color: "#1d2939" }}>
          {record.startYear}/{record.endYear}
        </span>
      ),
    },
    {
      title: "SEMESTER",
      dataIndex: "semesterType",
      key: "semesterType",
      render: (text) => <span style={{ color: "#475467" }}>{text}</span>,
    },
    {
      title: "MULAI",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => <span style={{ color: "#475467" }}>{text}</span>,
    },
    {
      title: "SELESAI",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => <span style={{ color: "#475467" }}>{text}</span>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: "Aktif" | "Nonaktif") => {
        const isAktif = status === "Aktif";
        return (
          <Badge
            status={isAktif ? "success" : "default"}
            text={
              <span
                style={{
                  color: isAktif ? "#17b26a" : "#667085",
                  backgroundColor: isAktif ? "#ecfdf3" : "#f2f4f7",
                  padding: "4px 12px",
                  borderRadius: "16px",
                  fontWeight: 600,
                  fontSize: "12px",
                }}
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
      render: () => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: "#98a2b3" }} />}
            onClick={() => console.log("Edit clicked")}
          />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "#98a2b3" }} />}
            onClick={() => console.log("Delete clicked")}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Content Wrapper */}
      <Content style={{ padding: "32px 32px 40px 32px" }}>
        {/* Title Row with Action Button */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <Title
              level={2}
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: "24px",
                color: "#101828",
              }}
            >
              Tahun Ajaran
            </Title>
            <Text
              type="secondary"
              style={{ color: "#475467", fontSize: "14px" }}
            >
              Kelola data tahun akademik dan periode semester aktif di
              institusi.
            </Text>
          </div>
          <Link to="/school-years/create">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{
                height: "40px",
                borderRadius: "8px",
                fontWeight: 500,
                backgroundColor: "#1677ff",
                boxShadow: "0 2px 4px rgba(22, 119, 255, 0.2)",
              }}
            >
              Tambah Tahun Ajaran
            </Button>
          </Link>
        </div>

        {/* Overview Summary Cards */}
        <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
          <Col xs={24} md={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                border: "1px solid #eaecf0",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <Avatar
                  size={48}
                  icon={<CalendarOutlined />}
                  style={{
                    backgroundColor: "#eff8ff",
                    color: "#175cd3",
                    borderRadius: "8px",
                  }}
                />
                <div>
                  <div
                    style={{
                      color: "#475467",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Semester Aktif
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#101828",
                      marginTop: "4px",
                    }}
                  >
                    2023/2024 Ganjil
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                border: "1px solid #eaecf0",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <Avatar
                  size={48}
                  icon={<HistoryOutlined />}
                  style={{
                    backgroundColor: "#f8f9fa",
                    color: "#344054",
                    borderRadius: "8px",
                  }}
                />
                <div>
                  <div
                    style={{
                      color: "#475467",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Total Record
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#101828",
                      marginTop: "4px",
                    }}
                  >
                    12 Periode
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                border: "1px solid #eaecf0",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <Avatar
                  size={48}
                  icon={<ClockCircleOutlined />}
                  style={{
                    backgroundColor: "#f8f9fa",
                    color: "#344054",
                    borderRadius: "8px",
                  }}
                />
                <div>
                  <div
                    style={{
                      color: "#475467",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Draft Selanjutnya
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#101828",
                      marginTop: "4px",
                    }}
                  >
                    2023/2024 Genap
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Main Data Table */}
        <Card
          bordered={false}
          bodyStyle={{ padding: 0 }}
          style={{
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #eaecf0",
            overflow: "hidden",
            marginBottom: "24px",
          }}
        >
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{
              defaultPageSize: 4,
              total: 12,
              showSizeChanger: false,
              position: ["bottomRight"],
              showTotal: (total, range) => (
                <span style={{ color: "#475467", fontSize: "14px" }}>
                  Showing {range[0]} to {range[1]} of {total} entries
                </span>
              ),
            }}
            style={{ backgroundColor: "#fff" }}
          />
        </Card>

        {/* Important Callout / Alert Notes */}
        <Alert
          message={
            <span
              style={{ fontWeight: 700, color: "#004085", fontSize: "14px" }}
            >
              Catatan Penting
            </span>
          }
          description={
            <span
              style={{
                color: "#004085",
                fontSize: "13px",
                lineHeight: "1.5",
              }}
            >
              Hanya satu semester yang dapat berstatus <strong>Aktif</strong>{" "}
              pada satu waktu. Mengaktifkan semester baru secara otomatis akan
              menonaktifkan semester yang saat ini sedang berjalan. Perubahan
              status akan berdampak pada akses mahasiswa ke Kartu Rencana Studi
              (KRS).
            </span>
          }
          type="info"
          showIcon
          icon={
            <InfoCircleOutlined
              style={{ color: "#0056b3", marginTop: "2px" }}
            />
          }
          style={{
            backgroundColor: "#edf5ff",
            border: "1px solid #d6e4ff",
            borderRadius: "12px",
            padding: "16px 20px",
          }}
        />
      </Content>
    </>
  );
};

export default SchoolYear;
