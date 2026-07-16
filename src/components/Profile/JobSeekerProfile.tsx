import { useEffect, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { api } from "../../api/axiosInstance";
import { GraduationCap } from "lucide-react";

export const JobSeekerProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/profile/seeker-profile");
        form.setFieldsValue({
          education: data.education,
          skills: data.skills || [],
        });
      } catch {
        message.error("Failed to load job seeker profile");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [form]);

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

  if (loading) {
    return <div className="animate-pulse bg-slate-200 h-40 rounded-2xl" />;
  }

  return (
    <div className="bg-white p-8 rounded-4xl shadow-sm border border-emerald-50">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <GraduationCap className="text-[#00BC7D]" /> Job Seeker Profile
      </h2>
      <p className="text-slate-500 text-sm mb-4">
        Updates <strong>job_seeker</strong> and <strong>job_seeker_skill</strong> tables.
      </p>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Education" name="education">
          <Input placeholder="CUET" />
        </Form.Item>
        <Form.Item label="Skills" name="skills">
          <Select mode="tags" placeholder="Java, Spring Boot, React" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={saving}
          className="bg-[#00BC7D] border-none"
        >
          Save Profile
        </Button>
      </Form>
    </div>
  );
};
