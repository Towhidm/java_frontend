import { BookmarkPlus } from "lucide-react";
import { useState } from "react";
import { api } from "../../api/axiosInstance";

const BookmarkButton = ({ jobId }: { jobId: string }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const toggleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents triggering any parent click events
    setIsPending(true);
    try {
      const res = await api.post(`/jobs/SaveJob/${jobId}`);
      console.log(res.data);

      setIsSaved(!isSaved);
    } catch (err: any) {
      if (err.response?.status === 401) {
        alert("Please login first to save jobs");
      } else if (err.response?.status === 409) {
        alert("Job already saved");
      } else {
        console.error(err);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      disabled={isPending}
      className={`${isSaved ? "text-[#3BA59C]" : "text-slate-400"} hover:opacity-80 cursor-pointer`}
    >
      <BookmarkPlus size={25} fill={isSaved ? "currentColor" : "none"} />
    </button>
  );
};

export default BookmarkButton;
