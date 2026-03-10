import { Form, Input, Button, Select, Card, message } from "antd";
import { api } from "../api/axiosInstance";

const { Option } = Select;
const { TextArea } = Input;

const CreateJob = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const res = await api.post("/jobs/create-job", values);

      message.success(res.data.message);

      form.resetFields();
    } catch (error: any) {
      const err = error.response?.data;

      if (err?.errors) {
        const fields = Object.keys(err.errors).map((key) => ({
          name: key,
          errors: err.errors[key],
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
            <Input placeholder="Frontend Developer" />
          </Form.Item>

          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true }]}
          >
            <Input placeholder="Software Development" />
          </Form.Item>

          <Form.Item
            label="Job Type"
            name="jobType"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select job type">
              <Option value="Full-time">Full-time</Option>
              <Option value="Part-time">Part-time</Option>
              <Option value="Contract">Contract</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Salary" name="salary" rules={[{ required: true }]}>
            <Input placeholder="$2000/month" />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true }]}
          >
            <Input placeholder="Remote / Dhaka" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Responsibilities" name="responsibilities">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Press enter after each responsibility"
            />
          </Form.Item>

          <Form.Item label="Skills" name="skills">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="React, Node, MongoDB"
            />
          </Form.Item>

          <Form.Item label="Experience" name="experience">
            <Input placeholder="3 Years" />
          </Form.Item>

          <Form.Item label="Degree" name="degree">
            <Input placeholder="Bachelor / Master" />
          </Form.Item>

          <Form.Item label="Tags" name="tags">
            <Select mode="tags" />
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
