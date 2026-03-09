import type { OutletContextModel } from "@/lib/Contexts/OutletContextModel";
import usePostPatchAxios from "@/lib/Hooks/Query/UsePostPatchAxios";
import type { User } from "@/lib/Interfaces/Auth/User";
import type { Response } from "@/lib/Interfaces/Globals/ResponseModel";
import UseAuthStore from "@/lib/Stores/UseAuthStore";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useOutletContext } from "react-router-dom";

type LoginPayload = {
  username: string;
  password: string;
};

function LoginForm() {
  const [form] = Form.useForm();
  const { setUserData } = UseAuthStore();
  const { openNotification } = useOutletContext<OutletContextModel>();

  const { mutate, isPending } = usePostPatchAxios<LoginPayload>({
    config: () => ({
      method: "POST",
      url: "/auth/login",
    }),
    onSuccessTakeover: true,
  });

  const onFinish = (values: LoginPayload) => {
    mutate(
      { data: values },
      {
        onSuccess: (
          response: Response<{
            user: User;
            access: string;
          }>,
        ) => {
          openNotification({
            type: "success",
            title: "Login Berhasil",
            message: `Selamat datang kembali, ${response.data.user?.name || response.data.user?.username}!`,
          });
          setUserData(response.data.user);
        },
      },
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-3/4 max-w-4xl rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row min-h-120">
        {/* Left panel — hidden on mobile, shown md+ */}
        <div
          className="hidden md:flex md:w-1/2 flex-col justify-between p-10"
          style={{
            background: "linear-gradient(145deg, #0f172a 0%, #1e3a5f 100%)",
          }}
        >
          <div>
            <h1 className="text-white text-3xl font-bold leading-snug mb-3">
              Selamat Datang <br /> Kembali!
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Masuk ke sistem untuk mengelola data pembelian, penjualan, dan
              laporan bisnis Anda.
            </p>
          </div>
          <p className="text-slate-500 text-xs">
            © 2026 Grha Digital Indonesia
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 py-10 sm:px-12">
          <div className="mb-6 md:hidden text-center">
            <h1 className="text-gray-800 text-2xl font-bold">
              Selamat Datang Kembali!
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              © 2026 Grha Digital Indonesia
            </p>
          </div>

          <div className="w-full max-w-sm mx-auto">
            <h2 className="text-gray-800 text-2xl font-semibold mb-1">Masuk</h2>
            <p className="text-gray-400 text-sm mb-8">
              Masukkan kredensial Anda untuk melanjutkan
            </p>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
            >
              <Form.Item
                name="username"
                label={<span className="text-gray-600 text-sm">Username</span>}
                rules={[{ required: true, message: "Username wajib diisi" }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-300" />}
                  placeholder="Masukkan username"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span className="text-gray-600 text-sm">Password</span>}
                rules={[{ required: true, message: "Password wajib diisi" }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-300" />}
                  placeholder="Masukkan password"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item className="mt-6 mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={isPending}
                  block
                  style={{
                    background: "linear-gradient(90deg, #1e3a5f, #2563eb)",
                    border: "none",
                    borderRadius: "8px",
                    height: "46px",
                    fontWeight: 600,
                  }}
                >
                  Masuk
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
