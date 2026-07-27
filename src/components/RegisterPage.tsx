import { Form, Input, Button, Select, message } from "antd";
import { useState, useEffect } from "react";
import { api } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Option } = Select;

type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: "EMPLOYER" | "JOBSEEKER";
};

export default function RegisterForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/profile");
    }
  }, [user, navigate, isLoading]);

  const handleSubmit = async (values: RegisterData) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", values, {
        withCredentials: true,
      });
      message.success(res.data.message);
      form.resetFields();
      navigate("/login");
    } catch (error: any) {
      const fieldErrors = error.response?.data?.fieldErrors;
      if (fieldErrors) {
        form.setFields(
          Object.entries(fieldErrors).map(([name, msg]) => ({
            name,
            errors: [msg as string],
          })),
        );
      } else if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#EBF5F4] py-10">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-bold mb-2 text-[#000000] text-center">
          Register
        </h2>
        <p className="text-center text-slate-500 text-sm mb-6">
          After login, complete your profile details.
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ role: "EMPLOYER" }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Name is required" },
              { min: 2, message: "Name must be at least 2 characters" },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item label="Role" name="role">
            <Select>
              <Option value="EMPLOYER">Employer</Option>
              <Option value="JOBSEEKER">Job Seeker</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="bg-[#00BBA7] border-none hover:bg-[#009e90] text-white text-lg font-semibold rounded-md"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
