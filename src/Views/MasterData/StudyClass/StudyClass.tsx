import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Input,
  Typography,
  Space,
  Tooltip,
  Popconfirm,
  message,
  Card,
  Layout,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { Content } = Layout;

interface StudyClassData {
  id: string;
  code: string;
  name: string;
}

const StudyClass: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<StudyClassData[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockClasses: StudyClassData[] = [
        { id: "1", code: "INF-A-2023", name: "Informatika Kelas A" },
        { id: "2", code: "INF-B-2023", name: "Informatika Kelas B" },
        { id: "3", code: "SI-A-2024", name: "Sistem Informasi Kelas A" },
        { id: "4", code: "SI-B-2024", name: "Sistem Informasi Kelas B" },
        { id: "5", code: "TE-A-2023", name: "Teknik Elektro Kelas A" },
      ];
      setDataSource(mockClasses);
    } catch (error) {
      message.error("Gagal memuat data kelas");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    message.loading({ content: "Menghapus kelas...", key: "deleteKey" });

    setTimeout(() => {
      setDataSource((prev) => prev.filter((item) => item.id !== id));
      message.success({
        content: "Kelas berhasil dihapus!",
        key: "deleteKey",
        duration: 2,
      });
    }, 1000);
  };

  const filteredData = dataSource.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.code.toLowerCase().includes(searchText.toLowerCase()),
  );

  const columns: ColumnsType<StudyClassData> = [
    {
      title: "KODE KELAS",
      dataIndex: "code",
      key: "code",
      width: "30%",
      render: (code: string) => (
        <span style={{ fontWeight: 600, color: "#101828" }}>{code}</span>
      ),
    },
    {
      title: "NAMA KELAS",
      dataIndex: "name",
      key: "name",
      width: "50%",
      render: (name: string) => (
        <span style={{ color: "#344054" }}>{name}</span>
      ),
    },
    {
      title: "AKSI",
      key: "action",
      width: "20%",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit Kelas">
            <Button
              type="text"
              icon={<EditOutlined style={{ color: "#98A2B3" }} />}
              onClick={() => console.log("Edit ID:", record.id)}
            />
          </Tooltip>
          <Tooltip title="Hapus Kelas">
            <Popconfirm
              title="Hapus Kelas"
              description="Apakah Anda yakin ingin menghapus kelas ini? Tindakan ini tidak dapat dibatalkan."
              onConfirm={() => handleDelete(record.id)}
              okText="Ya, Hapus"
              cancelText="Batal"
              okButtonProps={{ danger: true }}
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined style={{ color: "#98A2B3" }} />}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Content style={{ padding: "32px 32px 40px 32px" }}>
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "between",
          alignItems: "flex-start",
          marginBottom: "24px",
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
              fontSize: "24px",
              color: "#101828",
            }}
          >
            Daftar Kelas
          </Title>
          <Text type="secondary" style={{ color: "#475467", fontSize: "14px" }}>
            Kelola kode perkuliahan, nama kelas, beserta data rombongan belajar
            institusi.
          </Text>
        </div>
        <Link to="/study-classes/create">
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
            Tambah Kelas Baru
          </Button>
        </Link>
      </div>

      {/* Main Table Container wrapped in Card to match layout */}
      <Card
        style={{
          borderRadius: "12px",
          border: "1px solid #eaecf0",
          boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        }}
        bodyStyle={{ padding: "0px" }}
      >
        {/* Search Bar section above the table */}
        <div
          style={{ padding: "20px 24px", borderBottom: "1px solid #eaecf0" }}
        >
          <Input
            placeholder="Cari berdasarkan nama atau kode kelas..."
            prefix={
              <SearchOutlined
                style={{ color: "#667085", marginRight: "4px" }}
              />
            }
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              maxWidth: "360px",
              height: "40px",
              borderRadius: "8px",
            }}
            allowClear
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredData.length,
            pageSize: 5,
            showSizeChanger: false,
            style: { paddingRight: "24px", paddingBottom: "16px" },
          }}
          locale={{
            emptyText: "Tidak ada data kelas yang ditemukan",
          }}
        />
      </Card>

      {/* Info Banner at Bottom */}
      <div
        style={{
          backgroundColor: "#edf5ff",
          border: "1px solid #d6e4ff",
          borderRadius: "12px",
          padding: "16px 20px",
          display: "flex",
          gap: "12px",
          marginTop: "24px",
        }}
      >
        <InfoCircleOutlined
          style={{ color: "#1677ff", fontSize: "18px", marginTop: "2px" }}
        />
        <div>
          <div
            style={{
              fontWeight: 700,
              color: "#004085",
              fontSize: "14px",
              marginBottom: "4px",
            }}
          >
            Informasi Sinkronisasi Kode Kelas
          </div>
          <div
            style={{ color: "#2b5a9e", fontSize: "13px", lineHeight: "1.5" }}
          >
            Setiap <strong>Kode Kelas</strong> bersifat unik dan digunakan
            sebagai referensi utama saat membuat jadwal kuliah, presensi, serta
            pembagian Kartu Hasil Studi (KHS).
          </div>
        </div>
      </div>
    </Content>
  );
};

export default StudyClass;
