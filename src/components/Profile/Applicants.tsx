import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FileText,
  Mail,
  User,
  Check,
  X,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { message } from "antd";
import { api } from "../../api/axiosInstance";

interface Applicant {
  _id: string;
  cvFile: string;
  status: "pending" | "approved" | "rejected";
  jobSeeker: {
    name: string;
    email: string;
  };
}

const JobApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const { data } = await api.get(
          `/profile/getApplicantsByJob/${jobId}`,
        );
        setApplicants(data);
      } catch {
        message.error("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [jobId]);

  const handleStatusUpdate = async (
    applicationId: string,
    newStatus: "approved" | "rejected",
  ) => {
    setProcessingId(applicationId);
    try {
      await api.post(`/profile/updateApplicationStatus/${applicationId}`, {
        status: newStatus,
      });

      setApplicants((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app,
        ),
      );
      message.success(`Applicant ${newStatus} successfully`);
    } catch (err:any) {
      message.error(err.response?.data?.message || "Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center">
        <Loader2 className="animate-spin mx-auto text-[#00BC7D]" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#EBF7F6] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-slate-800">
          Job Applicants
        </h2>

        {applicants.length === 0 ? (
          <div className="bg-white p-12 rounded-4xl text-center shadow-sm">
            <User className="mx-auto text-slate-200 mb-4" size={64} />
            <p className="text-slate-500 text-lg">
              No one has applied for this position yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {applicants.map((app) => (
              <div
                key={app._id}
                className="bg-white p-6 rounded-4xl border border-emerald-50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="w-16 h-16 bg-[#EBF7F6] rounded-2xl flex items-center justify-center text-[#00BC7D]">
                    <User size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {app.jobSeeker.name}
                    </h3>
                    <div className="flex flex-col gap-1 mt-1">
                      <p className="flex items-center gap-2 text-slate-500 text-sm">
                        <Mail size={14} /> {app.jobSeeker.email}
                      </p>
                      <a
                        href={app.cvFile}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-[#00BC7D] text-sm font-bold hover:underline"
                      >
                        <FileText size={14} /> View CV / Resume{" "}
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0">
                  {app.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        disabled={processingId === app._id}
                        onClick={() => handleStatusUpdate(app._id, "approved")}
                        className="flex items-center gap-2 bg-[#00BC7D] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50"
                      >
                        <Check size={18} /> Accept
                      </button>
                      <button
                        disabled={processingId === app._id}
                        onClick={() => handleStatusUpdate(app._id, "rejected")}
                        className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-all active:scale-95 disabled:opacity-50"
                      >
                        <X size={18} /> Reject
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider ${
                        app.status === "approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {app.status === "approved" ? (
                        <Check size={16} />
                      ) : (
                        <X size={16} />
                      )}
                      {app.status}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicants;
