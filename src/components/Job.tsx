import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { Briefcase, Clock, Wallet, MapPin } from "lucide-react";
import BookmarkButton from "./BookMarkButton/BookmarkButton";

interface Job {
  _id: string;
  title: string;
  companyName: string;
  category: string;
  jobType: string;
  location: string;
  salary: string;
  employer: {
    _id: string;
    profileImage?: {
      url: string;
    };
  };
}

const Jobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs/Alljobs");
        setJobs(res.data.jobs);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch jobs");
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);


  if (loading)
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        Loading jobs...
      </div>
    );
  if (error) return <p className="text-red-500 p-8 text-center">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-12 bg-white">
      {/* Header */}
      <div className="text-center mb-16 mt-8 md:mt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Recent Jobs Available
        </h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          At eu lobortis  amet lacus ut a...
        </p>
        <div className="w-10 h-1 bg-pink-300 mx-auto mt-6 rounded-full opacity-60"></div>
      </div>

      {/* Jobs Feed */}
      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white border border-slate-100 rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow relative"
          >
            {/* Top Row: Time and Bookmark (Stays inside the card) */}
            <div className="flex justify-between items-center mb-4">
              <span className="bg-[#E6F4F2] text-[#3BA59C] text-xs font-semibold px-3 py-1.5 rounded-lg">
                10 min ago
              </span>
              <BookmarkButton jobId={job._id}/>
            </div>

            {/* Main Content Row */}
            <div className="flex flex-col mb-10 md:mb-8 md:flex-row md:items-center gap-6">
              {/* Company Logo */}
              <div className=" md:flex md:items-center md:gap-4">
                <img
                  src={
                    job.employer?.profileImage?.url ||
                    "https://img.lovepik.com/element/45013/6497.png_860.png"
                  }
                  alt={job.companyName}
                  className="w-14 h-14 rounded-full object-cover my-2 bg-red-500"
                />
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-slate-500 font-medium">
                    {job.companyName}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Title & Details */}
            <div className="md:flex md:items-center md:justify-between">
              {/* Icons Grid */}
              <div className="flex flex-col md:flex-row items-start justify-center gap-y-6 md:gap-x-6">
                <div className="flex items-center text-slate-500 gap-2">
                  <Briefcase size={18} className="text-[#3BA59C]" />
                  <span className="text-sm font-medium">{job.category}</span>
                </div>
                <div className="flex items-center text-slate-500 gap-2">
                  <Clock size={18} className="text-[#3BA59C]" />
                  <span className="text-sm font-medium">{job.jobType}</span>
                </div>
                <div className="flex items-center text-slate-500 gap-2">
                  <Wallet size={18} className="text-[#3BA59C]" />
                  <span className="text-sm font-medium">{job.salary}</span>
                </div>
                <div className="flex items-center text-slate-500 gap-2">
                  <MapPin size={18} className="text-[#3BA59C]" />
                  <span className="text-sm font-medium">{job.location}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigate(`apply/${job._id}`)}
                disabled={user?.role === "EMPLOYER"}
                className="bg-[#3BA59C] hover:bg-[#2d817a] text-white font-bold py-2 w-full md:w-30.25 mt-10 md:mt-0 rounded-[10px] text-base transition-all active:scale-95 disabled:bg-slate-200"
              >
                Job Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
