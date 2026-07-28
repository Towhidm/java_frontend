import { useEffect, useState } from "react";
import { api } from "../../api/axiosInstance";
import { Briefcase, Calendar, Link as LinkIcon, MessageSquare } from "lucide-react";
import { Button, Input, message } from "antd";

type AppStatus = "pending" | "shortlisted" | "approved" | "rejected";

interface JobType {
  _id: string;
  title: string;
  companyName: string;
  employer?: { _id?: string };
}

interface ApplicationType {
  _id: string;
  job: JobType;
  status: AppStatus;
  appliedDate: string;
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
  approved: boolean;
  canReview: boolean;
}

const statusClass = (status: AppStatus) => {
  switch (status) {
    case "approved":
      return "bg-emerald-50 text-emerald-700";
    case "rejected":
      return "bg-red-50 text-red-700";
    case "shortlisted":
      return "bg-sky-50 text-sky-700";
    default:
      return "bg-amber-50 text-amber-700";
  }
};

export const AppliedJobs = () => {
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [reviewBundles, setReviewBundles] = useState<Record<string, ReviewBundle>>({});
  const [loading, setLoading] = useState(true);
  const [reviewDrafts, setReviewDrafts] = useState<Record<string, string>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const loadReviewBundle = async (applicationId: string) => {
    const { data } = await api.get(`/profile/application-reviews/${applicationId}`);
    return data as ReviewBundle;
  };

  const loadData = async () => {
    try {
      const appsRes = await api.get("/profile/applied-jobs");
      const apps: ApplicationType[] = appsRes.data;
      setApplications(apps);

      const approved = apps.filter((a) => a.status === "approved");
      const bundles = await Promise.all(
        approved.map(async (app) => {
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
      message.success("Public review saved");
      const bundle = await loadReviewBundle(applicationId);
      setReviewBundles((prev) => ({ ...prev, [applicationId]: bundle }));
      setReviewDrafts((prev) => ({ ...prev, [applicationId]: "" }));
    } catch (err: any) {
      message.error(err.response?.data?.message || "Failed to save review");
    } finally {
      setSubmittingId(null);
    }
  };

  if (loading) {
    return <div className="animate-pulse bg-slate-200 h-20 rounded-xl" />;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#E6F4F2] flex items-center justify-center">
          <Briefcase size={20} className="text-[#3BA59C]" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-900">My Applications</h2>
      </div>

      <div className="p-6 space-y-4">
        {applications.length === 0 && (
          <p className="text-slate-500 text-base py-2">No applications yet.</p>
        )}
        {applications.map((app) => {
          const bundle = reviewBundles[app._id];
          return (
            <div
              key={app._id}
              className="p-5 rounded-xl bg-slate-50/80 border border-slate-100 space-y-3"
            >
              <div className="flex justify-between items-start gap-3">
                <div className="min-w-0">
                  <h4 className="font-semibold text-xl text-slate-900 leading-snug">
                    {app.job.title}
                  </h4>
                  <p className="text-slate-500 text-base mt-1">
                    {app.job.companyName} · Applied{" "}
                    {new Date(app.appliedDate).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`shrink-0 px-3 py-1 rounded-lg text-sm font-medium tracking-wide uppercase ${statusClass(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>
              </div>

              {app.interview && (
                <div className="bg-white p-4 rounded-lg border border-slate-100 text-base space-y-1">
                  <p className="font-medium text-slate-700 flex items-center gap-2">
                    <Calendar size={18} className="text-[#3BA59C]" /> Interview
                  </p>
                  <p className="text-slate-500">
                    {app.interview.interviewDate} at {app.interview.interviewTime}
                  </p>
                  <a
                    href={app.interview.interviewLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#3BA59C] flex items-center gap-1 hover:underline break-all"
                  >
                    <LinkIcon size={16} /> {app.interview.interviewLink}
                  </a>
                </div>
              )}

              {app.status === "approved" && (
                <div className="bg-white p-4 rounded-lg border border-slate-100 space-y-4">
                  <div>
                    <p className="font-medium text-slate-700 text-base mb-2 flex items-center gap-2">
                      <MessageSquare size={18} className="text-[#3BA59C]" />
                      Your public review of the employer
                    </p>
                    {bundle?.hasMyReview && bundle.myReview ? (
                      <p className="text-slate-600 text-base leading-relaxed">{bundle.myReview.comment}</p>
                    ) : (
                      <>
                        <Input.TextArea
                          rows={3}
                          placeholder="Share your hiring experience (public)…"
                          className="text-base"
                          value={reviewDrafts[app._id] || ""}
                          onChange={(e) =>
                            setReviewDrafts((prev) => ({
                              ...prev,
                              [app._id]: e.target.value,
                            }))
                          }
                        />
                        <Button
                          className="mt-2 bg-[#3BA59C] text-white border-none text-base"
                          size="large"
                          loading={submittingId === app._id}
                          onClick={() => submitReview(app._id)}
                        >
                          Submit Public Review
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="border-t border-slate-100 pt-3">
                    <p className="font-medium text-slate-700 text-base mb-2">
                      {bundle?.counterpartLabel || "Employer review about you"}
                    </p>
                    {bundle?.counterpartReview ? (
                      <p className="text-slate-600 text-base leading-relaxed bg-[#E6F4F2]/50 rounded-lg p-3">
                        {bundle.counterpartReview.comment}
                      </p>
                    ) : (
                      <p className="text-slate-400 text-sm">
                        No employer review yet (shown here publicly when they write one).
                      </p>
                    )}
                  </div>
                </div>
              )}

              {app.status !== "approved" && app.status !== "rejected" && (
                <p className="text-slate-400 text-sm">
                  Reviews become available after the employer approves your application.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
