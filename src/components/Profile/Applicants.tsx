import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FileText,
  Mail,
  User,
  Check,
  ExternalLink,
  Loader2,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Button, Input, Modal, message } from "antd";
import { api } from "../../api/axiosInstance";

interface Applicant {
  _id: string;
  cvFile: string;
  coverLetter?: string;
  status: "pending" | "shortlisted";
  jobSeeker: {
    name: string;
    email: string;
  };
  interview?: {
    interviewDate: string;
    interviewTime: string;
    interviewLink: string;
  };
}

interface EmployerReview {
  _id: string;
  applicationId: string;
  comment: string;
}

const JobApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [reviews, setReviews] = useState<EmployerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [interviewModal, setInterviewModal] = useState<string | null>(null);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewLink, setInterviewLink] = useState("");
  const [reviewDrafts, setReviewDrafts] = useState<Record<string, string>>({});

  const loadData = async () => {
    try {
      const [appsRes, reviewsRes] = await Promise.all([
        api.get(`/profile/getApplicantsByJob/${jobId}`),
        api.get("/profile/my-employer-reviews"),
      ]);
      setApplicants(appsRes.data);
      setReviews(reviewsRes.data);
    } catch {
      message.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [jobId]);

  const handleShortlist = async (applicationId: string) => {
    setProcessingId(applicationId);
    try {
      await api.post(`/profile/updateApplicationStatus/${applicationId}`, {
        status: "shortlisted",
      });
      message.success("Applicant shortlisted");
      await loadData();
    } catch (err: any) {
      message.error(err.response?.data?.message || "Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  const scheduleInterview = async () => {
    if (!interviewModal || !interviewDate || !interviewTime || !interviewLink) {
      message.warning("Fill all interview fields");
      return;
    }
    setProcessingId(interviewModal);
    try {
      await api.post(`/profile/scheduleInterview/${interviewModal}`, {
        interviewDate,
        interviewTime,
        interviewLink,
      });
      message.success("Interview scheduled");
      setInterviewModal(null);
      setInterviewDate("");
      setInterviewTime("");
      setInterviewLink("");
      await loadData();
    } catch (err: any) {
      message.error(err.response?.data?.message || "Failed to schedule interview");
    } finally {
      setProcessingId(null);
    }
  };

  const submitEmployerReview = async (applicationId: string) => {
    const comment = reviewDrafts[applicationId]?.trim();
    if (!comment) {
      message.warning("Please write a review comment");
      return;
    }
    setProcessingId(applicationId);
    try {
      await api.post(`/profile/employer-review/${applicationId}`, { comment });
      message.success("Employer review saved");
      await loadData();
    } catch (err: any) {
      message.error(err.response?.data?.message || "Failed to save review");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        <Loader2 className="animate-spin mx-auto text-[#00BC7D]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBF7F6] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-slate-800">Job Applicants</h2>

        {applicants.length === 0 ? (
          <div className="bg-white p-12 rounded-4xl text-center shadow-sm">
            <User className="mx-auto text-slate-200 mb-4" size={64} />
            <p className="text-slate-500 text-lg">No one has applied for this position yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {applicants.map((app) => {
              const existingReview = reviews.find((r) => r.applicationId === app._id);
              return (
                <div
                  key={app._id}
                  className="bg-white p-6 rounded-4xl border border-emerald-50 shadow-sm space-y-4"
                >
                  <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-[#EBF7F6] rounded-2xl flex items-center justify-center text-[#00BC7D]">
                        <User size={32} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{app.jobSeeker.name}</h3>
                        <p className="flex items-center gap-2 text-slate-500 text-sm">
                          <Mail size={14} /> {app.jobSeeker.email}
                        </p>
                        <a
                          href={app.cvFile}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-[#00BC7D] text-sm font-bold hover:underline"
                        >
                          <FileText size={14} /> View CV <ExternalLink size={12} />
                        </a>
                        {app.coverLetter && (
                          <p className="text-slate-500 text-sm mt-1">{app.coverLetter}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {app.status === "pending" ? (
                        <button
                          disabled={processingId === app._id}
                          onClick={() => handleShortlist(app._id)}
                          className="flex items-center gap-2 bg-[#00BC7D] text-white px-5 py-2.5 rounded-xl font-bold"
                        >
                          <Check size={18} /> Shortlist
                        </button>
                      ) : (
                        <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm uppercase">
                          {app.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {app.status === "shortlisted" && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <p className="font-semibold mb-2 flex items-center gap-2">
                          <Calendar size={16} className="text-[#00BC7D]" /> Interview
                        </p>
                        {app.interview ? (
                          <div className="text-sm space-y-1">
                            <p>{app.interview.interviewDate} at {app.interview.interviewTime}</p>
                            <a href={app.interview.interviewLink} target="_blank" rel="noreferrer" className="text-[#00BC7D]">
                              {app.interview.interviewLink}
                            </a>
                          </div>
                        ) : (
                          <Button onClick={() => setInterviewModal(app._id)} className="bg-[#00BC7D] text-white">
                            Schedule Interview
                          </Button>
                        )}
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl">
                        <p className="font-semibold mb-2 flex items-center gap-2">
                          <MessageSquare size={16} className="text-[#00BC7D]" /> Employer Review
                        </p>
                        {existingReview ? (
                          <p className="text-sm text-slate-600">{existingReview.comment}</p>
                        ) : (
                          <>
                            <Input.TextArea
                              rows={3}
                              placeholder="Review the candidate..."
                              value={reviewDrafts[app._id] || ""}
                              onChange={(e) =>
                                setReviewDrafts((prev) => ({ ...prev, [app._id]: e.target.value }))
                              }
                            />
                            <Button
                              className="mt-2 bg-[#00BC7D] text-white"
                              loading={processingId === app._id}
                              onClick={() => submitEmployerReview(app._id)}
                            >
                              Submit Employer Review
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Modal
        title="Schedule Interview"
        open={!!interviewModal}
        onCancel={() => setInterviewModal(null)}
        onOk={scheduleInterview}
        confirmLoading={!!processingId}
      >
        <div className="space-y-3 py-2">
          <Input type="date" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} />
          <Input placeholder="11:00 AM" value={interviewTime} onChange={(e) => setInterviewTime(e.target.value)} />
          <Input placeholder="zoom.us/j/12345" value={interviewLink} onChange={(e) => setInterviewLink(e.target.value)} />
        </div>
      </Modal>
    </div>
  );
};

export default JobApplicants;
