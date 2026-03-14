import { BookmarkPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../../api/axiosInstance";
import { message } from "antd";

const BookmarkButton = ({ jobId }: { jobId: string }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  //ant design message toast

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Job already saved",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Please login first to bookmark any job",
    });
  };

  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const res = await api.get(`/jobs/checkSaved/${jobId}`);
        console.log(res.data.isSaved);
        if (res.data.isSaved) {
          setIsSaved(true);
        }
      } catch (err) {
        console.error("Error checking bookmark status", err);
      }
    };

    checkSavedStatus();
  }, [jobId]);

  const toggleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPending(true);

    try {
      if (isSaved) {
        await api.delete(`/jobs/removeSaveJob/${jobId}`);
        setIsSaved(false);
      } else {
        await api.post(`/jobs/SaveJob/${jobId}`);
        setIsSaved(true);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        warning();
      } else if (err.response?.status === 409) {
        error();
      } else {
        console.error("Axios Error:", err);
        message.error("Somthing went wrong");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      {contextHolder}

      <button
        onClick={toggleBookmark}
        disabled={isPending}
        className={`${isSaved ? "text-[#3BA59C]" : "text-slate-400"} hover:opacity-80 cursor-pointer disabled:opacity-50`}
      >
        <BookmarkPlus size={25} fill={isSaved ? "currentColor" : "none"} />
      </button>
    </>
  );
};

export default BookmarkButton;
