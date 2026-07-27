import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FileText,
  Mail,
  User,
  Check,
  ExternalLink,
  Loader2,
  Calendar,
  MessageSquare,
  Lock,
} from "lucide-react";
import { Button, Input, Modal, message } from "antd";
import { api } from "../../api/axiosInstance";

interface Applicant {
  _id: string;
  cvFile?: string;
  coverLetter?: string;
  status: "pending" | "shortlisted";
  jobSeeker: {
    _id?: string;
    name: string;
    email: string;
    resume?: string | null;
  };
  interview?: {
    interviewDate: string;
    interviewTime: string;
    interviewLink: string;
  };
}

interface ReviewBundle {
  myReview: { comment: string } | null;
  hasMyReview: boolean;
  counterpartReview: { comment: string } | null;
  canSeeCounterpart: boolean;
  counterpartLabel: string;
  unlockHint: string;
}

const JobApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [reviewBundles, setReviewBundles] = useState<Record<string, ReviewBundle>>({});
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [openingCvId, setOpeningCvId] = useState<string | null>(null);
  const [interviewModal, setInterviewModal] = useState<string | null>(null);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewLink, setInterviewLink] = useState("");
  const [reviewDrafts, setReviewDrafts] = useState<Record<string, string>>({});

  const loadReviewBundle = async (applicationId: string) => {
    const { data } = await api.get(`/profile/application-reviews/${applicationId}`);
    return data as ReviewBundle;
  };

  const loadData = async () => {
    try {
      const appsRes = await api.get(`/profile/getApplicantsByJob/${jobId}`);
      const apps: Applicant[] = appsRes.data;
      setApplicants(apps);

      const shortlisted = apps.filter((a) => a.status === "shortlisted");
      const bundles = await Promise.all(
        shortlisted.map(async (app) => {
          try {
            const bundle = await loadReviewBundle(app._id);
            return [app._id, bundle] as const;
          } catch {
            return null;
          }
        })
      );
      const map: Record<string, ReviewBundle> = {};
      for (const entry of bundles) {
        if (entry) map[entry[0]] = entry[1];
      }
      setReviewBundles(map);
    } catch {
      message.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [jobId]);

  const openApplicationCv = async (applicationId: string) => {
    setOpeningCvId(applicationId);
    try {
      const res = await api.get(`/profile/application-cv/${applicationId}`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch {
      message.error("Unable to open application CV");
    } finally {
      setOpeningCvId(null);
    }
  };

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
      message.success("Your review was saved. You can now see the seeker’s review if they left one.");
      const bundle = await loadReviewBundle(applicationId);
      setReviewBundles((prev) => ({ ...prev, [applicationId]: bundle }));
      setReviewDrafts((prev) => ({ ...prev, [applicationId]: "" }));
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
              const seekerId = app.jobSeeker?._id;
              const bundle = reviewBundles[app._id];
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
                        {seekerId ? (
                          <Link
                            to={`/seekers/${seekerId}`}
                            className="text-xl font-semibold text-slate-900 hover:text-[#00BC7D] transition-colors"
                          >
                            {app.jobSeeker.name}
                          </Link>
                        ) : (
                          <h3 className="text-xl font-semibold text-slate-900">{app.jobSeeker.name}</h3>
                        )}
                        <p className="flex items-center gap-2 text-slate-500 text-base mt-1">
                          <Mail size={14} /> {app.jobSeeker.email}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <button
                            type="button"
                            onClick={() => openApplicationCv(app._id)}
                            disabled={openingCvId === app._id}
                            className="flex items-center gap-2 text-[#00BC7D] text-base font-medium hover:underline disabled:opacity-60"
                          >
                            {openingCvId === app._id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <FileText size={14} />
                            )}
                            View application CV
                            <ExternalLink size={12} />
                          </button>
                          {seekerId && (
                            <Link
                              to={`/seekers/${seekerId}`}
                              className="flex items-center gap-1 text-[#00BC7D] text-base font-medium hover:underline"
                            >
                              View public profile <ExternalLink size={12} />
                            </Link>
                          )}
                        </div>
                        {app.coverLetter && (
                          <p className="text-slate-500 text-base mt-2">{app.coverLetter}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {app.status === "pending" ? (
                        <button
                          disabled={processingId === app._id}
                          onClick={() => handleShortlist(app._id)}
                          className="flex items-center gap-2 bg-[#00BC7D] text-white px-5 py-2.5 rounded-xl font-medium"
                        >
                          <Check size={18} /> Shortlist
                        </button>
                      ) : (
                        <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium text-sm uppercase">
                          {app.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {app.status === "shortlisted" && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <p className="font-medium mb-2 flex items-center gap-2 text-base">
                          <Calendar size={16} className="text-[#00BC7D]" /> Interview
                        </p>
                        {app.interview ? (
                          <div className="text-base space-y-1">
                            <p>
                              {app.interview.interviewDate} at {app.interview.interviewTime}
                            </p>
                            <a
                              href={app.interview.interviewLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#00BC7D]"
                            >
                              {app.interview.interviewLink}
                            </a>
                          </div>
                        ) : (
                          <Button onClick={() => setInterviewModal(app._id)} className="bg-[#00BC7D] text-white">
                            Schedule Interview
                          </Button>
                        )}
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl space-y-4">
                        <div>
                          <p className="font-medium mb-2 flex items-center gap-2 text-base">
                            <MessageSquare size={16} className="text-[#00BC7D]" /> Your review of the applicant
                          </p>
                          {bundle?.hasMyReview && bundle.myReview ? (
                            <p className="text-base text-slate-600">{bundle.myReview.comment}</p>
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

                        <div className="border-t border-slate-200 pt-3">
                          <p className="font-medium text-base mb-2">
                            {bundle?.counterpartLabel || "Job seeker review"}
                          </p>
                          {bundle?.canSeeCounterpart && bundle.counterpartReview ? (
                            <p className="text-base text-slate-600 bg-white rounded-lg p-3">
                              {bundle.counterpartReview.comment}
                            </p>
                          ) : (
                            <p className="text-slate-400 text-sm flex items-start gap-2">
                              <Lock size={16} className="mt-0.5 shrink-0" />
                              {bundle?.hasMyReview
                                ? "This applicant has not left a review yet."
                                : bundle?.unlockHint ||
                                  "Submit your review to unlock this applicant’s review (if they left one)."}
                            </p>
                          )}
                        </div>
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
          <Input
            placeholder="zoom.us/j/12345"
            value={interviewLink}
            onChange={(e) => setInterviewLink(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default JobApplicants;
