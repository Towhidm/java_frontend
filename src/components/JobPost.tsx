import { Form, Input, Button, Select, Card, message } from "antd";
import { api } from "../api/axiosInstance";

const { Option } = Select;

const CreateJob = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const res = await api.post("/jobs/create-job", values);
      message.success(res.data.message);
      form.resetFields();
    } catch (error: any) {
      const err = error.response?.data;

      if (err?.fieldErrors) {
        const fields = Object.keys(err.fieldErrors).map((key) => ({
          name: key,
          errors: [err.fieldErrors[key]],
        }));
        form.setFields(fields);
      }

      message.error(err?.message || "Server error");
    }
  };

  return (
    <div
      style={{
        background: "#EBF5F4",
        minHeight: "100vh",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        title="Post a Job"
        style={{
          width: 700,
          borderRadius: 10,
          border: "1px solid #309689",
        }}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Job Title"
            name="title"
            rules={[{ required: true, message: "Job title required" }]}
          >
            <Input placeholder="Backend Developer" />
          </Form.Item>

          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true, message: "Company name required" }]}
          >
            <Input placeholder="TechBD" />
          </Form.Item>

          <Form.Item
            label="Company Location"
            name="companyLocation"
            rules={[{ required: true, message: "Company location required" }]}
          >
            <Input placeholder="Dhaka" />
          </Form.Item>

          <Form.Item label="Company Details" name="companyDetails">
            <Input.TextArea rows={2} placeholder="IT Software Hub" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true }]}
          >
            <Input placeholder="IT" />
          </Form.Item>

          <Form.Item
            label="Job Type"
            name="jobType"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select job type">
              <Option value="Full-Time">Full-Time</Option>
              <Option value="Part-Time">Part-Time</Option>
              <Option value="Contract">Contract</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Salary" name="salary" rules={[{ required: true }]}>
            <Input placeholder="50000" />
          </Form.Item>

          <Form.Item
            label="Job Location"
            name="location"
            rules={[{ required: true }]}
          >
            <Input placeholder="Dhaka" />
          </Form.Item>

          <Form.Item
            label="Qualification"
            name="qualification"
            rules={[{ required: true, message: "Qualification required" }]}
          >
            <Input placeholder="BSc" />
          </Form.Item>

          <Form.Item label="Skills Required" name="skills">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Java, Spring Boot, MySQL"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              style={{
                background: "#309689",
                border: "none",
                color: "white",
                width: "100%",
                height: 45,
                fontWeight: "bold",
              }}
            >
              Post Job
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateJob;
