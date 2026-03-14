import { useEffect, useState } from 'react';
import { api } from '../../api/axiosInstance';
import { Bookmark, MapPin, Briefcase, ReceiptText } from 'lucide-react';
import { message } from 'antd';
import { Link } from 'react-router-dom';

export interface JobType {
  _id: string;
  title: string;
  companyName: string;
  location: string;
  salary?: number;
  jobType: string;
}

export interface SavedJobType {
  _id: string;
  user: string;
  job: JobType;
  savedAt: string;
}

export const SavedJobs = () => {
  const [savedItems, setSavedItems] = useState<SavedJobType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = async () => {
    try {
      const { data } = await api.get('/profile/getSavedJobs');
      setSavedItems(data.data);
    } catch {
      message.error("Failed to load saved jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  if (loading) return <div className="h-40 bg-white rounded-3xl animate-pulse" />;

  return (
    <div className="bg-white p-6 md:p-8 rounded-4xl shadow-sm border border-emerald-50 transition-all duration-500 hover:shadow-md">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Bookmark className="text-[#00BC7D]" fill="#00BC7D" size={24} /> 
        Saved Opportunities
      </h2>

      {savedItems.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          <Bookmark className="mx-auto mb-2 opacity-20" size={48} />
          <p>You haven't saved any jobs yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {savedItems.map((item) => (
            <div 
              key={item._id} 
              className="group p-5 rounded-2xl border border-slate-100 bg-[#F9FEFD] flex items-center justify-between hover:bg-white hover:border-[#00BC7D]/30 hover:shadow-sm transition-all animate-in fade-in slide-in-from-right duration-500"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl border border-emerald-50 flex items-center justify-center font-bold text-[#00BC7D] shadow-sm">
                  {item.job.companyName?.charAt(0)} {/* */}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-[#00BC7D] transition-colors">{item.job.title}</h4> {/* */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><Briefcase size={12}/> {item.job.jobType}</span> {/* */}
                    <span className="flex items-center gap-1"><MapPin size={12}/> {item.job.location}</span> {/* */}
                  </div>
                </div>
              </div>

              <Link
                to ={`/JobDetails/${item.job._id}`}
                title="Job Details"
                className="flex items-center justify-center bg-[#3BA59C] hover:bg-[#2d817a] text-white font-bold py-2 px-2 mt-10 md:mt-0 rounded-[10px] text-base transition-all active:scale-95 disabled:bg-slate-200"
              >
                <ReceiptText />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};