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

interface StudyProgramData {
  id: string;
  code: string;
  name: string;
}

const StudyProgram: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<StudyProgramData[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockPrograms: StudyProgramData[] = [
        { id: "1", code: "INF", name: "Teknik Informatika" },
        { id: "2", code: "SI", name: "Sistem Informasi" },
        { id: "3", code: "TE", name: "Teknik Elektro" },
        { id: "4", code: "AKT", name: "Akuntansi" },
        { id: "5", code: "MNJ", name: "Manajemen" },
      ];
      setDataSource(mockPrograms);
    } catch (error) {
      message.error("Gagal memuat data program studi");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    message.loading({
      content: "Menghapus program studi...",
      key: "deleteKey",
    });

    setTimeout(() => {
      setDataSource((prev) => prev.filter((item) => item.id !== id));
      message.success({
        content: "Program studi berhasil dihapus!",
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

  const columns: ColumnsType<StudyProgramData> = [
    {
      title: "KODE PRODI",
      dataIndex: "code",
      key: "code",
      width: "30%",
      render: (code: string) => (
        <span style={{ fontWeight: 600, color: "#101828" }}>{code}</span>
      ),
    },
    {
      title: "NAMA PROGRAM STUDI",
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
          <Tooltip title="Edit Program Studi">
            <Button
              type="text"
              icon={<EditOutlined style={{ color: "#98A2B3" }} />}
              onClick={() => console.log("Edit Program Studi ID:", record.id)}
            />
          </Tooltip>
          <Tooltip title="Hapus Program Studi">
            <Popconfirm
              title="Hapus Program Studi"
              description="Apakah Anda yakin ingin menghapus program studi ini? Tindakan ini tidak dapat dibatalkan."
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
            Daftar Program Studi
          </Title>
          <Text type="secondary" style={{ color: "#475467", fontSize: "14px" }}>
            Kelola kode kurikulum departemen, nama program studi, beserta data
            jenjang pendidikan institusi.
          </Text>
        </div>
        <Link to="/study-programs/create">
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
            Tambah Prodi Baru
          </Button>
        </Link>
      </div>

      {/* Main Table Container wrapped in Card */}
      <Card
        style={{
          borderRadius: "12px",
          border: "1px solid #eaecf0",
          boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        }}
        bodyStyle={{ padding: "0px" }}
      >
        {/* Search Bar Section */}
        <div
          style={{ padding: "20px 24px", borderBottom: "1px solid #eaecf0" }}
        >
          <Input
            placeholder="Cari berdasarkan nama atau kode prodi..."
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

        {/* Table Component */}
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
            emptyText: "Tidak ada data program studi yang ditemukan",
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
            Informasi Aturan Kode Program Studi
          </div>
          <div
            style={{ color: "#2b5a9e", fontSize: "13px", lineHeight: "1.5" }}
          >
            Setiap <strong>Kode Program Studi</strong> terikat pada penomoran
            struktur kurikulum nasional (DIKTI) serta struktur awal penomoran
            Nomor Induk Mahasiswa (NIM). Pastikan kesesuaian kode saat
            mendaftarkan prodi baru.
          </div>
        </div>
      </div>
    </Content>
  );
};

export default StudyProgram;
