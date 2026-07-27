import { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { api } from "../../api/axiosInstance";
import { Building2 } from "lucide-react";

export const EmployerProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/profile/employer-profile");
        if (data) {
          form.setFieldsValue({
            companyName: data.companyName,
            companyLocation: data.companyLocation,
            companyDetails: data.companyDetails,
          });
        }
      } catch {
        message.error("Failed to load employer profile");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [form]);

  const onFinish = async (values: {
    companyName: string;
    companyLocation: string;
    companyDetails?: string;
  }) => {
    setSaving(true);
    try {
      await api.post("/profile/updateEmployerProfile", values);
      message.success("Employer profile updated");
    } catch (err: any) {
      message.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse bg-slate-200 h-40 rounded-xl" />;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#E6F4F2] flex items-center justify-center shrink-0">
          <Building2 size={20} className="text-[#3BA59C]" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Company Profile</h2>
          <p className="text-slate-500 text-base mt-1">
            Required before you can post jobs. Shown on your listings.
          </p>
        </div>
      </div>

      <div className="p-6">
        <Form layout="vertical" form={form} onFinish={onFinish} requiredMark="optional">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <Form.Item
              label={<span className="text-slate-700 font-medium text-base">Company Name</span>}
              name="companyName"
              rules={[{ required: true, message: "Company name required" }]}
            >
              <Input placeholder="e.g. TechBD" size="large" className="rounded-lg text-base" />
            </Form.Item>
            <Form.Item
              label={<span className="text-slate-700 font-medium text-base">Location</span>}
              name="companyLocation"
              rules={[{ required: true, message: "Company location required" }]}
            >
              <Input placeholder="e.g. Dhaka" size="large" className="rounded-lg text-base" />
            </Form.Item>
          </div>
          <Form.Item
            label={<span className="text-slate-700 font-medium text-base">About the company</span>}
            name="companyDetails"
          >
            <Input.TextArea
              rows={4}
              placeholder="Short description of your company, industry, and hiring focus…"
              className="rounded-lg text-base"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={saving}
            size="large"
            className="bg-[#3BA59C] hover:!bg-[#2d817a] border-none font-medium rounded-lg px-8 text-base"
          >
            Save Company Profile
          </Button>
        </Form>
      </div>
    </div>
  );
};
