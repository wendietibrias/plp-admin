import UseAuthStore from "@/lib/Stores/UseAuthStore";
import { Card, Divider, Typography } from "antd";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";

function Dashboard() {
  const { userData } = UseAuthStore();
  return (
    <Card>
      <Title level={4}>Selamat datang, {userData?.username || "User"}!</Title>
      <Divider style={{ marginTop: 16, marginBottom: 16 }}></Divider>
      <Typography.Text>
        {dayjs().locale("id").format("dddd, D MMMM YYYY")}
      </Typography.Text>
    </Card>
  );
}

export default Dashboard;
