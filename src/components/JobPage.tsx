import { useEffect, useState ,useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axiosInstance";
import { Briefcase, Clock, Wallet, MapPin, Search } from "lucide-react"; // Added Search icon
import BookmarkButton from "./BookMarkButton/BookmarkButton";
import Skeleton_component from "./Skeleton/Skeleton";

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

const JobPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for Search
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchJobs = useCallback(async (query: string, signal?: AbortSignal) => {
    setLoading(true);
    try {
      const endpoint = query 
        ? `/jobs/Alljobs?search=${encodeURIComponent(query)}` 
        : "/jobs/Alljobs";
        
      const res = await api.get(endpoint, { signal });
      setJobs(res.data.jobs);
      setError(null);
    } catch (err: any) {
      if (err.name === 'CanceledError') return; 
      
      if (err.response?.status === 404) {
        setJobs([]);
        setError("Searched job is unavailable");
      } else {
        setError("Failed to fetch jobs");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // LIVE SEARCH EFFECT (Debouncing)
  useEffect(() => {
    const controller = new AbortController();
    const delayDebounceFn = setTimeout(() => {
      fetchJobs(searchTerm, controller.signal);
    }, 500);

    //  This runs if the user types again within the 500ms
    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [searchTerm, fetchJobs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(searchTerm);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-12 bg-white">
      {/* Header */}
      <div className="text-center mb-10 mt-8 md:mt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Find Your Dream Job
        </h2>
        <p className="text-slate-500 max-w-lg mx-auto mb-8">
          Search for roles using AI-powered semantic search. Just describe what you're looking for!
        </p>

        {/* --- SEARCH BAR (AS PER IMAGE DESIGN) --- */}
        <form 
          onSubmit={handleSearch}
          className="relative max-w-2xl mx-auto flex items-center bg-white border border-slate-200 rounded-xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-[#3BA59C]/20 transition-all"
        >
          <div className="pl-4 flex-1 flex items-center">
            <Search size={20} className="text-slate-400 mr-3" />
            <input
              type="text"
              placeholder="Job title, skills, or company..."
              className="w-full outline-none text-slate-700 bg-transparent py-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* <button
            type="submit"
            className="bg-[#3BA59C] hover:bg-[#2d817a] text-white font-semibold px-8 py-3 rounded-lg transition-all active:scale-95"
          >
            Search
          </button> */}
        </form>
        
        <div className="w-10 h-1 bg-pink-300 mx-auto mt-10 rounded-full opacity-60"></div>
      </div>

      {/* Jobs Feed */}
      {loading ? (
        <div className="space-y-6">
          <Skeleton_component />
          <Skeleton_component />
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg mb-4">{error}</p>
          <button 
            onClick={() => {setSearchTerm(""); fetchJobs("");}}
            className="text-[#3BA59C] font-semibold underline"
          >
            Show all jobs
          </button>
        </div>
      ) : (
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
                onClick={() => navigate(`/JobDetails/${job._id}`)}
                className="bg-[#3BA59C] hover:bg-[#2d817a] text-white font-bold py-2 w-full md:w-30.25 mt-10 md:mt-0 rounded-[10px] text-base transition-all active:scale-95 disabled:bg-slate-200"
              >
                Job Details
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default JobPage;