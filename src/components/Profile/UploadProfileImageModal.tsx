import { useState } from "react";
import { Modal, message, Upload, Button } from "antd";
import { CloudUploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { api } from "../../api/axiosInstance";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const UploadProfileImageModal = ({ open, setOpen }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!image) return message.warning("Please select an image");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);

      await api.post("/profile/uploadImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Profile image updated");
      setOpen(false);
      window.location.reload();
    } catch {
      message.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const onSelectFile = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    return false; // Prevent auto-upload
  };

  return (
    <Modal
      title={<span className="text-xl font-bold text-slate-800">Update Profile Picture</span>}
      open={open}
      onCancel={() => { setOpen(false); setImage(null); setPreview(null); }}
      footer={null} 
      centered
      width={400}
    >
      <div className="flex flex-col items-center gap-6 py-6">
        {preview ? (
          // Preview State
          <div className="relative group">
            <img
              src={preview}
              alt="preview"
              className="w-40 h-40 object-cover rounded-full border-4 border-[#00BC7D] shadow-md"
            />
            <button
              onClick={() => { setImage(null); setPreview(null); }}
              className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all"
            >
              <DeleteOutlined />
            </button>
          </div>
        ) : (
          <Upload.Dragger
            accept="image/*"
            beforeUpload={onSelectFile}
            showUploadList={false}
            className="w-full bg-slate-50 border-2 border-dashed border-emerald-200 rounded-3xl p-10 hover:border-[#00BC7D] transition-colors"
          >
            <p className="text-4xl text-[#00BC7D]"><CloudUploadOutlined /></p>
            <p className="text-lg font-semibold text-slate-700 mt-2">Click or Drag Image</p>
            <p className="text-sm text-slate-400">PNG, JPG or WebP (Max 2MB)</p>
          </Upload.Dragger>
        )}

        <div className="w-full flex gap-3 mt-2">
          <Button 
            block 
            size="large" 
            shape="round" 
            onClick={() => setOpen(false)}
            className="font-medium"
          >
            Cancel
          </Button>
          <Button
            block
            size="large"
            type="primary"
            shape="round"
            loading={loading}
            disabled={!image}
            onClick={handleUpload}
            style={{ backgroundColor: "#00BC7D", borderColor: "#00BC7D" }}
            className="font-bold shadow-md hover:opacity-90"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadProfileImageModal;