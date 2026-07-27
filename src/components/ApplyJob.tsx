import { Card, Upload, Button, message, Typography, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { api } from "../api/axiosInstance";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const { Title, Text } = Typography;
const { TextArea } = Input;

const MAX_CV_BYTES = 25 * 1024 * 1024; // 25 MB

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      message.error("Please upload a CV PDF for this application");
      return;
    }
    if (file.size > MAX_CV_BYTES) {
      message.error("CV file is too large. Please upload a PDF under 25 MB.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("cvFile", file);
      if (coverLetter.trim()) {
        formData.append("coverLetter", coverLetter.trim());
      }

      const res = await api.post(`/jobs/apply/${jobId}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success(res.data.message || "Application submitted successfully");
      navigate("/profile");
    } catch (error: any) {
      const err = error.response?.data;
      let msg = "Application failed";
      if (typeof err === "string") {
        msg = err;
      } else if (err?.message) {
        msg = err.message;
      } else if (error.response?.status === 413) {
        msg = "CV file is too large. Please upload a PDF under 25 MB.";
      }
      message.error(msg);
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
          Upload a CV PDF for this application only. The employer for this job can view it — not the public.
          Your{" "}
          <Link to="/profile" style={{ color: "#309689" }}>
            profile resume
          </Link>{" "}
          stays separate and public on your seeker profile.
        </Text>

        <div style={{ marginTop: 24 }}>
          <Upload
            beforeUpload={(selected) => {
              if (selected.type !== "application/pdf") {
                message.error("Only PDF files allowed");
                return Upload.LIST_IGNORE;
              }
              if (selected.size > MAX_CV_BYTES) {
                message.error("CV file is too large. Please upload a PDF under 25 MB.");
                return Upload.LIST_IGNORE;
              }
              setFile(selected);
              return false;
            }}
            maxCount={1}
            onRemove={() => setFile(null)}
          >
            <Button icon={<UploadOutlined />}>Upload CV for this application (PDF)</Button>
          </Upload>
          {file && (
            <Text style={{ display: "block", marginTop: 8 }} type="success">
              Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(1)} MB)
            </Text>
          )}
          <Text type="secondary" style={{ display: "block", marginTop: 8, fontSize: 12 }}>
            Max size 25 MB. If you already applied to this job, you cannot apply again.
          </Text>        </div>

        <div style={{ marginTop: 24 }}>
          <Text strong>Cover Letter</Text>
          <TextArea
            rows={4}
            style={{ marginTop: 8 }}
            placeholder="Interested in Backend Developer role using Spring Boot."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
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
