import { useState,useEffect } from "react";
import { Users} from "lucide-react"; 
import { api } from "../../api/axiosInstance";

interface JobType {
  _id: string;
  title: string;
 applicantCount:number;
}

export const PostedJobs = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);

  useEffect(() => {
    const fetchPostedJobs = async () => {
      const { data } = await api.get('/profile/getEmployerJobs');
      setJobs(data); 
    };
    fetchPostedJobs();
  }, []);

  return (
    <div className="bg-white p-8 rounded-4xl shadow-sm border border-emerald-50">
      <h2 className="text-2xl font-bold mb-6">Manage Posted Jobs</h2>
      <div className="grid gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="p-6 rounded-2xl border border-slate-100 bg-slate-50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{job.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Users size={18} className="text-[#00BC7D]" />
                  <span className="font-bold text-[#00BC7D]">{job.applicantCount}</span> 
                  <span className="text-xs text-slate-500 uppercase font-semibold">Applicants</span>
                </div>
              </div>
              <button 
                onClick={() => window.location.href = `/applicants/${job._id}`}
                className="bg-black hover:bg-[#00BC7D] text-white px-6 py-3 rounded-xl font-bold transition-all transform active:scale-95"
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