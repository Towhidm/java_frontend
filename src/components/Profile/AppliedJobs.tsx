import { useEffect, useState } from "react";
import { api } from "../../api/axiosInstance";
import {  Briefcase } from 'lucide-react';

interface JobType {
  _id: string;
  title: string;
  companyName: string;
}

interface ApplicationType {
  _id: string;
  job: JobType;
  jobSeeker: string;
  cvFile: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: Date;
}


export const AppliedJobs = () => {
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/profile/applied-jobs");
        setApplications(res.data); //
      } catch (err) {
        console.error("Error fetching applications", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading)
    return <div className="animate-pulse bg-slate-200 h-20 rounded-2xl" />;

  return (
    <div className="bg-white p-8 rounded-4xl shadow-sm border border-emerald-50">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Briefcase className="text-[#00BC7D]" /> My Applications
      </h2>
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="flex justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 animate-in fade-in duration-500"
          >
            <div>
              <h4 className="font-bold text-lg">{app.job.title}</h4>
              <p className="text-slate-500 text-sm">
                {app.job.companyName} • Applied on{" "}
                {new Date(app.appliedDate).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`flex items-center justify-center px-3 h-7 rounded-lg text-sm font-bold ${
                app.status === "approved"
                  ? "bg-emerald-100 text-emerald-600"
                  : app.status === "rejected"
                    ? "bg-red-100 text-red-600"
                    : "bg-amber-100 text-amber-600"
              }`}
            >
              {app.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
