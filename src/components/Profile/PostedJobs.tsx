import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { api } from "../../api/axiosInstance";

interface JobType {
  _id: string;
  title: string;
  applicantCount: number;
}

export const PostedJobs = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);

  useEffect(() => {
    const fetchPostedJobs = async () => {
      const { data } = await api.get("/profile/getEmployerJobs");
      setJobs(data);
    };
    fetchPostedJobs();
  }, []);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="text-2xl font-semibold text-slate-900">Manage Posted Jobs</h2>
      </div>
      <div className="p-6 grid gap-4">
        {jobs.length === 0 && (
          <p className="text-slate-500 text-base">No jobs posted yet.</p>
        )}
        {jobs.map((job) => (
          <div key={job._id} className="p-5 rounded-xl border border-slate-100 bg-slate-50/80">
            <div className="flex justify-between items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
                <div className="flex items-center gap-2 mt-2 text-base">
                  <Users size={18} className="text-[#3BA59C]" />
                  <span className="font-medium text-[#3BA59C]">{job.applicantCount}</span>
                  <span className="text-sm text-slate-500">Applicants</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => (window.location.href = `/applicants/${job._id}`)}
                className="bg-slate-900 hover:bg-[#3BA59C] text-white px-5 py-2.5 rounded-lg font-medium text-base transition-colors"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
