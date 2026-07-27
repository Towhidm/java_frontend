import { useEffect, useState } from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { api } from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { FileText, GraduationCap, CheckCircle2, ExternalLink } from "lucide-react";

export const JobSeekerProfile = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  const load = async () => {
    try {
      const { data } = await api.get("/profile/seeker-profile");
      form.setFieldsValue({
        education: data.education,
        skills: data.skills || [],
      });
      setResumeUrl(data.resume || null);
    } catch {
      message.error("Failed to load job seeker profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onFinish = async (values: { education?: string; skills?: string[] }) => {
    setSaving(true);
    try {
      await api.post("/profile/updateSeekerProfile", values);
      message.success("Job seeker profile updated");
    } catch (err: any) {
      message.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const uploadResume = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const { data } = await api.post("/profile/uploadResume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResumeUrl(data.resumeUrl || data.seeker?.resume || null);
      message.success("Public resume saved");
    } catch (err: any) {
      message.error(err.response?.data?.message || "Resume upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse bg-slate-200 h-40 rounded-xl" />;
  }

  const publicProfilePath = user?._id ? `/seekers/${user._id}` : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E6F4F2] flex items-center justify-center shrink-0">
            <GraduationCap size={20} className="text-[#3BA59C]" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Professional Profile</h2>
            <p className="text-slate-500 text-base mt-1">
              Education, skills, and public resume — visible to anyone who visits your profile.
            </p>
          </div>
        </div>
        {publicProfilePath && (
          <Link
            to={publicProfilePath}
            className="text-[#3BA59C] text-base font-medium hover:underline inline-flex items-center gap-1 shrink-0"
          >
            View public page <ExternalLink size={16} />
          </Link>
        )}
      </div>

      <div className="p-6">
        <Form layout="vertical" form={form} onFinish={onFinish} requiredMark={false}>
          <Form.Item
            label={<span className="text-slate-700 font-medium text-base">Education</span>}
            name="education"
          >
            <Input
              placeholder="e.g. B.Sc. CSE, CUET"
              size="large"
              className="rounded-lg text-base"
            />
          </Form.Item>
          <Form.Item
            label={<span className="text-slate-700 font-medium text-base">Skills</span>}
            name="skills"
            extra={<span className="text-sm text-slate-400">Press Enter after each skill</span>}
          >
            <Select
              mode="tags"
              placeholder="Java, Spring Boot, React…"
              size="large"
              tokenSeparators={[","]}
              className="text-base"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={saving}
            size="large"
            className="bg-[#3BA59C] hover:!bg-[#2d817a] border-none font-medium rounded-lg px-8 text-base"
          >
            Save Profile
          </Button>
        </Form>
      </div>

      <div className="px-6 pb-6">
        <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-5">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={20} className="text-[#3BA59C]" />
            <h3 className="font-semibold text-slate-900 text-lg">Public resume (PDF)</h3>
          </div>
          <p className="text-slate-500 text-base mb-4 leading-relaxed">
            Anyone can view this from your public profile. When you apply to a job, you upload a separate CV that only that employer can open.
          </p>
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[#3BA59C] font-medium text-base hover:underline mb-3"
            >
              <CheckCircle2 size={18} /> View public resume
            </a>
          ) : (
            <p className="text-amber-700 text-sm font-medium mb-3 bg-amber-50 inline-block px-2 py-1 rounded">
              No public resume uploaded yet
            </p>
          )}
          <div>
            <Upload
              accept="application/pdf"
              maxCount={1}
              showUploadList={false}
              beforeUpload={(file) => {
                if (file.type !== "application/pdf") {
                  message.error("Only PDF allowed");
                  return Upload.LIST_IGNORE;
                }
                uploadResume(file);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />} loading={uploading} className="rounded-lg text-base" size="large">
                {resumeUrl ? "Replace Public Resume" : "Upload Public Resume"}
              </Button>
            </Upload>
          </div>
        </div>
      </div>
    </div>
  );
};
