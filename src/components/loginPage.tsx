import { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginUser } from "../api/authService";
import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { login, } = useAuth();
  // const navigate = useNavigate(); 
  // useEffect(()=>{
  //   if(user){
  //     navigate("/");
  //   }
  // },[user,navigate])

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await loginUser(values);

      
      login(response.data.user);
      message.success("Login successful!");
      console.log("Login succeeded", response.data.user);
      
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Login failed";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 400, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Login
        </Title>

        <Form
          name="login_form"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              size="large"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
