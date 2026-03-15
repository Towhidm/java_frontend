"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button, Card, Typography, message as antMessage } from "antd";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import { api } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Title, Text } = Typography;

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  

  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const {user} = useAuth();

  useEffect(() => {
  // 1. If no email, they didn't come from Register—send them back
  if (!email) {
    antMessage.error("Invalid access. Please register first.");
    navigate("/register");
    return;
  }

  // 2. If already logged in, they don't need to verify
  if (user && user.isVerified) {
    navigate("/");
  }
}, [email, user, navigate]);

  // Countdown timer logic
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (!otp) return antMessage.warning("Please enter the OTP");
    setLoading(true);

    try {
      const res = await api.post("/auth/verifyEmail", { email, otp });
      antMessage.success(res.data.message || "Email verified successfully!");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      antMessage.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const res = await api.post("/auth/resendOtp", { email });
      antMessage.success(res.data.message || "OTP resent successfully!");
      setTimer(30);
    } catch (error: any) {
      antMessage.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#EBF5F4] p-4">
      <Card 
        className="w-full max-w-md shadow-xl rounded-2xl border-none"
        bodyStyle={{ padding: "40px 24px" }}
      >
        <div className="text-center mb-8">
          <div className="bg-[#00BBA715] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafetyCertificateOutlined style={{ fontSize: '32px', color: '#00BBA7' }} />
          </div>
          <Title level={2} style={{ marginBottom: 8 }}>Verify Your Email</Title>
          <Text type="secondary">
            We've sent a 6-digit code to <br />
            <b className="text-[#000000]">{email || "your email"}</b>
          </Text>
        </div>

        <Form layout="vertical" onFinish={handleVerify}>
          <Form.Item>
            <Input.OTP 
              size="large"
              value={otp}
              onChange={(val) => setOtp(val)}
              formatter={(str) => str.toUpperCase()}
              style={{ display: 'flex', justifyContent: 'center' }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            className="bg-[#00BBA7] border-none hover:bg-[#009e90] h-12 text-lg font-semibold rounded-lg mt-4"
          >
            Verify Account
          </Button>
        </Form>

        <div className="text-center mt-8">
          <Text type="secondary">Didn't receive the code?</Text>
          <div className="mt-2">
            <Button 
              type="link" 
              onClick={handleResend} 
              disabled={timer > 0}
              className={timer > 0 ? "text-gray-400" : "text-[#00BBA7] font-medium"}
            >
              {timer > 0 ? `Resend available in ${timer}s` : "Resend OTP Now"}
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button type="text" onClick={() => navigate("/login")} className="text-gray-500">
            Back to Login
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default VerifyOtp;