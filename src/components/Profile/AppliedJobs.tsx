import { useEffect, useState } from "react";
import { api } from "../../api/axiosInstance";
import { Briefcase, Calendar, Link as LinkIcon, MessageSquare } from "lucide-react";
import { Button, Input, message } from "antd";

interface JobType {
  _id: string;
  title: string;
  companyName: string;
}

interface ApplicationType {
  _id: string;
  job: JobType;
  status: "pending" | "shortlisted";
  appliedDate: string;
  interview?: {
    interviewDate: string;
    interviewTime: string;
    interviewLink: string;
  };
}

interface SeekerReview {
  _id: string;
  applicationId: string;
  comment: string;
}

export const AppliedJobs = () => {
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [reviews, setReviews] = useState<SeekerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewDrafts, setReviewDrafts] = useState<Record<string, string>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const [appsRes, reviewsRes] = await Promise.all([
        api.get("/profile/applied-jobs"),
        api.get("/profile/my-seeker-reviews"),
      ]);
      setApplications(appsRes.data);
      setReviews(reviewsRes.data);
    } catch {
      message.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitReview = async (applicationId: string) => {
    const comment = reviewDrafts[applicationId]?.trim();
    if (!comment) {
      message.warning("Please write a review comment");
      return;
    }
    setSubmittingId(applicationId);
    try {
      await api.post(`/profile/seeker-review/${applicationId}`, { comment });
      message.success("Seeker review saved");
      await loadData();
    } catch (err: any) {
      message.error(err.response?.data?.message || "Failed to save review");
    } finally {
      setSubmittingId(null);
    }
  };

  if (loading) {
    return <div className="animate-pulse bg-slate-200 h-20 rounded-2xl" />;
  }

  return (
    <div className="bg-white p-8 rounded-4xl shadow-sm border border-emerald-50">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Briefcase className="text-[#00BC7D]" /> My Applications
      </h2>
      <div className="space-y-4">
        {applications.length === 0 && (
          <p className="text-slate-500">No applications yet.</p>
        )}
        {applications.map((app) => {
          const existingReview = reviews.find((r) => r.applicationId === app._id);
          return (
            <div
              key={app._id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <h4 className="font-bold text-lg">{app.job.title}</h4>
                  <p className="text-slate-500 text-sm">
                    {app.job.companyName} • Applied on{" "}
                    {new Date(app.appliedDate).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 h-7 rounded-lg text-sm font-bold flex items-center ${
                    app.status === "shortlisted"
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {app.status.toUpperCase()}
                </span>
              </div>

              {app.interview && (
                <div className="bg-white p-4 rounded-xl border border-emerald-100 text-sm space-y-1">
                  <p className="font-semibold text-slate-700 flex items-center gap-2">
                    <Calendar size={16} className="text-[#00BC7D]" /> Interview
                  </p>
                  <p>{app.interview.interviewDate} at {app.interview.interviewTime}</p>
                  <a
                    href={app.interview.interviewLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#00BC7D] flex items-center gap-1 hover:underline"
                  >
                    <LinkIcon size={14} /> {app.interview.interviewLink}
                  </a>
                </div>
              )}

              {app.status === "shortlisted" && (
                <div className="bg-white p-4 rounded-xl border border-slate-100">
                  <p className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <MessageSquare size={16} className="text-[#00BC7D]" />
                    Seeker Review
                  </p>
                  {existingReview ? (
                    <p className="text-slate-600 text-sm">{existingReview.comment}</p>
                  ) : (
                    <>
                      <Input.TextArea
                        rows={3}
                        placeholder="Write your review about the interview experience..."
                        value={reviewDrafts[app._id] || ""}
                        onChange={(e) =>
                          setReviewDrafts((prev) => ({
                            ...prev,
                            [app._id]: e.target.value,
                          }))
                        }
                      />
                      <Button
                        className="mt-2 bg-[#00BC7D] text-white"
                        loading={submittingId === app._id}
                        onClick={() => submitReview(app._id)}
                      >
                        Submit Seeker Review
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
