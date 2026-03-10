import { Card, Upload, Button, message, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { api } from "../api/axiosInstance";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      message.error("Please upload your CV");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("cvFile", file);

      const res = await api.post(
        `/jobs/apply/${jobId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success(res.data.message);

      navigate("/jobs");

    } catch (error: any) {
      const err = error.response?.data;
      message.error(err?.message || "Application failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#EBF5F4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <Card
        style={{
          width: 500,
          borderRadius: 12,
          border: "1px solid #309689",
        }}
      >
        <Title level={3} style={{ color: "#000000" }}>
          Apply for this Job
        </Title>

        <Text type="secondary">
          Upload your CV in PDF format to apply.
        </Text>

        <div style={{ marginTop: 30 }}>
          <Upload
            beforeUpload={(file) => {
              if (file.type !== "application/pdf") {
                message.error("Only PDF files allowed");
                return Upload.LIST_IGNORE;
              }

              setFile(file);
              return false;
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>
              Select CV (PDF)
            </Button>
          </Upload>
        </div>

        <Button
          type="primary"
          loading={loading}
          onClick={handleUpload}
          style={{
            marginTop: 30,
            width: "100%",
            height: 45,
            background: "#309689",
            border: "none",
            fontWeight: "bold",
          }}
        >
          Submit Application
        </Button>
      </Card>
    </div>
  );
};

export default ApplyJob;